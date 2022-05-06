import React from "react";
import "./Attempts.css";

const Attempts = (props) => {
  return (
    <section className="attempts">
      <h2>Attempts</h2>
      <ul>
        <li>
          {/* {props.trial} */}
          {props.confirmedAttempt}
        </li>
        <li>
          {props.dead} Dead - {props.wounded} Wounded
        </li>
      </ul>
      <ul>
        <li>
          {/* {props.trial} */}
          {props.confirmedAttempt}
        </li>
        <li>
          {props.dead} Dead - {props.wounded} Wounded
        </li>
      </ul>
      <ul>
        <li>
          {/* {props.trial} */}
          {props.confirmedAttempt}
        </li>
        <li>
          {props.dead} Dead - {props.wounded} Wounded
        </li>
      </ul>
      <ul>
        <li>
          {/* {props.trial} */}
          {props.confirmedAttempt}
        </li>
        <li>
          {props.dead} Dead - {props.wounded} Wounded
        </li>
      </ul>
      <ul>
        <li>
          {/* {props.trial} */}
          {props.confirmedAttempt}
        </li>
        <li>
          {props.dead} Dead - {props.wounded} Wounded
        </li>
      </ul>
      <ul>
        <li>
          {/* {props.trial} */}
          {props.confirmedAttempt}
        </li>
        <li>
          {props.dead} Dead - {props.wounded} Wounded
        </li>
      </ul>
      <ul>
        <li>
          {/* {props.trial} */}
          {props.confirmedAttempt}
        </li>
        <li>
          {props.dead} Dead - {props.wounded} Wounded
        </li>
      </ul>
    </section>
  );
};

export default Attempts;
