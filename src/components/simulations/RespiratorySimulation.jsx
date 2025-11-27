import React from 'react'

const RespiratorySimulation = ({ onNavigate }) => {
  return (
    <div className="simulation-page">
      <header className="simulation-header">
        <button 
          className="btn btn-outline"
          onClick={() => onNavigate('home')}
        >
          ← Back to Home
        </button>
        <h1>Pediatric Respiratory Distress</h1>
        <p>Respiratory Emergency Simulation</p>
      </header>

      <div className="simulation-content">
        <div className="scenario-intro">
          <h2>Scenario: 4-year-old with Breathing Difficulties</h2>
          <p>
            A 4-year-old child is brought to the ED by anxious parents. 
            The child is struggling to breathe and appears distressed.
          </p>
        </div>

        <div className="simulation-area">
          <div className="patient-status">
            <h3>Patient Status</h3>
            <div className="status-grid">
              <div className="status-item">
                <span>Respiratory Rate:</span>
                <span className="critical">45/min</span>
              </div>
              <div className="status-item">
                <span>O2 Sat:</span>
                <span className="critical">88%</span>
              </div>
              <div className="status-item">
                <span>Heart Rate:</span>
                <span className="critical">160 bpm</span>
              </div>
              <div className="status-item">
                <span>Breath Sounds:</span>
                <span className="warning">Wheezing bilateral</span>
              </div>
            </div>
          </div>

          <div className="action-choices">
            <h3>What's your first assessment?</h3>
            <div className="choices">
              <button className="choice-btn correct">
                Assess airway, breathing, circulation
              </button>
              <button className="choice-btn">
                Administer oxygen immediately
              </button>
              <button className="choice-btn incorrect">
                Send for chest X-ray
              </button>
              <button className="choice-btn incorrect">
                Start IV access
              </button>
            </div>
          </div>
        </div>

        <div className="simulation-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{width: '10%'}}></div>
          </div>
          <span>Scenario Progress: 10%</span>
        </div>
      </div>
    </div>
  )
}

export default RespiratorySimulation