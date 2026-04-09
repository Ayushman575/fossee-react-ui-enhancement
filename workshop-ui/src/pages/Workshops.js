import React from "react";
import "../styles/workshops.css";

const workshops = [
  {
    id: 1,
    title: "Python Basics",
    date: "2026-04-10",
    instructor: "Dr. Sharma",
  },
  {
    id: 2,
    title: "Machine Learning",
    date: "2026-04-15",
    instructor: "Prof. Singh",
  },
];

const Workshops = () => {
  return (
    <div className="workshop-container">
      <h2>Available Workshops</h2>

      <div className="workshop-grid">
        {workshops.map((workshop) => (
          <div key={workshop.id} className="card">
            <h3>{workshop.title}</h3>
            <p>Date: {workshop.date}</p>
            <p>Instructor: {workshop.instructor}</p>
            <button>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workshops;