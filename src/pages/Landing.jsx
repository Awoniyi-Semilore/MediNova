import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/globals.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="medinova-title">MediNova</h1>
        <p className="subtitle">Medical Innovations Simulation Platform</p>
        
        <div className="auth-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/home')}
          >
            Get Started
          </button>
          <div className="button-group">
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/signup')}
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