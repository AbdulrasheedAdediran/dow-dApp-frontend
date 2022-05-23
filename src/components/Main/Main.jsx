import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Main.css";

const Main = ({ connected, claimFreeTokens, startGame, userBalance }) => {
  const location = useLocation();
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (!connected && parseInt(userBalance.DOWTokenBalance) < 5) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
      <button className="claim-dow-button" onClick={claimFreeTokens}>
        Claim DOW Tokens
      </button>
      <div className="main-menu-links">
        <Link to="/startGame">
          <button
            className="menu-button start-game"
            disabled={isDisabled}
            onClick={startGame}
          >
            Start Game
          </button>
        </Link>
        <Link to="/howToPlay">
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
