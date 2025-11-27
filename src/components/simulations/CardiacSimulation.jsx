import React, { useState, useEffect, useRef } from 'react'
import '../../App.css'

const CardiacSimulation = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState('video')
  const [showActionPopup, setShowActionPopup] = useState(false)
  const [currentScenario, setCurrentScenario] = useState(null)
  const [timer, setTimer] = useState(0)
  const [patientLifeline, setPatientLifeline] = useState(100)
  const [isPaused, setIsPaused] = useState(false)
  const [gameHistory, setGameHistory] = useState([])

  // Emergency scenarios data
  const scenarios = {
    start: {
      title: "CODE BLUE - ROOM 3",
      description: "You rush into Room 3. Mr. Evans (56M) is unconscious on the floor. Monitor shows V-Fib!",
      background: "🚑", // You'll replace with stretcher image
      urgency: "HIGH",
      choices: [
        { text: "Check patient responsiveness and pulse", next: 'check_pulse', correct: true },
        { text: "Immediately start chest compressions", next: 'wrong_compressions', correct: false },
        { text: "Grab the defibrillator pads", next: 'wrong_defib', correct: false },
        { text: "Call for help and check airway", next: 'call_help', correct: false }
      ]
    },
    check_pulse: {
      title: "NO PULSE DETECTED",
      description: "You confirm no carotid pulse. Patient is in cardiac arrest!",
      background: "💔",
      urgency: "CRITICAL", 
      choices: [
        { text: "Begin high-quality CPR immediately", next: 'start_cpr', correct: true },
        { text: "Apply defibrillator pads now", next: 'apply_pads', correct: false },
        { text: "Check breathing first", next: 'check_breathing', correct: false },
        { text: "Administer emergency medication", next: 'wrong_meds', correct: false }
      ]
    },
    start_cpr: {
      title: "CPR IN PROGRESS",
      description: "You're performing chest compressions at 100-120/min. Another nurse arrives with the crash cart.",
      background: "🫀",
      urgency: "HIGH",
      choices: [
        { text: "Continue CPR while applying defibrillator pads", next: 'apply_pads_correct', correct: true },
        { text: "Stop CPR to check rhythm", next: 'wrong_stop_cpr', correct: false },
        { text: "Give rescue breaths immediately", next: 'rescue_breaths', correct: false },
        { text: "Prepare epinephrine injection", next: 'prepare_epi', correct: false }
      ]
    },
    apply_pads_correct: {
      title: "DEFIBRILLATOR READY",
      description: "Pads applied! Monitor shows persistent V-Fib. 'All clear!' you shout.",
      background: "⚡",
      urgency: "URGENT",
      choices: [
        { text: "Deliver 200J shock and resume CPR", next: 'deliver_shock', correct: true },
        { text: "Wait for doctor's order to shock", next: 'wait_doctor', correct: false },
        { text: "Give medication before shocking", next: 'meds_first', correct: false },
        { text: "Check pulse again before shocking", next: 'recheck_pulse', correct: false }
      ]
    },
    // Add more scenarios as needed...
  }

  // Timer effect
  useEffect(() => {
    if (currentStep === 'simulation' && !isPaused) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1)
        // Every 10 seconds, lifeline decreases slightly to add urgency
        if (prev % 10 === 0 && prev > 0) {
          setPatientLifeline(current => Math.max(0, current - 2))
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [currentStep, isPaused])

  const handleVideoEnd = () => {
    startSimulation()
  }

  const handleSkipVideo = () => {
    startSimulation()
  }

  const startSimulation = () => {
    setCurrentStep('simulation')
    setCurrentScenario(scenarios.start)
    setShowActionPopup(true)
  }

  const handleChoice = (choice) => {
    // Add to game history
    setGameHistory(prev => [...prev, {
      action: choice.text,
      correct: choice.correct,
      timestamp: timer
    }])

    // Handle lifeline changes
    if (!choice.correct) {
      setPatientLifeline(prev => Math.max(0, prev - 20)) // Big penalty for wrong choices
    }

    // Show feedback briefly
    setTimeout(() => {
      if (scenarios[choice.next]) {
        setCurrentScenario(scenarios[choice.next])
      } else {
        // End of scenario or game over
        if (patientLifeline <= 0) {
          setCurrentScenario({
            title: "GAME OVER",
            description: "Patient didn't survive. Critical errors were made.",
            background: "💀",
            urgency: "FAILED",
            choices: [{ text: "Restart Simulation", next: 'restart' }]
          })
        } else {
          setCurrentScenario({
            title: "SUCCESS!",
            description: "ROSC achieved! Patient stabilized and transferred to ICU.",
            background: "✅",
            urgency: "STABLE",
            choices: [{ text: "Play Again", next: 'restart' }]
          })
        }
      }
    }, 1500)
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'CRITICAL': return '#dc2626'
      case 'HIGH': return '#ea580c'
      case 'URGENT': return '#d97706'
      case 'STABLE': return '#059669'
      case 'FAILED': return '#6b7280'
      default: return '#3b82f6'
    }
  }

  return (
    <div className="simulation-page">
      <header className="simulation-header">
        <div className="simulation-header-content">
          <button 
            className="back-sim-btn"
            onClick={() => onNavigate('home')}
          >
            ← Exit Simulation
          </button>
          <div className="simulation-header-info">
            <h1>Code Blue: Cardiac Arrest</h1>
            <p>Emergency Response Training</p>
          </div>
          <div className="simulation-controls">
            <div className="timer-display">
              ⏱️ {formatTime(timer)}
            </div>
            <button 
              className={`pause-btn ${isPaused ? 'paused' : ''}`}
              onClick={handlePause}
            >
              {isPaused ? '▶️ Resume' : '⏸️ Pause'}
            </button>
          </div>
        </div>
      </header>

      <div className="simulation-content">
        {/* Video Intro Section */}
        {currentStep === 'video' && (
          <div className="video-section">
            <div className="video-container">
              <div className="video-placeholder">
                <div className="video-placeholder-content">
                  <span className="video-icon">🎬</span>
                  <h3>EMERGENCY SCENARIO</h3>
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
                <button className="btn btn-skip" onClick={handleSkipVideo}>
                  ⏭️ Skip Intro
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Simulation Area */}
        {currentStep === 'simulation' && (
          <div className="simulation-game-area">
            {/* Urgent Status Bar */}
            <div className="urgent-status-bar">
              <div className="lifeline-display">
                <span className="lifeline-label">PATIENT LIFELINE:</span>
                <div className="lifeline-container">
                  <div 
                    className={`lifeline-bar ${patientLifeline > 60 ? 'good' : patientLifeline > 30 ? 'warning' : 'critical'}`}
                  >
                    <div 
                      className="lifeline-fill"
                      style={{width: `${patientLifeline}%`}}
                    ></div>
                  </div>
                  <span className="lifeline-percent">{patientLifeline}%</span>
                </div>
              </div>
              
              <div className="time-pressure">
                <span>⏰ TIME ELAPSED: {formatTime(timer)}</span>
              </div>
            </div>

            {/* Current Game State Display */}
            <div className="game-state">
              <div className="scenario-preview">
                <h3>CURRENT SITUATION</h3>
                <p>Make quick decisions to save the patient!</p>
              </div>
            </div>

            {/* Action Popup */}
            {showActionPopup && currentScenario && (
              <div className="action-popup-overlay">
                <div 
                  className="action-popup"
                  style={{
                    borderLeft: `6px solid ${getUrgencyColor(currentScenario.urgency)}`,
                    background: 'linear-gradient(135deg, #1e293b, #0f172a)'
                  }}
                >
                  {/* Background Image Placeholder - Replace with stretcher image */}
                  <div className="popup-background">🚑</div>
                  
                  <div className="popup-header">
                    <div 
                      className="urgency-badge"
                      style={{backgroundColor: getUrgencyColor(currentScenario.urgency)}}
                    >
                      {currentScenario.urgency}
                    </div>
                    <h2>{currentScenario.title}</h2>
                    <p>{currentScenario.description}</p>
                  </div>

                  <div className="popup-choices">
                    <h4>WHAT DO YOU DO?</h4>
                    <div className="emergency-choices">
                      {currentScenario.choices.map((choice, index) => (
                        <button
                          key={index}
                          className="emergency-choice-btn"
                          onClick={() => handleChoice(choice)}
                        >
                          {choice.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="popup-footer">
                    <span className="time-warning">⏱️ Decide quickly! Time is critical</span>
                  </div>
                </div>
              </div>
            )}

            {/* Game History */}
            <div className="game-history">
              <h4>ACTION LOG</h4>
              <div className="history-list">
                {gameHistory.slice(-5).map((entry, index) => (
                  <div key={index} className={`history-item ${entry.correct ? 'correct' : 'incorrect'}`}>
                    <span className="history-time">{formatTime(entry.timestamp)}</span>
                    <span className="history-action">{entry.action}</span>
                    <span className="history-result">
                      {entry.correct ? '✅' : '❌'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardiacSimulation