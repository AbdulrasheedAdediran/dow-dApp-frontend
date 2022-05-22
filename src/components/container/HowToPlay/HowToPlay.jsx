import React from "react";
import "./HowToPlay.css";
import { Link } from "react-router-dom";
import Layout from "../../Layout";

const HowToPlay = () => {
  return (
    <div className="howToPlay">
      <h1>How To Play</h1>
      <ul>
        <li>There are four unique random numbers for each game.</li>
        <li>
          The goal is to guess the correct number and correct position of all
          four numbers.
        </li>
        <li>
          Enter four unique numbers and click Play or hit Enter on your keyboard
          to submit.
        </li>
        <li>
          Each attempt you make will be recored to inform your next trial.
        </li>
        <li>
          A number is considered to be wounded if you guess the correct number
          but got the position wrong.
        </li>
        <li>
          A number is considered to be dead if you guess both the number and
          position correct.
        </li>
      </ul>

      <Link to="/" className="button">
        <button>Got It</button>
      </Link>
    </div>
  );
};

export default HowToPlay;
