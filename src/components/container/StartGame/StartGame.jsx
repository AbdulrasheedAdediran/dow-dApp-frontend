import {React, useState} from "react";


import "./StartGame.css";

const StartGame = () => {
  const [guess, setGuess] = useState()
  return (
    <section>
      <div className="entries">
        <input type="number" className="playerGuess" value={guess} onChange={e => setGuess(e.target.value)}></input>
        <input type="number" className="playerGuess" value={guess} onChange={e => setGuess(e.target.value)}></input>
        <input type="number" className="playerGuess" value={guess} onChange={e => setGuess(e.target.value)}></input>
        <input type="number" className="playerGuess" value={guess} onChange={e => setGuess(e.target.value)}></input>
      </div>

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
