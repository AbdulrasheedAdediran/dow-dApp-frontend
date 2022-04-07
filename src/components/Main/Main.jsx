import { React, useState } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";

import "./Main.css";

const Main = ({ handleStart, handleHowToPlay, handleOptions, handleAbout }) => {
  return (
    <Layout>
      <main>
        <Link to="/startGame">
          {" "}
          <button onClick={handleStart}>Start Game</button>{" "}
        </Link>
        <Link to="/howToPlay">
          {" "}
          <button onClick={handleHowToPlay}>How to Play</button>
        </Link>
        <Link to="/options">
          <button onClick={handleOptions}>Options</button>
        </Link>
        <Link to="/about">
          <button onClick={handleAbout}>About</button>
        </Link>
      </main>
    </Layout>
  );
};

export default Main;
