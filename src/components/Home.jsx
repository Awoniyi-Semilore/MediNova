// Home.js (Example of necessary changes)

import React, { useState } from 'react';
// IMPORT THE CSS FILE
import './Css files/Home.css'; 
// (assuming you save the CSS as Home.css in the same directory)

// --- Inline ConfirmPopup Component (Modified with new classes) ---
const ConfirmPopup = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="confirm-popup-overlay"> {/* Replaced Tailwind */}
      <div className="confirm-popup-content"> {/* Replaced Tailwind */}
        <h3 className="popup-title">{title}</h3> {/* Replaced Tailwind */}
        <p className="popup-message">{message}</p> {/* Replaced Tailwind */}
        <div className="popup-actions"> {/* Replaced Tailwind */}
          <button 
            onClick={onCancel}
            className="popup-cancel-btn" 
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="popup-confirm-btn" 
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
// -------------------------------------


const Home = ({ onNavigate, user, auth, signOut }) => { 
  // ... (rest of the logic remains the same)

  return (
    <div className="home-container"> {/* Replaced min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center */}
      
      {/* ConfirmPopup usage remains the same */}
      <ConfirmPopup 
        // ... props
      />
      
      {/* Header (Styled with CSS classes) */}
      <header className="header-main"> {/* Replaced w-full max-w-5xl py-4 sm:py-6 bg-white shadow-md rounded-b-xl border-b-4 border-indigo-500 mb-8 */}
        <div className="header-content"> {/* Replaced flex justify-between items-center px-4 sm:px-6 */}
          <div 
            className="header-logo-group" 
            onClick={() => onNavigate('home')}
          >
            <div className="header-logo-icon">⚕️</div>
            <h1 className="header-logo-text">MediNova</h1>
          </div>
          
          <div className="header-user-actions">
            <div className="user-welcome-text">
              Welcome, <span className="user-name">{user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'Medic'}!</span>
            </div>
            <button 
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content"> {/* Replaced w-full max-w-5xl p-6 sm:p-8 bg-white rounded-xl shadow-2xl space-y-8 */}
        <section className="section-intro">
          <h2 className="section-title">Emergency Medicine Training Center</h2>
          <p className="section-subtitle">Practice real medical scenarios in a safe, interactive environment</p>
        </section>

        {/* Scenarios Header */}
        <div className="scenario-header">
          <h3>Choose Your Training Scenario</h3>
          <p>Select an emergency scenario to test your medical response skills</p>
        </div>

        {/* Emergency Cards Grid */}
        <div className="cards-grid">
          {/* Cardiac Emergency Card */}
          <div 
            className="scenario-card cardiac-card" {/* Combined generic and specific classes */}
            onClick={() => navigateToSimulation('cardiac-arrest')}
          >
            <div className="card-header-group">
                <span className="card-tag">URGENT CARE</span>
                <span className="card-icon">🫀</span>
            </div>
            <h4 className="card-title">Code Blue: Cardiac Arrest</h4>
            <p className="card-description">
              Manage VF/Pulseless VT following ACLS protocols. **Starts with Video Briefing.**
            </p>
            <div className="card-details">
              <p>• Rhythm Recognition, CPR Monitoring, Defibrillation</p>
              <p>⏱️ 15-20 min | 🎯 Advanced</p>
            </div>
            <button className="card-button">
              Start Simulation
            </button>
          </div>

          {/* Respiratory Emergency Card */}
          <div 
            className="scenario-card respiratory-card"
            onClick={() => navigateToSimulation('respiratory-simulation')}
          >
            <div className="card-header-group">
                <span className="card-tag">CRITICAL CARE</span>
                <span className="card-icon">💨</span>
            </div>
            <h4 className="card-title">Pediatric Respiratory Crisis</h4>
            <p className="card-description">
              Manage severe respiratory distress in a 4-year-old patient.
            </p>
            <div className="card-details">
              <p>• Airway Assessment, Oxygen Therapy, Family Communication</p>
              <p>⏱️ 10-15 min | 🎯 Intermediate</p>
            </div>
            <button className="card-button">
              Start Simulation
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home;