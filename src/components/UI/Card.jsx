import React from 'react';

function Card({ title, description, onClick, color = 'blue' }) {
  return (
    <div className={`card card-${color}`} onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="card-btn">Enter Simulation</button>
    </div>
  );
}

export default Card;