import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'
import ConfirmPopup from './Confirmpopup.jsx'
import '../components/Css files/Home.css'

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

      {/* New Compact Header */}
      <header className="home-header-compact">
        <div className="header-main">
          <div className="logo-section" onClick={handleLogoClick}>
            <div className="logo-icon-compact">⚕️</div>
            <div className="logo-text-compact">
              <h1 className="medinova-logo">MediNova</h1>
              <span className="logo-full-meaning">Medical Innovations</span>
            </div>
          </div>

          <div className="user-section">
            <div className="user-welcome">
              <span className="welcome-name">Welcome, {user?.displayName?.split(' ')[0] || 'Medic'}!</span>
            </div>
            <button
              className="logout-btn-compact"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-content-compact">
          <h2>Emergency Medicine Training Center</h2>
          <p>Practice real medical scenarios in a safe, interactive environment</p>
        </div>
      </section>

      {/* Emergency Scenarios */}
      <section className="scenarios-section-compact">
        <div className="scenarios-header-compact">
          <h2>Choose Your Training Scenario</h2>
          <p>Select an emergency scenario to test your medical response skills</p>
        </div>

        <div className="emergency-cards-compact">
          {/* Cardiac Emergency */}
          <div
            className="scenario-card-compact cardiac-scenario"
            onClick={() => onNavigate('cardiac-simulation')}
          >
            <div className="card-badge-compact urgent-badge">URGENT CARE</div>
            <div className="card-icon-compact">🫀</div>
            <div className="card-content-compact">
              <h3>Code Blue: Cardiac Arrest</h3>
              <p className="card-desc-compact">
                Manage VF/Pulseless VT following ACLS protocols
              </p>
              <div className="card-features-compact">
                <span>Rhythm Recognition</span>
                <span>CPR Monitoring</span>
                <span>Defibrillation</span>
              </div>
              <div className="card-meta-compact">
                <span className="meta-item">⏱️ 15-20 min</span>
                <span className="meta-item">🎯 Advanced</span>
              </div>
            </div>
            <button className="start-btn-compact">
              Start Simulation
            </button>
          </div>

          {/* Respiratory Emergency - UPDATED */}
          <div
            className="scenario-card-compact respiratory-scenario"
            onClick={() => onNavigate('respiratory-simulation1')}  {/* Changed to simulation1 */}
          >
            <div className="card-badge-compact critical-badge">CRITICAL CARE</div>
            <div className="card-icon-compact">💨</div>
            <div className="card-content-compact">
              <h3>Pediatric Respiratory Crisis</h3>
              <p className="card-desc-compact">
                Manage severe asthma exacerbation in a 14-year-old
              </p>
              <div className="card-features-compact">
                <span>Diagnosis & Assessment</span>
                <span>Emergency Interventions</span>
                <span>Advanced Management</span>
              </div>
              <div className="card-meta-compact">
                <span className="meta-item">⏱️ 15-20 min</span>
                <span className="meta-item">🎯 Advanced</span>
              </div>
            </div>
            <button className="start-btn-compact">
              Start Simulation
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home