import React from 'react'

const Landing = ({ onNavigate }) => {
  return (
    <div className="landing-page">
      {/* Simple Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="logo">
            <span className="logo-icon">⚕️</span>
            <h1>MediNova</h1>
          </div>
          
          <h2>Medical Emergency Simulator</h2>
          <p>Train for real medical emergencies through interactive simulations</p>

          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => onNavigate('signup')}
            >
              Get Started Free
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => onNavigate('login')}
            >
              I Have an Account
            </button>
          </div>
        </div>
      </section>

      {/* Simple Features */}
      <section className="features-section">
        <div className="feature">
          <div className="feature-icon">🫀</div>
          <h3>Cardiac Emergencies</h3>
          <p>Practice ACLS protocols in realistic scenarios</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💨</div>
          <h3>Respiratory Crises</h3>
          <p>Manage airway emergencies and oxygen therapy</p>
        </div>
      </section>
    </div>
  )
}

export default Landing