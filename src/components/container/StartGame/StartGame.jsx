import { React, useState } from "react";
import "./StartGame.css";
import Attempts from "./Attempts";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";
import Layout from "../../Layout";

const StartGame = (props) => {
  // Stores and handles the player's inputs
  const [playerInput, setPlayerInput] = useState([]);
  // Handles disabling/enabling input fields based on validity of input provided
  const [isDisabled, setIsDisabled] = useState(false);
  // const [view, setView] = useState("hide");
  const randomNumbers = [4, 2, 3, 1];
  const [roundScores, setRoundScores] = useState([]);
  console.log("Connected Status", props.connected);
  console.log("Start Game", props.startGame);
  console.log("Generated Values", props.generatedValues);
  console.log("User Balance", props.userBalance);
  console.log("Player Statistics", props.playerStatistics);
  // const clearBtn = document.querySelector(".clear");
  // const playBtn = document.querySelector(".play");
  // const numberBtn = document.querySelectorAll(".number-btn");
  let getPlayed = parseInt(localStorage.getItem("Played"), 10);
  let getWon = parseInt(localStorage.getItem("Won"), 10);
  let getLost = parseInt(localStorage.getItem("Lost"), 10);
  let [dead, setDead] = useState(0);
  let [wounded, setWounded] = useState(0);
  let [trials, setTrials] = useState(0);
  let [played, setPlayed] = useState(getPlayed);
  let [won, setWon] = useState(getWon);
  let [lost, setLost] = useState(getLost);
  localStorage.getItem("Won");
  localStorage.getItem("Lost");
  console.log("Local Storage Played", getPlayed);
  console.log("Local Storage Won", getWon);
  console.log("Local Storage Lost", getLost);
  // localStorage.removeItem("Played");
  // localStorage.removeItem("Won");
  // localStorage.removeItem("Lost");

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
      // console.log(`regX is ${regX.test(target.value)}`);
      // console.log(`e.target.value is ${target.value}`);
      setPlayerInput([...playerInput, target.value]);
      playerInput.push(target.value);
      // console.log(playerInput);
    } else {
      // Do not store the player's input if they are invalid (not numbers 0 - 9)
      // console.log(`regX is ${regX.test(target.value)}`);
      target.value = "";
      target.focus();
      // console.log(`e.target.value is ${target.value}`);
      // console.log(playerInput);
    }

    let container = document.getElementsByClassName("input")[0];
    container.onkeyup = (e) => {
       if (e.keycode === 8) {
         console.log("delete");
       }

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

  const handlePlay = (e) => {
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
      setTimeout(() => {
        alert(winMessage);
        window.location.reload(false);
      }, 300);
      setWon((won += 1));
      setPlayed((played += 1));
      localStorage.setItem("Won", won);
      localStorage.setItem("Played", played);
    } else if (trials >= 7 && dead !== 4) {
      // Delay alert for few seconds for player to see wrong input
      setTimeout(() => {
        alert(loseMessage);
        window.location.reload(false);
      }, 300);
      setLost((lost += 1));
      setPlayed((played += 1));
      localStorage.setItem("Lost", lost);
      localStorage.setItem("Played", played);
      // Reset game interface and values
      entries.reset();
      firstInput.attributes["disabled"] = setIsDisabled(false);
      firstInput.attributes["autofocus"] = true;
      firstInput.focus();
      setTrials((trials = trials = 0));
    }

    // setAttempt(playerInput);
    // console.log("Attempt:", attempt);
    console.log("playerInput:", playerInput);
    console.log("Round scores:", roundScores);
    // console.log(`Random Numbers Generated: ${randomNumbers}`);
    // console.log(`Your Guess: ${playerInput}`);

    console.log(`Trial Number ${trials}: ${dead} Dead - ${wounded} Wounded`);
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
            <button
              className="number-btn"
              value="0"
              onClick={handleNumberButton}
            >
              0
            </button>
            <button
              className="number-btn"
              value="1"
              onClick={handleNumberButton}
            >
              1
            </button>
            <button
              className="number-btn"
              value="2"
              onClick={handleNumberButton}
            >
              2
            </button>
            <button
              className="number-btn"
              value="3"
              onClick={handleNumberButton}
            >
              3
            </button>
            <button
              className="number-btn"
              value="4"
              onClick={handleNumberButton}
            >
              4
            </button>
            <button
              className="number-btn"
              value="5"
              onClick={handleNumberButton}
            >
              5
            </button>
            <button
              className="number-btn"
              value="6"
              onClick={handleNumberButton}
            >
              6
            </button>
            <button
              className="number-btn"
              value="7"
              onClick={handleNumberButton}
            >
              7
            </button>
            <button
              className="number-btn"
              value="8"
              onClick={handleNumberButton}
            >
              8
            </button>
            <button
              className="number-btn"
              value="9"
              onClick={handleNumberButton}
            >
              9
            </button>
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
          <Attempts
            trial={trials}
            confirmedAttempt={playerInput}
            dead={dead}
            wounded={wounded}
            roundScores={roundScores}
          />

          <Dashboard played={getPlayed} won={getWon} lost={getLost} />
        </div>
        <Link to="/">
          <button>Back</button>
        </Link>
      </section>
    </Layout>
  );
};

export default StartGame;
