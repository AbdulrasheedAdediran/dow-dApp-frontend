import React from "react";
import "./Gameplay.css";

const Gameplay = () => {
  return (
    <section>
      <div className="entries">
        <div>**</div>
        <div>**</div>
        <div>**</div>
        <div>**</div>
      </div>

      <button>Play</button>

      <div className="attempts-and-trials">
        <div className="attempts">
          <p>Attempts:</p>
          <span>**</span>
        </div>
        <div className="trials">
          <p>Trials Left:</p>
          <span>**</span>
        </div>
      </div>

      <div className="scores">
        <ul>
          <li>Dead</li>
          <li>Wounded</li>
          <li>Healthy</li>
          <li>Dead</li>
        </ul>
      </div>
    </section>
  );
};

export default Gameplay;
