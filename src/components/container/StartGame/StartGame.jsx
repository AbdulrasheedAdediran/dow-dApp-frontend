import { React, useState } from "react";
import "./StartGame.css";
import Attempts from "./Attempts";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";
import Layout from "../../Layout";

const StartGame = () => {
  const [playerInput, setPlayerInput] = useState([]);
  const setFocus = document.querySelector(".first-player-input");
  window.onload = setFocus.focus();
  const handlePlayerInput = (e) => {
    const regX = /^[0-9]+$/;

    if (e.target.value === "" || regX.test(e.target.value)) {
      setPlayerInput([...playerInput, e.target.value]);
    }
  };
  const handlePlay = (e) => {};
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
            ></input>
          </div>
          <div className="number-btns">
            <button className="input-btn">0</button>
            <button className="input-btn">1</button>
            <button className="input-btn">2</button>
            <button className="input-btn">3</button>
            <button className="input-btn">4</button>
            <button className="input-btn">5</button>
            <button className="input-btn">6</button>
            <button className="input-btn">7</button>
            <button className="input-btn">8</button>
            <button className="input-btn">9</button>
          </div>
          <div className="clear-play-btns">
            <button className="game-btn clear">Clear</button>
            <button
              className="game-btn play"
              type="submit"
              onClick={handlePlay}
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
 *   const SSNField = () => {
      const { handleChange } = useSSNFields();

      return (
        <>
          <input
            type="text"
            name="ssn-1"
            maxLength={3}
            onChange={handleChange}
          />
          <input
            type="text"
            name="ssn-2"
            maxLength={2}
            onChange={handleChange}
          />
          <input
            type="text"
            name="ssn-3"
            maxLength={4}
            onChange={handleChange}
          />
        </>
      );
    };

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
