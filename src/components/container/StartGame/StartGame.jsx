import {React, useState} from "react";
import "./StartGame.css";

const StartGame = () => {
    const [playerInput, setPlayerInput] = useState({playerInput1:"", playerInput2:"", playerInput3:"", playerInput4:""})
    const handlePlayerInput = (e) =>{
      const value = e.target.value
      setPlayerInput({...playerInput, [e.target.name]: value})
    }
    const displayResult = () => {
  
    }
    return (
      <section>
      
        <form className="entries" action="#" onSubmit={displayResult}>
          <label for="player-inputs"> Enter four unique numbers from 0 - 9 </label>
          <input type="text" maxLength={1} minLength={1} name="playerInput1" id="player-inputs" className="first-player-input player-input" value={playerInput.playerInput1} onChange={handlePlayerInput} onkeypress="return event.charCode === 0 || /\d/.test(String.fromCharCode(event.charCode));"></input>
          <input type="text" maxLength={1} minLength={1} name="playerInput2" id="player-inputs" className="second-player-input player-input" value={playerInput.playerInput2} onChange={handlePlayerInput} oninput="value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"></input>
          <input type="text" maxLength={1} minLength={1} name="playerInput3" id="player-inputs" className="third-player-input player-input" value={playerInput.playerInput3} onChange={handlePlayerInput} pattern="[0-9]+"></input>
          <input type="text" maxLength={1} minLength={1} name="playerInput4" id="player-inputs" className="fourth-player-input player-input" value={playerInput.playerInput4} onChange={handlePlayerInput} pattern="[0-9]+"></input>
        <button type="submit">Play</button>
        </form>

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
