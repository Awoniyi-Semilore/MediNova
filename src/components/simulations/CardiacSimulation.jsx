import React from 'react'

const CardiacSimulation = ({ onNavigate }) => {
  return (
    <div className="simulation-page">
      <header className="simulation-header">
        <button 
          className="btn btn-outline"
          onClick={() => onNavigate('home')}
        >
          ← Back to Home
        </button>
        <h1>Code Blue: Room 3</h1>
        <p>Cardiac Arrest Simulation</p>
      </header>

      <div className="simulation-content">
        <div className="scenario-intro">
          <h2>Scenario: Cardiac Arrest - VF/Pulseless VT</h2>
          <p>
            You respond to a Code Blue in the ICU. The patient, Mr. Evans (56M), 
            has collapsed and is unresponsive. The monitor shows Ventricular Fibrillation.
          </p>
        </div>

        <div className="simulation-area">
          <div className="patient-status">
            <h3>Patient Status</h3>
            <div className="status-grid">
              <div className="status-item">
                <span>Rhythm:</span>
                <span className="critical">Ventricular Fibrillation</span>
              </div>
              <div className="status-item">
                <span>Pulse:</span>
                <span className="critical">Absent</span>
              </div>
              <div className="status-item">
                <span>BP:</span>
                <span className="critical">0/0</span>
              </div>
              <div className="status-item">
                <span>O2 Sat:</span>
                <span className="critical">60%</span>
              </div>
            </div>
          </div>

          <div className="action-choices">
            <h3>What's your first action?</h3>
            <div className="choices">
              <button className="choice-btn correct">
                Check responsiveness and pulse
              </button>
              <button className="choice-btn">
                Call a code blue
              </button>
              <button className="choice-btn incorrect">
                Start CPR immediately
              </button>
              <button className="choice-btn incorrect">
                Get the defibrillator
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

export default CardiacSimulation