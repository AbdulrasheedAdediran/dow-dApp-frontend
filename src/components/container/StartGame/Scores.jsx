import React from "react";

const Scores = (props) => {
  return (
    <tr key={props.trial}>
      <td>{props.trial}</td>
      <td>{props.confirmedAttempt}</td>
      <td>
        {props.dead} Dead - {props.wounded} Wounded
      </td>
    </tr>
  );
};

export default Scores;
