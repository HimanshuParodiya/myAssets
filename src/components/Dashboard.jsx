import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="container dashboard-container">
      <h1>Overview</h1>
      <div className="dashboard-metrics">
        <div className="metric dashboard-metric-1">
          <h3>Total Assets</h3>
          <p>10</p>
        </div>
        <div className="metric dashboard-metric-2">
          <h3>Operational</h3>
          <p>8</p>
        </div>
        <div className="metric dashboard-metric-3">
          <h3>Under Maintenance</h3>
          <p>2</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
