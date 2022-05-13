import { React, useState } from "react";
import "./StartGame.css";
import Attempts from "./Attempts";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";
import Layout from "../../Layout";

const StartGame = () => {
  // Stores and handles the player's inputs
  const [playerInput, setPlayerInput] = useState({
    playerInput1: "",
    playerInput2: "",
    playerInput3: "",
    playerInput4: "",
  });

  // Handles disabling/enabling input fields based on validity of input provided
  const [isDisabled, setIsDisabled] = useState(false);
  let [dead, setDead] = useState(0);
  let [wounded, setWounded] = useState(0);
  let [attempt, setAttempt] = useState([]);
  let [trials, setTrials] = useState(0);
  const [view, setView] = useState("hide");
  const randomNumbers = [4, 2, 3, 1];
  const numberButtons = document.getElementsByClassName("number-btn");
  const handlePlayerInput = (e) => {
    e.preventDefault();
    const target = e.target;
    const maxLength = parseInt(target.attributes["maxlength"].value, 10);
    const previous = target.previousElementSibling;
    const next = target.nextElementSibling;
    const inputs = document.querySelectorAll("input");
    const clearBtn = document.getElementsByClassName("clear");
    const playBtn = document.getElementsByClassName("play");
    const fieldName = target.getAttribute("name");
    const fieldValue = target.value;
    // playeScore == newFormData
    // addFormData == playerInput
    const playerScore = { ...playerInput };

    // Set valid inputs to be numbers 0 - 9
    const regX = /^[0-9]+$/;
    // Checks if inputs entered are valid and stores them in an array
    if (regX.test(target.value)) {
      console.log(`regX is ${regX.test(target.value)}`);
      console.log(`e.target.value is ${target.value}`);
      playerScore[fieldName] = fieldValue;
      // setPlayerInput({ [target.name]: target.value });
      // setPlayerInput([...playerInput, target.value])
      // playerInput.push(target.value);
      console.log(playerInput);
    } else {
      // Do not store the player's input if they are invalid (not numbers 0 - 9)
      console.log(`regX is ${regX.test(target.value)}`);
      target.value = "";
      target.focus();
      console.log(`e.target.value is ${target.value}`);
      console.log(`Player Input: ${playerInput.value}`);
      console.log("PlayerInput1:", playerInput.playerInput1);
      console.log("PlayerInput2:", playerInput.playerInput2);
      console.log("PlayerInput3:", playerInput.playerInput3);
      console.log("PlayerInput4:", playerInput.playerInput4);
    }

    let container = document.getElementsByClassName("input")[0];
    container.onkeyup = (e) => {
      let pressedKey = parseInt(String(e.key));
      console.log(` Pressed "${pressedKey}" key on the keyboard`);
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
    };
  };

  const handlePlay = async (e) => {
    const entries = document.querySelector(".entries");
    const inputs = document.querySelectorAll("input");
    const winMessage = "WAY TO GO GENIUS, YOU WON!!!";
    const loseMessage = "GAME OVER, BETTER LUCK NEXT TIME";
    let firstInput = inputs[0];
    e.preventDefault();
    if (trials <= 7 && dead !== 4) {
      setDead((dead = 0));
      setWounded((wounded = 0));
      setTrials((trials += 1));
      // Check Player Input and Return Round Scores
      for (let i = 0; i < 4; i++) {
        // Check if player guess is in the correct index of random numbers
        if (playerInput[i] == randomNumbers[i]) {
          setDead((dead += 1));
        }
        // Check if player guess is in the sequence but not in the correct index of random numbers
        for (let j = 0; j < 4; j++) {
          if (
            playerInput[i] != randomNumbers[i] &&
            playerInput[i] == randomNumbers[j]
          ) {
            setWounded((wounded += 1));
          }
        }
      }
    }

    // const n = 7;

    // [...playerInput(n)].map((elementInArray, index) => (
    //   <div className="" key={i}>
    //     {" "}
    //     Whatever needs to be rendered repeatedly{" "}
    //   </div>
    // ));

    // console.log(`Trial Number: ${trials}`);
    if (trials <= 7 && dead === 4) {
      alert(winMessage);
      window.location.reload(false);
    } else if (trials >= 7 && dead !== 4) {
      // Delay alert for few seconds for player to see wrong input
      setTimeout(function () {
        alert(loseMessage);
        window.location.reload(false);
      }, 500);
      // Reset game interface and values
      entries.reset();
      firstInput.attributes["disabled"] = setIsDisabled(false);
      firstInput.attributes["autofocus"] = true;
      firstInput.focus();
      setTrials(0);
    }
    setAttempt(playerInput);
    console.log(`Random Numbers Generated: ${randomNumbers}`);
    console.log(`Your Guess: ${playerInput}`);

    console.log(`Trial Number ${trials}: ${dead} Dead - ${wounded} Wounded`);

    // entries.reset();
    // firstInput.attributes["disabled"] = setIsDisabled(false);
    // firstInput.focus();

    // console.log("Works to this point");
    // if (window.confirm()) window.location.reload(false);
  };
  return (
    <Layout>
      <section>
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
            <button className="number-btn">0</button>
            <button className="number-btn">1</button>
            <button className="number-btn">2</button>
            <button className="number-btn">3</button>
            <button className="number-btn">4</button>
            <button className="number-btn">5</button>
            <button className="number-btn">6</button>
            <button className="number-btn">7</button>
            <button className="number-btn">8</button>
            <button className="number-btn">9</button>
          </div>
          <div className="clear-play-btns">
            <button className="game-btn clear">Clear</button>
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
          {/* {playerInput.map(() => ( */}
          <Attempts
            trial={trials}
            confirmedAttempt={attempt.join(" ")}
            dead={dead}
            wounded={wounded}
          />
          {/* ))} */}
          <Dashboard />
        </div>
        <Link to="/">
          <button>Back</button>
        </Link>
      </section>
    </Layout>
  );
};

export default StartGame;
