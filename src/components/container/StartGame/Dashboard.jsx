import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "./Dashboard.css";

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
              value={percentage}
              text={`${winRate}%`}
              styles={{
                // Customize the root svg element
                root: {},
                // Customize the path, i.e. the "completed progress"
                path: {
                  // Path color
                  stroke: `rgba(62, 152, 199, ${percentage / 100})`,
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "butt",
                  // Customize transition animation
                  transition: "stroke-dashoffset 0.5s ease 0s",
                  // Rotate the path
                  transform: "rotate(0.25turn)",
                  transformOrigin: "center center",
                },
                // Customize the circle behind the path, i.e. the "total progress"
                trail: {
                  // Trail color
                  stroke: "#d6d6d6",
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "butt",
                  // Rotate the trail
                  transform: "rotate(0.25turn)",
                  transformOrigin: "center center",
                },
                // Customize the text
                text: {
                  // Text color
                  fill: "#f88",
                  // Text size
                  fontSize: "16px",
                },
                // Customize background - only used when the `background` prop is true
                background: {
                  fill: "#3e98c7",
                },
              }}
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
            <p>10 Wins</p>
          </div>
          <div className="max-streak">
            <p>Highest Streak</p>
            <p>20 Wins</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
