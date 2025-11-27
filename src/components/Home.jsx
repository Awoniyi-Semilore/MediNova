import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'
import ConfirmPopup from './ConfirmPopup'

const Home = ({ onNavigate, user }) => {
  const [showConfirm, setShowConfirm] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleLogoClick = () => {
    setShowConfirm(true)
  }

  const handleConfirmHome = () => {
    setShowConfirm(false)
    onNavigate('home')
  }

  const handleCancelHome = () => {
    setShowConfirm(false)
  }

  return (
    <div className="home-page">
      <ConfirmPopup 
        show={showConfirm}
        title="Leave Simulation?"
        message="Are you sure you want to go back to home? Your progress in the current simulation will be saved."
        onConfirm={handleConfirmHome}
        onCancel={handleCancelHome}
      />

      {/* New Beautiful Header */}
      <header className="home-header-new">
        <div className="header-top">
          <div className="logo-container" onClick={handleLogoClick}>
            <span className="header-logo-icon">⚕️</span>
            <div className="header-logo-text">
              <h1>MediNova</h1>
              <span className="logo-subtitle">Medical Innovations</span>
            </div>
          </div>
          
          <div className="header-user">
            <span className="welcome-text">
              Welcome, {user?.displayName?.split(' ')[0] || 'Medic'}!
            </span>
            <button 
              className="btn btn-outline logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="header-hero">
          <h2>Emergency Medicine Training Center</h2>
          <p>Practice real medical scenarios in a safe, interactive environment</p>
        </div>
      </header>

      {/* Emergency Scenarios with Warm Accents */}
      <section className="scenarios-section-new">
        <div className="scenarios-header">
          <h2>Choose Your Training Scenario</h2>
          <p>Select an emergency scenario to test your medical response skills</p>
        </div>
        
        <div className="emergency-cards-new">
          {/* Cardiac Emergency */}
          <div 
            className="emergency-card-new cardiac-card"
            onClick={() => onNavigate('cardiac-simulation')}
          >
            <div className="card-badge-new urgent">URGENT CARE</div>
            <div className="card-content">
              <div className="card-icon-new">🫀</div>
              <h3>Code Blue: Cardiac Arrest</h3>
              <p className="card-description">
                Manage a patient through VF/Pulseless VT following ACLS protocols. 
                Practice defibrillation, CPR, and medication administration.
              </p>
              <ul className="scenario-features-new">
                <li>Real-time rhythm recognition</li>
                <li>CPR quality monitoring</li>
                <li>Defibrillation timing</li>
                <li>Medication administration</li>
              </ul>
              <div className="card-footer-new">
                <div className="card-meta">
                  <span className="duration">⏱️ 15-20 min</span>
                  <span className="difficulty">🎯 Advanced</span>
                </div>
                <button className="btn btn-primary card-action-btn">
                  Start Simulation
                </button>
              </div>
            </div>
          </div>

          {/* Respiratory Emergency */}
          <div 
            className="emergency-card-new respiratory-card"
            onClick={() => onNavigate('respiratory-simulation')}
          >
            <div className="card-badge-new critical">CRITICAL CARE</div>
            <div className="card-content">
              <div className="card-icon-new">💨</div>
              <h3>Pediatric Respiratory Crisis</h3>
              <p className="card-description">
                Manage a 4-year-old with severe respiratory distress. 
                Practice airway assessment, oxygen therapy, and family communication.
              </p>
              <ul className="scenario-features-new">
                <li>Airway assessment techniques</li>
                <li>Oxygen delivery systems</li>
                <li>Pediatric medication dosing</li>
                <li>Family communication skills</li>
              </ul>
              <div className="card-footer-new">
                <div className="card-meta">
                  <span className="duration">⏱️ 10-15 min</span>
                  <span className="difficulty">🎯 Intermediate</span>
                </div>
                <button className="btn btn-primary card-action-btn">
                  Start Simulation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home