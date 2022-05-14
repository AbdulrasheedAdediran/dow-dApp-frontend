import React from "react";
import "./Dashboard.css";
const Dashboard = () => {
  return (
    <section className="dashboard">
      <h2>Dashboard</h2>
      <div className="statistics">
        <div className="win-rate-and-game-stats">
          <div className="win-rate">
            <p>Win Rate</p>
            <p>85%</p>
          </div>
          <div className="played-won-lost">
            <div className="game-stats played">
              <p>47</p>
              <p>Played</p>
            </div>
            <div className="game-stats won">
              <p>40</p>
              <p>Won</p>
            </div>
            <div className="game-stats lost">
              <p>07</p>
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
