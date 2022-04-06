import React from "react";
import Layout from "../Layout";



import "./Main.css";

const Main = ({ handleStart, handleHowToPlay, handleOptions, handleAbout }) => {
  return (
    <Layout>
      <main>
        <button onClick={handleStart}>Start Game</button>
        <button onClick={handleHowToPlay}>How to Play</button>
        <button onClick={handleOptions}>Options</button>
        <button onClick={handleAbout}>About</button>
      </main>
    </Layout>
  );
};

export default Main;
