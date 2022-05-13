import { React } from "react";
import "./Attempts.css";
import Scores from "./Scores";

const Attempts = (props) => {
  return (
    <section className="attempts">
      <h2>Attempts</h2>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>ATTEMPTS</th>
            <th>SCORE</th>
          </tr>
        </thead>
        <tbody>
          <Scores props={props} />
        </tbody>
      </table>
    </section>
  );
};

export default Attempts;
