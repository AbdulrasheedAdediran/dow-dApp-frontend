import { React, useState, useEffect } from "react";
import "./StartGame.css";
import Attempts from "./Attempts";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import Modal from "../../modal/Modal";
import DOW_ABI from "../../../util/DOW_ABI.json";
import Loader from "../../loader/Loader";
import { Contract } from "ethers";
import Sound from "../Sound/Sound";
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
  loader,
  isPlaying,
}) => {
  let navigate = useNavigate();
  const [playerInput, setPlayerInput] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const randomNumbers = generatedValues[0];
  const [roundScores, setRoundScores] = useState([]);
  let [dead, setDead] = useState(0);
  let [wounded, setWounded] = useState(0);
  const [trials, setTrials] = useState(1);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(null);
  const signer = provider.getSigner();
  const DOWContractInstance = new Contract(DOWContract, DOW_ABI, signer);
  //=======================//
  //--Check Clear Clicked--//
  //=======================//
  useEffect(() => {
    setTimeout(() => {
      if (document.readyState === "complete") {
        callStart();
      }
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const callStart = () => {
    startGame();
  };
  //=========================//
  //--Handle Number Buttons--//
  //=========================//
  const handleNumberButton = (e) => {
    e.preventDefault();
    const entries = document.querySelector(".entries");
    const target = e.target;
    const maxLength = parseInt(entries[index].attributes["maxlength"].value);
    const current = entries[index];
    const next = entries[index].nextElementSibling;
    current.value = parseInt(target.value);
    // Stop pushing to array when all inputs are filled
    if (playerInput.length < 4) {
      setPlayerInput((playerInput) => [...playerInput, parseInt(target.value)]);
    }

    if (current.value.length >= maxLength && next !== null) {
      setIndex(index + 1);
      next.focus();
    } else if (current.value.length >= maxLength && next === null) {
      entries[index].value = playerInput[3];
      setIndex(index);
      current.focus();
    }
  };
  //==========================//
  //--Handle Keyboard Input--//
  //========================//
  const handlePlayerInput = (e) => {
    const target = e.target;
    const maxLength = parseInt(target.attributes["maxlength"].value);
    const previous = target.previousElementSibling;
    const next = target.nextElementSibling;
    const inputs = document.querySelectorAll(".input");
    e.preventDefault();

    // Set valid inputs to be numbers 0 - 9
    const regX = /^[0-9]+$/;
    // Checks if inputs entered are valid and stores them in an array
    if (regX.test(target.value)) {
      setPlayerInput((playerInput) => [...playerInput, parseInt(target.value)]);
    } else {
      target.value = "";
      target.focus();
    }

    let container = document.getElementsByClassName("input")[0];
    container.onkeyup = (e) => {
      let focusedInputLength = target.value.length;
      let lastInput = inputs[inputs.length - 1];
      if (
        focusedInputLength >= maxLength &&
        regX.test(e.target.value) &&
        next !== null
      ) {
        next.focus();
      } else if (target === lastInput && next === null) {
        target.focus();
      }

      // Move to previous field if empty (user pressed backspace)
      if (focusedInputLength < maxLength) {
        let firstInput = inputs[0];
        if (target === inputs[1]) {
          // previous.attributes["disabled"] = setIsDisabled(false);
          firstInput.focus();
          playerInput.pop();
        }
        if (previous === null && target === firstInput) {
          target.focus();
          playerInput.pop();
          setPlayerInput([]);
        } else if (previous !== firstInput) {
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

  //=======================//
  //-Handles Clear Button--//
  //=======================//
  const handleClear = (e) => {
    e.preventDefault();
    const entries = document.querySelector(".entries");
    const maxLength = parseInt(entries[index].attributes["maxlength"].value);
    const previous = entries[index].previousElementSibling;
    const current = entries[index];
    // let currentValue = entries[index].value;
    const next = entries[index].nextElementSibling;
    if (next === null && current.value.length >= maxLength) {
      entries[index].value = "";
      current.focus();
      playerInput.pop();
    } else if (
      next === null ||
      (previous !== null && current.value.length < maxLength)
    ) {
      setIndex(index - 1);
      previous.value = "";
      previous.focus();
      playerInput.pop();
    } else if (previous === null && current.value.length < maxLength) {
      setIndex(index);
      entries[index].value = "";
      current.focus();
      setPlayerInput([]);
    }
  };

  //=======================//
  //--Checks for Duplicate-//
  //=======================//
  const containsDuplicate = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < i; j++) {
        if (arr[i] === arr[j]) {
          return true;
        }
      }
    }
    return false;
  };
  //=======================//
  //----  Handles Play ----//
  //=======================//
  const handlePlay = async (e) => {
    const entries = document.querySelector(".entries");
    const inputs = document.querySelectorAll(".input");
    const winMessage = "WAY TO GO GENIUS, YOU WON!!!";
    const loseMessage = "GAME OVER! BETTER LUCK NEXT TIME";
    let firstInput = inputs[0];
    e.preventDefault();
    if (playerInput.length < 4) {
      alert("INCOMPLETE ENTRIES");
      return;
    }
    if (containsDuplicate(playerInput)) {
      alert("NUMBERS MUST BE UNIQUE");
      return;
    } else {
      if (trials <= 7 && dead !== 4) {
        setDead((dead = 0));
        setWounded((wounded = 0));
        setTrials((trials) => (trials += 1));
        // Check player input and return round scores
        for (let i = 0; i < 4; i++) {
          // Check if player input is in the correct index of random numbers
          if (playerInput[i] === randomNumbers[i]) {
            setDead((dead += 1));
          }
          // Check if player guess is in the sequence but not in the correct index of random numbers
          for (let j = 0; j < 4; j++) {
            if (
              playerInput[i] !== randomNumbers[i] &&
              playerInput[i] === randomNumbers[j]
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
        entries.reset();
        setIndex(0);
        setPlayerInput([]);
        firstInput.attributes["autofocus"] = true;
        console.log("firstInput", firstInput);
        console.log("entries", entries[0]);
        firstInput.focus();
        entries[0].focus();
      }
    }

    if (trials <= 7 && dead === 4) {
      setMessage(winMessage);
      setIsLoading(true);
      const res = await DOWContractInstance.checkTrials(trials);
      res.wait();
      setIsLoading(false);
      setIsOpen(true);
    } else if (trials >= 7 && dead !== 4) {
      setMessage(loseMessage);
      setIsLoading(true);
      const res = await DOWContractInstance.checkTrials(8);
      res.wait();
      setIsLoading(false);
      setIsOpen(true);
      entries.reset();
      setTrials(0);
    }
  };

  return (
    <section>
      <Sound isPlaying={isPlaying} />
      {loader && <Loader />}
      {isLoading && <Loader />}
      {loadingSuccess === false && navigate("/")}
      <form className="entries" action="#" onSubmit={handlePlay}>
        <label htmlFor="player-inputs">
          Enter four unique numbers from 0 - 9
        </label>
        <div className="input">
          <input
            type="text"
            maxLength={1}
            name="player-inputs"
            id="playerInput1"
            className="first-player-input player-input"
            value={playerInput[0]}
            onChange={handlePlayerInput}
            autoComplete="off"
            autoFocus={true}
            required={true}
          ></input>
          <input
            type="text"
            maxLength={1}
            name="player-inputs"
            id="playerInput2"
            className="second-player-input player-input"
            value={playerInput[1]}
            onChange={handlePlayerInput}
            autoComplete="off"
            required={true}
          ></input>
          <input
            type="text"
            maxLength={1}
            name="player-inputs"
            id="playerInput3"
            className="third-player-input player-input"
            value={playerInput[2]}
            onChange={handlePlayerInput}
            autoComplete="off"
            required={true}
          ></input>
          <input
            type="text"
            maxLength={1}
            name="player-inputs"
            id="playerInput4"
            className="fourth-player-input player-input"
            value={playerInput[3]}
            onChange={handlePlayerInput}
            autoComplete="off"
            required={true}
          ></input>
        </div>
        <div className="number-btns">
          <button
            className="number-btn"
            // disabled={!isDisabled}
            value="0"
            onClick={handleNumberButton}
          >
            0
          </button>
          <button
            className="number-btn"
            // disabled={!isDisabled}
            value="1"
            onClick={handleNumberButton}
          >
            1
          </button>
          <button
            className="number-btn"
            // disabled={!isDisabled}
            value="2"
            onClick={handleNumberButton}
          >
            2
          </button>
          <button
            className="number-btn"
            // disabled={!isDisabled}
            value="3"
            onClick={handleNumberButton}
          >
            3
          </button>
          <button
            className="number-btn"
            // disabled={!isDisabled}
            value="4"
            onClick={handleNumberButton}
          >
            4
          </button>
          <button
            className="number-btn"
            // disabled={!isDisabled}
            value="5"
            onClick={handleNumberButton}
          >
            5
          </button>
          <button
            className="number-btn"
            // disabled={!isDisabled}
            value="6"
            onClick={handleNumberButton}
          >
            6
          </button>
          <button
            className="number-btn"
            // disabled={!isDisabled}
            value="7"
            onClick={handleNumberButton}
          >
            7
          </button>
          <button
            className="number-btn"
            // disabled={!isDisabled}
            value="8"
            onClick={handleNumberButton}
          >
            8
          </button>
          <button
            className="number-btn"
            // disabled={!isDisabled}
            value="9"
            onClick={handleNumberButton}
          >
            9
          </button>
        </div>
        <div className="clear-play-btns">
          <button className="game-btn clear" onClick={handleClear}>
            Clear
          </button>
          <button className="game-btn play" onClick={handlePlay}>
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
          DOWContract={DOWContract}
          signer={signer}
          generatedValues={generatedValues}
          playerStatistics={playerStatistics}
          connected={connected}
          userBalance={userBalance}
          checkTrials={checkTrials}
          claimFreeTokens={claimFreeTokens}
          provider={provider}
          startGame={startGame}
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
