import React from "react";
import "./Dashboard.css";
const Dashboard = () => {
  return (
    <section className="dashboard">
      <h2>Dashboard</h2>
      <div className="statistics-and-balance">
        <div className="statistics">
          <div className="stats">
            <p>Current Streak:</p>
            <p>25 days</p>
          </div>
          <div className="stats">
            <p>Longest Streak:</p>
            <p>36 days</p>
          </div>
          <div className="stats">
            <p>Games Played:</p>
            <p>69</p>
          </div>
          <div className="stats">
            <p>Win Percentage:</p>
            <p>87%</p>
          </div>
          <div className="stats">
            <p>Your Position:</p>
            <p>115th</p>
          </div>
        </div>
        <div className="balance">
          <p>00.000 MATIC</p>
          <p>00.000 DOW</p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
