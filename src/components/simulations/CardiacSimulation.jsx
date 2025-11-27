import React, { useState, useEffect, useRef } from 'react'
import '../../App.css'

const CardiacSimulation = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState('video')
  const [isPlaying, setIsPlaying] = useState(true)
  const [timer, setTimer] = useState(0)
  const [patientLifeline, setPatientLifeline] = useState(100)
  const [isPaused, setIsPaused] = useState(false)
  const [showChoices, setShowChoices] = useState(false)
  const audioRef = useRef(null)

  // Timer effect
  useEffect(() => {
    if (currentStep !== 'video' && !isPaused) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [currentStep, isPaused])

  // Audio effect for urgent beeping
  useEffect(() => {
    if (currentStep !== 'video' && !isPaused) {
      // Simulate urgent beeping sound (you'll replace with actual audio file)
      const beepInterval = setInterval(() => {
        // This would play your beep audio file
        console.log('BEEP! Urgent sound playing')
        // audioRef.current.play() - when you have the audio file
      }, 2000)
      return () => clearInterval(beepInterval)
    }
  }, [currentStep, isPaused])

  const handleVideoEnd = () => {
    setCurrentStep('simulation')
    setShowChoices(true)
  }

  const handleSkipVideo = () => {
    setCurrentStep('simulation')
    setShowChoices(true)
  }

  const handleChoice = (choice, isCorrect) => {
    if (!isCorrect) {
      // Decrease lifeline for wrong choices
      setPatientLifeline(prev => Math.max(0, prev - 15))
    }

    // Handle next step based on choice
    // This would be your scenario logic
    console.log('Choice made:', choice)
    
    // For demo - after choice, show next set of choices
    // In real implementation, you'd have a scenario tree
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="simulation-page">
      {/* Hidden audio element for beeping */}
      <audio ref={audioRef} loop>
        <source src="/assets/beep-sound.mp3" type="audio/mpeg" />
      </audio>

      <header className="simulation-header">
        <div className="simulation-header-content">
          <button 
            className="back-sim-btn"
            onClick={() => onNavigate('home')}
          >
            ← Back to Dashboard
          </button>
          <div className="simulation-header-info">
            <h1>Code Blue: Room 3</h1>
            <p>Cardiac Arrest Simulation</p>
          </div>
          <button 
            className={`pause-btn ${isPaused ? 'paused' : ''}`}
            onClick={handlePause}
          >
            {isPaused ? '▶️' : '⏸️'}
          </button>
        </div>
      </header>

      <div className="simulation-content">
        {/* Video Intro Section */}
        {currentStep === 'video' && (
          <div className="video-section">
            <div className="video-container">
              {/* Placeholder for your video - replace with actual video element */}
              <div className="video-placeholder">
                <div className="video-placeholder-content">
                  <span className="video-icon">🎬</span>
                  <h3>Emergency Scenario Video</h3>
                  <p>Code Blue: Cardiac Arrest in Progress</p>
                  <div className="video-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '60%'}}></div>
                    </div>
                    <span>1:24 / 2:30</span>
                  </div>
                </div>
              </div>
              
              <div className="video-controls">
                <button className="btn btn-primary" onClick={handleSkipVideo}>
                  Skip Intro
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Simulation Section */}
        {currentStep === 'simulation' && (
          <>
            {/* Urgent Alert Banner */}
            <div className="emergency-alert">
              <div className="alert-content">
                <span className="alert-icon">🚨</span>
                <div>
                  <h4>CODE BLUE IN PROGRESS</h4>
                  <p>Patient in cardiac arrest - Immediate intervention required</p>
                </div>
              </div>
            </div>

            {/* Timer and Lifeline Display */}
            <div className="simulation-status">
              <div className="status-item">
                <span className="status-label">⏰ Time:</span>
                <span className="status-value">{formatTime(timer)}</span>
              </div>
              <div className="status-item">
                <span className="status-label">❤️ Lifeline:</span>
                <div className="lifeline-bar">
                  <div 
                    className="lifeline-fill"
                    style={{width: `${patientLifeline}%`}}
                  ></div>
                  <span className="lifeline-text">{patientLifeline}%</span>
                </div>
              </div>
              <div className="status-item">
                <span className="status-label">📊 Status:</span>
                <span className={`status-value ${patientLifeline > 50 ? 'stable' : patientLifeline > 20 ? 'warning' : 'critical'}`}>
                  {patientLifeline > 50 ? 'Stable' : patientLifeline > 20 ? 'Critical' : 'Failing'}
                </span>
              </div>
            </div>

            {/* Scenario Content */}
            <div className="scenario-intro">
              <h2>Initial Assessment</h2>
              <p>
                You arrive at Room 3. The patient, Mr. Evans (56M), is unresponsive. 
                The monitor shows Ventricular Fibrillation. The primary nurse is performing CPR.
              </p>
            </div>

            <div className="simulation-area">
              <div className="patient-status">
                <h3>Patient Vital Signs</h3>
                <div className="status-grid">
                  <div className="status-item">
                    <span>Cardiac Rhythm:</span>
                    <span className="critical">Ventricular Fibrillation</span>
                  </div>
                  <div className="status-item">
                    <span>Pulse:</span>
                    <span className="critical">Absent</span>
                  </div>
                  <div className="status-item">
                    <span>Blood Pressure:</span>
                    <span className="critical">0/0 mmHg</span>
                  </div>
                  <div className="status-item">
                    <span>O2 Saturation:</span>
                    <span className="critical">60%</span>
                  </div>
                  <div className="status-item">
                    <span>Respiratory Rate:</span>
                    <span className="critical">0 /min</span>
                  </div>
                </div>
              </div>

              {/* Choices Section */}
              {showChoices && (
                <div className="action-choices">
                  <h3>What is your immediate action?</h3>
                  <div className="choices">
                    <button 
                      className="choice-btn correct"
                      onClick={() => handleChoice('check_responsiveness', true)}
                    >
                      ✅ Check responsiveness and pulse
                    </button>
                    <button 
                      className="choice-btn"
                      onClick={() => handleChoice('call_code', false)}
                    >
                      📞 Call a code blue (premature)
                    </button>
                    <button 
                      className="choice-btn incorrect"
                      onClick={() => handleChoice('start_cpr', false)}
                    >
                      ❌ Start CPR immediately without assessment
                    </button>
                    <button 
                      className="choice-btn incorrect"
                      onClick={() => handleChoice('get_defib', false)}
                    >
                      ❌ Get the defibrillator first
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Simulation Progress */}
            <div className="simulation-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '25%'}}></div>
              </div>
              <span>Scenario Progress: 25%</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CardiacSimulation