import { React } from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";

import "./Main.css";

const Main = (props) => {
  return (
    // <Layout>
    <main>
      <div className="dow-text">
        <div className="dow-text-border" />
        <h1 className="dead-text">Dead</h1>
        <p className="dow-text-or">or</p>
        <h1>Wounded</h1>
        <div className="dow-text-border" />
      </div>

      <div className="main-menu-links">
        <Link to="/startGame">
          {" "}
          <button className="menu-button" onClick={props.startGame}>
            Start Game
          </button>{" "}
        </Link>
        <Link to="/howToPlay">
          {" "}
          <button className="menu-button">How to Play</button>
        </Link>
        <Link to="/options">
          <button className="menu-button">Options</button>
        </Link>
        <Link to="/about">
          <button className="menu-button">About</button>
        </Link>
      </div>
    </main>
    // </Layout>
  );
};

export default Main;
