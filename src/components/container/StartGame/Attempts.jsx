import { React } from "react";
import "./Attempts.css";

const Attempts = (props) => {
  const maxTrials = 7;
  // const roundScores = [
  //   {
  //     trial: props.trial,
  //     attempt: props.confirmedAttempt,
  //     dead: props.dead,
  //     wounded: props.wounded,
  //   },
  // ];
  // console.log("Roundscores Full Data", props.roundScores);
  // console.log("Trial Number:", props.roundScores[0]?.trial);
  // console.log("Confirmed Attempt:", props.roundScores[0]?.attempt);
  // console.log("Dead:", props.roundScores[0]?.dead);
  // console.log("Wounded:", props.roundScores[0]?.wounded);
  return (
    <section className="attempts">
      <h2>Attempts</h2>
      <table>
        <thead>
          <tr>
            <th>Trial</th>
            <th>Attempt</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {props.roundScores.map((roundScore) => (
            <tr key={roundScore.trial}>
              <td>
                {roundScore.trial}/{maxTrials}
              </td>
              <td>{roundScore.attempt}</td>
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
