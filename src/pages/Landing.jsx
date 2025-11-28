import React from 'react';
import '../styles/globals.css';

function Landing({ navigateTo }) {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="medinova-title">MediNova</h1>
        <p className="subtitle">Medical Innovations Simulation Platform</p>
        
        <div className="auth-buttons">
          
          <div className="button-group">
            <button 
              className="btn btn-secondary"
              onClick={() => navigateTo('home')}
            >
              Login
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigateTo('home')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;