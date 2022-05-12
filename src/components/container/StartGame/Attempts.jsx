import React from "react";
import "./Attempts.css";

const Attempts = (props) => {
  // const [scores, setScores] = useState([]);
  // const updateScore = () => {
  //   setScores([
  //     ...scores,
  //     {
  //       id: scores.length,
  //       value: Math.floor(Math.random() * 10),
  //     },
  //   ]);
  // };
  // <div>
  //   <button onclick={updateScore}> getSores</button>
  //   <ul>
  //     {scores.map((score) => (
  //       <li key={score.id}>{score.value}</li>
  //     ))}
  //   </ul>
  // </div>;
  return (
    <section className="attempts">
      <h2>Attempts</h2>
      <ul>
        <li>{props.trial}</li>
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
