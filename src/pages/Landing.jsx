import React from 'react';
import '../styles/globals.css'; // Make sure this path is correct

function Landing({ navigateTo }) {
  // Inline styles are generally discouraged in React, but can be used for dynamic/minimal styling.
  // Here we only define the structure.
  
  return (
    <div className="landing-container">
      <div className="landing-content">
        
        <header className="landing-header">
          <h1 className="medinova-title">
            <span style={{color: 'var(--accent-green)'}}>Medi</span>Nova
          </h1>
          <p className="subtitle">
            Medical Innovation & Decision Simulation Platform
          </p>
        </header>

        <div className="auth-buttons">
          <div className="button-group">
            {/* The primary action is Login, styled using the stronger primary button look */}
            <button 
              className="btn btn-primary"
              onClick={() => navigateTo('login')} // Assuming a 'login' route
            >
              Secure Login
            </button>
            {/* The secondary action is Sign Up, styled to be prominent but secondary */}
            <button 
              className="btn btn-secondary"
              onClick={() => navigateTo('signup')} // Assuming a 'signup' route
            >
              Start Free Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;