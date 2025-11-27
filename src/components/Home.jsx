import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'

const Home = ({ onNavigate, user }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="header-content">
          <h1>Welcome to MediNova</h1>
          <p>Ready to test your emergency response skills?</p>
          <button 
            className="btn btn-outline logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Emergency Scenarios */}
      <section className="scenarios-section">
        <h2>Choose Your Emergency Scenario</h2>
        
        <div className="emergency-cards">
          {/* Cardiac Emergency */}
          <div 
            className="emergency-card cardiac"
            onClick={() => onNavigate('cardiac-simulation')}
          >
            <div className="card-header">
              <div className="card-icon">🫀</div>
              <span className="card-badge">ACLS Required</span>
            </div>
            <h3>Code Blue: Room 3</h3>
            <p>Cardiac Arrest - VF/Pulseless VT</p>
            <ul className="scenario-features">
              <li>• Real-time rhythm recognition</li>
              <li>• CPR quality monitoring</li>
              <li>• Defibrillation timing</li>
              <li>• Medication administration</li>
            </ul>
            <div className="card-footer">
              <span className="duration">⏱️ 15-20 minutes</span>
              <button className="btn btn-primary">Start Simulation</button>
            </div>
          </div>

          {/* Respiratory Emergency */}
          <div 
            className="emergency-card respiratory"
            onClick={() => onNavigate('respiratory-simulation')}
          >
            <div className="card-header">
              <div className="card-icon">💨</div>
              <span className="card-badge">PALS Focus</span>
            </div>
            <h3>Pediatric Respiratory Distress</h3>
            <p>4-year-old with breathing difficulties</p>
            <ul className="scenario-features">
              <li>• Airway assessment</li>
              <li>• Oxygen delivery systems</li>
              <li>• Medication administration</li>
              <li>• Family communication</li>
            </ul>
            <div className="card-footer">
              <span className="duration">⏱️ 10-15 minutes</span>
              <button className="btn btn-primary">Start Simulation</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home