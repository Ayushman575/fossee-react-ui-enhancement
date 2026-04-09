import React from "react";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Welcome </h1>
      <p>Your account has been created successfully.</p>

      <div className="card-container">
        <div className="card">
          <h3> Workshops</h3>
          <p>Browse available workshops</p>
        </div>

        <div className="card">
          <h3> Bookings</h3>
          <p>View your bookings</p>
        </div>

        <div className="card">
          <h3> Settings</h3>
          <p>Manage your profile</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;