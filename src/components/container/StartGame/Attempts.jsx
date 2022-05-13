import { React, useState } from "react";
import "./Attempts.css";

const Attempts = (props) => {
  const [roundScores, setRoundScores] = useState([
    {
      trial: props.trial,
      attempt: props.confirmedAttempt,
      dead: props.dead,
      wounded: props.wounded,
    },
  ]);
  return (
    <section className="attempts">
      <h2>Attempts</h2>
      <table>
        <thead>
          <tr>
            <th>Trial</th>
            <th>Player Guess</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {roundScores.map((roundScore) => (
            <tr key={roundScore.trial}>
              <td>{roundScore.trial}</td>
              <td>{roundScore.confirmedAttempt}</td>
              <td>
                {roundScore.dead} Dead - {roundScore.wounded} Wounded
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Attempts;
