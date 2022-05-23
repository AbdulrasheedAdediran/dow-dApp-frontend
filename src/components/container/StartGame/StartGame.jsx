import { React, useState, useEffect } from "react";
import "./StartGame.css";
import Attempts from "./Attempts";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import Main from "../../Main/Main";
import Modal from "../../modal/Modal";
import DOW_ABI from "../../../util/DOW_ABI.json";
import Loader from "../../loader/Loader";
import { Contract } from "ethers";

const StartGame = ({
  generatedValues,
  playerStatistics,
  connected,
  startGame,
  userBalance,
  checkTrials,
  claimFreeTokens,
  DOWContract,
  provider,
  loadingSuccess,
  loader
}) => {
  // Stores and handles the player's inputs
  let navigate = useNavigate();
  const [playerInput, setPlayerInput] = useState([]);
  // Handles disabling/enabling input fields based on validity of input provided
  const [isDisabled, setIsDisabled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const randomNumbers = generatedValues[0];
  const [roundScores, setRoundScores] = useState([]);
  let [dead, setDead] = useState(0);
  let [wounded, setWounded] = useState(0);
  const [trials, setTrials] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const signer = provider.getSigner();
  const DOWContractInstance = new Contract(DOWContract, DOW_ABI, signer);

  // const clearBtn = document.querySelector(".clear");
  // const playBtn = document.querySelector(".play");
  // const numberBtn = document.querySelectorAll(".number-btn");
    useEffect(() => {
      console.log(generatedValues[0]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
  const handleNumberButton = (e) => {};
  const handlePlayerInput = (e) => {
    e.preventDefault();
    const target = e.target;
    const maxLength = parseInt(target.attributes["maxlength"].value, 10);
    const previous = target.previousElementSibling;
    const next = target.nextElementSibling;
    const inputs = document.querySelectorAll("input");

    // Set valid inputs to be numbers 0 - 9
    const regX = /^[0-9]+$/;
    // Checks if inputs entered are valid and stores them in an array
    if (regX.test(target.value)) {
      setPlayerInput([...playerInput, target.value]);
    } else {
      target.value = "";
      target.focus();
    }

    let container = document.getElementsByClassName("input")[0];
    container.onkeyup = (e) => {
      if (e.keycode === 8) {
        console.log("delete");
      }

      let focusedInputLength = target.value.length;
      let lastInput = inputs[inputs.length - 1];
      if (
        focusedInputLength >= maxLength &&
        regX.test(e.target.value) &&
        next !== null
      ) {
        next.attributes["disabled"] = setIsDisabled(true);
        next.focus();
      } else if (target !== lastInput) {
        target.focus();
      } else {
        lastInput.focus();
      }
      // Move to previous field if empty (user pressed backspace)
      if (focusedInputLength < maxLength) {
        let firstInput = inputs[0];
        if (target === inputs[1]) {
          previous.attributes["disabled"] = setIsDisabled(false);
          firstInput.focus();
          playerInput.pop();
        }
        if (previous === null && target === firstInput) {
          target.focus();
          playerInput.pop();
          setPlayerInput([]);
        } else if (previous !== firstInput) {
          previous.attributes["disabled"] = setIsDisabled(true);
          playerInput.pop();
          previous.focus();
        } else if (target === lastInput) {
          target.value = "";
          playerInput.pop();
          target.focus();
        }
      }
    };
  };

  const handlePlay = async (e) => {
    const entries = document.querySelector(".entries");
    const inputs = document.querySelectorAll("input");
    const winMessage = "WAY TO GO GENIUS, YOU WON!!!";
    const loseMessage = "GAME OVER! BETTER LUCK NEXT TIME";
    let firstInput = inputs[0];

    e.preventDefault();
    if (trials <= 7 && dead !== 4) {
      setDead((dead = 0));
      setWounded((wounded = 0));
      setTrials((trials) => (trials += 1));
      // Check Player Input and Return Round Scores
      for (let i = 0; i < 4; i++) {
        // Check if player guess is in the correct index of random numbers
        // eslint-disable-next-line
        if (playerInput[i] == randomNumbers[i]) {
          setDead((dead += 1));
        }
        // Check if player guess is in the sequence but not in the correct index of random numbers
        for (let j = 0; j < 4; j++) {
          if (
            // eslint-disable-next-line
            playerInput[i] != randomNumbers[i] &&
            // eslint-disable-next-line
            playerInput[i] == randomNumbers[j]
          ) {
            setWounded((wounded += 1));
          }
        }
      }

      setRoundScores([
        ...roundScores,
        {
          trial: trials,
          attempt: playerInput,
          dead: dead,
          wounded: wounded,
        },
      ]);
      // entries.reset();
      // firstInput.attributes["disabled"] = setIsDisabled(true);
      // firstInput.attributes["autofocus"] = true;
      setPlayerInput([]);
    }

    if (trials <= 7 && dead === 4) {
      setMessage(winMessage);
       setIsLoading(true);
       const res = await DOWContractInstance.checkTrials(trials);
       res.wait();
       console.log(res);
       setIsLoading(false);
       setIsOpen(true);
     
    } else if (trials >= 7 && dead !== 4) {
      setMessage(loseMessage);
      setIsLoading(true)
      const res = await DOWContractInstance.checkTrials(8);
      res.wait()
      console.log(res)
      setIsLoading(false);
      setIsOpen(true);
      entries.reset();
      firstInput.attributes["disabled"] = setIsDisabled(false);
      firstInput.attributes["autofocus"] = true;
      firstInput.focus();
      setTrials(0);
    }
    
  };
  return (
    <section>
      {loader && <Loader />}
      {isLoading && <Loader />}
      {loadingSuccess === false && navigate("/")}
      <form className="entries" action="#" onSubmit={handlePlay}>
        <label htmlFor="player-inputs">
          {" "}
          Enter four unique numbers from 0 - 9{" "}
        </label>
        <div className="input">
          <input
            type="text"
            maxLength={1}
            minLength={1}
            name="playerInput1"
            id="player-inputs"
            className="first-player-input player-input"
            value={playerInput.playerInput1}
            onChange={handlePlayerInput}
            autoComplete="off"
            autoFocus={true}
            disabled={isDisabled}
          ></input>
          <input
            type="text"
            maxLength={1}
            minLength={1}
            name="playerInput2"
            id="player-inputs"
            className="second-player-input player-input"
            value={playerInput.playerInput2}
            onChange={handlePlayerInput}
            autoComplete="off"
            required={true}
            disabled={!isDisabled}
          ></input>
          <input
            type="text"
            maxLength={1}
            minLength={1}
            name="playerInput3"
            id="player-inputs"
            className="third-player-input player-input"
            value={playerInput.playerInput3}
            onChange={handlePlayerInput}
            autoComplete="off"
            disabled={!isDisabled}
          ></input>
          <input
            type="text"
            maxLength={1}
            minLength={1}
            name="playerInput4"
            id="player-inputs"
            className="fourth-player-input player-input"
            value={playerInput.playerInput4}
            onChange={handlePlayerInput}
            autoComplete="off"
            disabled={!isDisabled}
          ></input>
        </div>
        <div className="number-btns">
          <button
            className="number-btn"
            disabled={!isDisabled}
            value="0"
            onClick={handleNumberButton}
          >
            0
          </button>
          <button
            className="number-btn"
            disabled={!isDisabled}
            value="1"
            onClick={handleNumberButton}
          >
            1
          </button>
          <button
            className="number-btn"
            disabled={!isDisabled}
            value="2"
            onClick={handleNumberButton}
          >
            2
          </button>
          <button
            className="number-btn"
            disabled={!isDisabled}
            value="3"
            onClick={handleNumberButton}
          >
            3
          </button>
          <button
            className="number-btn"
            disabled={!isDisabled}
            value="4"
            onClick={handleNumberButton}
          >
            4
          </button>
          <button
            className="number-btn"
            disabled={!isDisabled}
            value="5"
            onClick={handleNumberButton}
          >
            5
          </button>
          <button
            className="number-btn"
            disabled={!isDisabled}
            value="6"
            onClick={handleNumberButton}
          >
            6
          </button>
          <button
            className="number-btn"
            disabled={!isDisabled}
            value="7"
            onClick={handleNumberButton}
          >
            7
          </button>
          <button
            className="number-btn"
            disabled={!isDisabled}
            value="8"
            onClick={handleNumberButton}
          >
            8
          </button>
          <button
            className="number-btn"
            disabled={!isDisabled}
            value="9"
            onClick={handleNumberButton}
          >
            9
          </button>
        </div>
        <div className="clear-play-btns">
          <button className="game-btn clear" onClick={() => { navigate("/")}} > Clear</button>
          <button
            className="game-btn play"
            // type="submit"
            disabled={true}
            // onSubmit={handlePlay}
            onClick={handlePlay}
          >
            Play
          </button>
        </div>
      </form>
      <div className="attempts-and-dashboard">
        <Attempts
          trial={trials}
          confirmedAttempt={playerInput}
          dead={dead}
          wounded={wounded}
          roundScores={roundScores}
        />

        <Dashboard
          played={playerStatistics.gamesPlayed}
          won={playerStatistics.gamesWon}
          lost={playerStatistics.gamesLost}
          currentStreak={playerStatistics.currentWinStreak}
          highestStreak={playerStatistics.highestWinStreak}
        />
      </div>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          message={message}
          numbers={generatedValues[0]}
        />
      )}
      {/* <Link to="/">
        <button>Back</button>
      </Link> */}
    </section>
  );
};

export default StartGame;
