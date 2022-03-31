import React from "react";

import "./StartGame.css";

const StartGame = () => {
  return (
    <section>
      <ul className="entries">
        <li>{}</li>
        <li>{}</li>
        <li>{}</li>
        <li>{}</li>
      </ul>

      <button>Play</button>

      <div className="attempts-and-trials">
        <div className="attempts">
          <p>Attempts:</p>
          <span>{}</span>
        </div>
        <div className="trials">
          <p>Trials Left:</p>
          <span>{}</span>
        </div>
      </div>

      <ul className="scores">
        <li>{}</li>
        <li>{}</li>
        <li>{}</li>
        <li>{}</li>
      </ul>
    </section>
  );
};

export default StartGame;
