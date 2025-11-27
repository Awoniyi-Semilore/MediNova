import React from 'react'

const Landing = ({ onNavigate }) => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            MediNova
            <span className="hero-subtitle">Medical Emergency Simulator</span>
          </h1>
          
          <p className="hero-description">
            Train for real medical emergencies through interactive simulations. 
            Practice critical decision-making in cardiac arrest and respiratory crisis scenarios.
          </p>

          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => onNavigate('signup')}
            >
              Sign Up Free
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => onNavigate('login')}
            >
              Login
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="medical-icon">⚕️</div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="features-preview">
        <h2>Realistic Emergency Scenarios</h2>
        <div className="scenario-cards">
          <div className="scenario-card">
            <div className="scenario-icon">🫀</div>
            <h3>Cardiac Arrest</h3>
            <p>Code Blue: Room 3 - Manage V-Fib, CPR, and defibrillation</p>
          </div>
          
          <div className="scenario-card">
            <div className="scenario-icon">💨</div>
            <h3>Respiratory Crisis</h3>
            <p>Pediatric respiratory distress - Airway management and stabilization</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing