import React from "react";
import "./HowToPlay.css";
import { Link } from "react-router-dom";
import Layout from "../../Layout";

const HowToPlay = () => {
  return (
    <Layout>
      <div className="howToPlay">
        <h1>How To Play</h1>
        <p>There are four random unique numbers for each game.</p>
        <p>
          Enter four unique numbers and click Play or hit Enter on your keyboard
          to submit
        </p>
        <p>
          If you guess a number that is in the sequence and is in the correct
          position, that number is dead and will be marked red.
        </p>
        <p>
          If you guess a number that is in the sequence but is not in the
          correct position, that number is wounded and will be marked orange.
        </p>
        <p>Guess the correct sequence of numbers in 7 tries or less to win.</p>
        <Link to="/">
          <button>Got It</button>
        </Link>
      </div>
    </Layout>
  );
};

export default HowToPlay;
