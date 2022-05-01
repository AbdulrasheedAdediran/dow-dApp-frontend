import { React, useState } from "react";
import "./StartGame.css";
import Attempts from "./Attempts";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";
import Layout from "../../Layout";

const StartGame = () => {
  // Stores and handles the player's inputs
  const [playerInput, setPlayerInput] = useState([]);
  // Handles disabling/enabling input fields based on validity of input provided
  const [isDisabled, setIsDisabled] = useState(false);

  const handlePlayerInput = (e) => {
    e.preventDefault();
    const target = e.target;
    const maxLength = parseInt(target.attributes["maxlength"].value, 10);
    const previous = target.previousElementSibling;
    const next = target.nextElementSibling;
    const inputs = document.querySelectorAll("input");
    const clearBtn = document.getElementsByClassName(".clear");

    // Set valid inputs to be numbers 0 - 9
    const regX = /^[0-9]+$/;
    // Checks if inputs entered are valid and stores them in an array
    if (regX.test(target.value)) {
      console.log(`regX is ${regX.test(target.value)}`);
      console.log(`e.target.value is ${target.value}`);
      playerInput.push(e.target.value);
      console.log(playerInput);
    } else {
      // Do not store the player's input if they are invalid (not numbers 0 - 9)
      console.log(`regX is ${regX.test(target.value)}`);
      target.value = "";
      target.focus();
      console.log(`e.target.value is ${target.value}`);
      console.log(playerInput);
    }

    /*======= 
    BUGS
    1. Must focus on first input onLoad and disable following inputs => DONE
    2. Must clear inputs onCLick of `Backspace` or `Clear` (including first input)
    3. Must write to next available input field after clearing
    4. Handle `null` error in console that pops up when the last input is filled => DONE
    5. Handle incorrect entry of data into input array that result from cleared inputs
    6. Handle received the string `true` for the boolean attribute `disabled` warning in console
    


    ===== CLEAR =====
    - If the current input is !empty{
    keep focus on current input
    clear the current input; 
    pop the value from the playerInput array;
    accept a new value;
    push new value to the playerInput array
    } else if the current input is empty {
    switch focus to the previous input; 
    clear the previous input; 
    pop the value from the playerInput array; 
    accept a new value and push it to the playerInput array
    }
    else if current input is empty && current input is the first input || previous input is null{
    keep focus on current input;
    accept a new value and push it to the playerInput array
    if maxLength{
    switch focus to next input 
    }
    }
    =======*/

    // clearBtn.onClick(() => {
    //   let firstInput = inputs[0];
    //   if (maxLength) {
    //     target.focus();
    //     target.value = "";
    //     playerInput.pop();
    //   } else if (!maxLength) {
    //     previous.focus();
    //     previous.target.value = "";
    //     playerInput.pop();
    //   } else if (!maxLength && (target === firstInput || previous === null)) {
    //     target.focus();
    //   }
    // });
    let container = document.getElementsByClassName("input")[0];
    container.onkeyup = (e) => {
      let pressedKey = String(e.key);
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
        } else if (previous !== firstInput) {
          previous.attributes["disabled"] = setIsDisabled(true);
          previous.focus();
          playerInput.pop();
        }
      }

      // Move to previous field if empty (user pressed backspace)
      // else if (focusedInputLength < minLength) {
      //   // let previous = target.previousElementSibling;
      //   if (previous === null) {
      //     return;
      //   } else if (
      //     previous.tagName.toLowerCase() === "input" ||
      //     previous.attributes[isDisabled]
      //   ) {
      //     previous.focus();
      //     playerInput.pop();
      //   }
      // }
    };
    // const key = event.key;
    // let pressedKey = String(e.key);
    // if (pressedKey === "Backspace" || pressedKey === "Delete") {
    //   e.preventDefault();
    //   let firstInput = inputs[0];
    //   let focusedInputLength = target.value.length;
    //   if (focusedInputLength >= maxLength) {
    //     target.focus();
    //     target.value = "";
    //     playerInput.pop();
    //   } else if (focusedInputLength < maxLength) {
    //     previous.attributes["disabled"] = setIsDisabled(true);
    //     previous.focus();
    //     previous.target.value = "";
    //     playerInput.pop();
    //   } else if (
    //     focusedInputLength < maxLength &&
    //     (target === firstInput || previous === null)
    //   ) {
    //     target.focus();
    //   }
    // }

    /***======== */
  };
  const handlePlay = (e) => {
    const entries = document.querySelector(".entries");
    e.preventDefault();
    console.log(playerInput);
    // entries.reset();
    let firstInput = document.getElementsByClassName("first-player-input");
    console.log(firstInput.value);
    firstInput.setAttribute("autofocus", "");
    console.log(`setPlayerInput is ${setPlayerInput([])}`);
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
              autoFocus
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
              type="submit"
              onClick={handlePlay}
              disabled="true"
            >
              Play
            </button>
          </div>
        </form>

        <div className="attempts-and-dashboard">
          <Attempts confirmedInput={playerInput} />
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

/**


    // FOCUS NEXT INPUT FIELD
    const { maxLength, name, value } = e.target;
    const { fieldName, fieldIndex } = name.split("-");
    // Check if max length has been reached
    if (value.length >= maxLength) {
      // Check if it's not the last input field
      if (parseInt(value, 10) < 4) {
        // Get the next input field
        const nextInputField = document.querySelector(
          `input[name=playerInput${parseInt(fieldIndex, 10) + 1}]`
        );
        // If found, focus next field
        if (nextInputField !== null) {
          nextInputField.focus();
        }
      }


      ===========================

       // Check if max length has been reached
    if (value.length >= maxLength) {
      // Check if it's not the last input field
      if (parseInt(value, 10) < 4) {
        // Get the next input field
        const nextInputField = document.querySelector(
          `input[name=playerInput${parseInt(fieldIndex, 10) + 1}]`
        );
        // If found, focus next field
        if (nextInputField !== null) {
          nextInputField.focus();
        }
      }
    }
  };
 */
