import React from "react";
import "./Dashboard.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import { easeQuadInOut } from "d3-ease";

const Dashboard = (props) => {
  let percentage = (props.won / props.played) * 100;
  let winRate = Math.round(percentage);

  return (
    <section className="dashboard">
      <h2>Dashboard</h2>
      <div className="statistics">
        <div className="win-rate-and-game-stats">
          <div className="win-rate">
            {/* <p>Win Rate</p>
            <p>{winRate}%</p> */}
            <CircularProgressbar
              className="progressBar"
              // valueStart={0}
              // valueEnd={winRate}
              // duration={1.4}
              // easingFunction={easeQuadInOut}
              value={winRate}
              text={`${winRate}%`}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "round",

                // Text size
                textSize: "1rem",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors
                pathColor: `hsla(111, 97%, 49%, 0.75), ${winRate / 100})`,
                textColor: "hsl(35, 80%, 90%)",
                trailColor: "hsl(35, 80%, 90%)",
                backgroundColor: "#333",
              })}
            />
          </div>
          <div className="played-won-lost">
            <div className="game-stats played">
              <p>{props.played}</p>
              <p>Played</p>
            </div>
            <div className="game-stats won">
              <p>{props.won}</p>
              <p>Won</p>
            </div>
            <div className="game-stats lost">
              <p>{props.lost}</p>
              <p>Lost</p>
            </div>
          </div>
        </div>
        <div className="streak-stats">
          <div className="current-streak">
            <p>Current Streak</p>
            <p>{props.currentStreak}</p>
          </div>
          <div className="max-streak">
            <p>Highest Streak</p>
            <p>{props.highestStreak}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
