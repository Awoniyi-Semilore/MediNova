import React, { useState, useEffect, useRef } from 'react'
import '../../App.css'

const CardiacSimulation = ({ onNavigate, user }) => {
  const [currentStep, setCurrentStep] = useState('video')
  const [showStoryPopup, setShowStoryPopup] = useState(false)
  const [currentScene, setCurrentScene] = useState(null)
  const [timer, setTimer] = useState(0)
  const [patientLifeline, setPatientLifeline] = useState(100)
  const [isPaused, setIsPaused] = useState(false)
  const [gameHistory, setGameHistory] = useState([])
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioRef = useRef(null)

  // Get user's first name or use "Nurse" as default
  const nurseName = user?.displayName?.split(' ')[0] || 'Nurse'

  // Complete storyline with timed events
  const storyline = [
    {
      id: 'arrival',
      title: "EMERGENCY ARRIVAL",
      description: `You're at the nurses' station when a man collapses in the waiting room. His wife screams for help!`,
      background: "🏥",
      audio: "screaming", // You'll add audio file
      delay: 0,
      choices: [
        { 
          text: "Run to assess the patient immediately", 
          next: 'assessment', 
          correct: true,
          feedback: "Good! Rapid response is critical in cardiac arrest."
        },
        { 
          text: "Call security first", 
          next: 'wrong_security', 
          correct: false,
          feedback: "Delay in assessment reduces survival chances. Always assess first."
        },
        { 
          text: "Get the crash cart ready first", 
          next: 'wrong_cart', 
          correct: false,
          feedback: "Equipment is important, but patient assessment comes first."
        }
      ]
    },
    {
      id: 'assessment',
      title: "INITIAL ASSESSMENT",
      description: `You reach Mr. Johnson (58M). He's unresponsive, pale, and not breathing. His wife is crying beside him.`,
      background: "😵",
      audio: "crying",
      delay: 2000,
      choices: [
        { 
          text: "Check carotid pulse and breathing", 
          next: 'pulse_check', 
          correct: true,
          feedback: "Correct! Always check ABCs (Airway, Breathing, Circulation) first."
        },
        { 
          text: "Start CPR immediately", 
          next: 'wrong_cpr_early', 
          correct: false,
          feedback: "Need to confirm cardiac arrest before starting CPR to avoid injury."
        },
        { 
          text: "Ask the wife what happened", 
          next: 'wrong_history', 
          correct: false,
          feedback: "Patient assessment takes priority over history in emergency situations."
        }
      ]
    },
    {
      id: 'pulse_check',
      title: "NO PULSE DETECTED",
      description: `No carotid pulse! Patient is in cardiac arrest. You feel no breathing. Time to act fast!`,
      background: "💔",
      audio: "monitor_beep",
      delay: 1500,
      choices: [
        { 
          text: "Shout for help and start high-quality CPR", 
          next: 'start_cpr', 
          correct: true,
          feedback: "Excellent! Early CPR doubles survival chances."
        },
        { 
          text: "Run to get the defibrillator", 
          next: 'wrong_defib_first', 
          correct: false,
          feedback: "Never leave a patient in cardiac arrest. Call for help instead."
        },
        { 
          text: "Check pupil response", 
          next: 'wrong_pupils', 
          correct: false,
          feedback: "Neurological assessment can wait. Circulation is priority."
        }
      ]
    },
    {
      id: 'start_cpr',
      title: "CPR IN PROGRESS",
      description: `You're performing chest compressions. Another nurse arrives with the crash cart. Monitor shows V-Fib!`,
      background: "🫀",
      audio: "compression_sound",
      delay: 2000,
      choices: [
        { 
          text: "Continue CPR while team applies defibrillator pads", 
          next: 'apply_pads', 
          correct: true,
          feedback: "Perfect! Minimizing interruptions in CPR is crucial."
        },
        { 
          text: "Stop CPR to help apply pads", 
          next: 'wrong_stop_cpr', 
          correct: false,
          feedback: "CPR should continue during pad application to maintain perfusion."
        },
        { 
          text: "Give rescue breaths immediately", 
          next: 'wrong_breaths', 
          correct: false,
          feedback: "In witnessed cardiac arrest, compressions are more important than breaths initially."
        }
      ]
    },
    {
      id: 'apply_pads',
      title: "DEFIBRILLATOR READY",
      description: `Pads applied! Monitor shows persistent V-Fib. "All clear!" your colleague shouts.`,
      background: "⚡",
      audio: "defib_charge",
      delay: 1500,
      choices: [
        { 
          text: "Deliver 200J biphasic shock and immediately resume CPR", 
          next: 'deliver_shock', 
          correct: true,
          feedback: "Correct! Immediate CPR after shock improves outcomes."
        },
        { 
          text: "Wait to see if rhythm changes before resuming CPR", 
          next: 'wrong_wait', 
          correct: false,
          feedback: "Never delay CPR. Resume immediately after shock regardless of rhythm."
        },
        { 
          text: "Check pulse before resuming CPR", 
          next: 'wrong_pulse_check', 
          correct: false,
          feedback: "Pulse checks interrupt CPR. Resume compressions immediately."
        }
      ]
    },
    {
      id: 'deliver_shock',
      title: "SHOCK DELIVERED",
      description: `Shock delivered successfully! You immediately resume CPR. After 2 minutes, rhythm check shows organized activity!`,
      background: "📈",
      audio: "success_beep",
      delay: 2500,
      choices: [
        { 
          text: "Check for pulse and breathing - ROSC achieved!", 
          next: 'success', 
          correct: true,
          feedback: "OUTSTANDING! You successfully achieved Return of Spontaneous Circulation!"
        }
      ]
    },
    // Wrong path scenarios
    {
      id: 'wrong_security',
      title: "CRITICAL DELAY",
      description: `Calling security wasted 45 seconds. Mr. Johnson's brain has been without oxygen. Survival chances decreased.`,
      background: "⏰",
      audio: "error_beep",
      delay: 0,
      choices: [
        { 
          text: "Continue with patient assessment (with penalty)", 
          next: 'assessment', 
          correct: false,
          feedback: "Time is muscle! Every second counts in cardiac arrest."
        }
      ]
    },
    {
      id: 'wrong_cpr_early',
      title: "INAPPROPRIATE CPR",
      description: `Starting CPR without confirming cardiac arrest could cause injury. The patient groans - he was just fainting!`,
      background: "😨",
      audio: "groan",
      delay: 0,
      choices: [
        { 
          text: "Stop CPR and properly assess the patient", 
          next: 'assessment', 
          correct: false,
          feedback: "Always confirm unresponsiveness and absence of breathing/pulse before CPR."
        }
      ]
    }
  ]

  // Timer effect
  useEffect(() => {
    if (currentStep === 'simulation' && !isPaused) {
      const interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [currentStep, isPaused])

  // Play audio for current scene
  useEffect(() => {
    if (currentScene && currentScene.audio) {
      setAudioPlaying(true)
      // Simulate audio playing - replace with actual audio files
      console.log(`Playing audio: ${currentScene.audio}`)
      
      const audioTimer = setTimeout(() => {
        setAudioPlaying(false)
      }, 3000)
      
      return () => clearTimeout(audioTimer)
    }
  }, [currentScene])

  const handleVideoEnd = () => {
    startStoryline()
  }

  const handleSkipVideo = () => {
    startStoryline()
  }

  const startStoryline = () => {
    setCurrentStep('simulation')
    showNextScene('arrival')
  }

  const showNextScene = (sceneId) => {
    const scene = storyline.find(s => s.id === sceneId)
    if (scene) {
      setTimeout(() => {
        setCurrentScene(scene)
        setShowStoryPopup(true)
      }, scene.delay)
    }
  }

  const handleChoice = (choice) => {
    // Add to game history
    setGameHistory(prev => [...prev, {
      action: choice.text,
      correct: choice.correct,
      feedback: choice.feedback,
      timestamp: timer
    }])

    // Handle lifeline changes
    if (!choice.correct) {
      setPatientLifeline(prev => Math.max(0, prev - 25)) // Big penalty for wrong choices
    }

    // Show feedback
    setShowStoryPopup(false)
    
    setTimeout(() => {
      if (patientLifeline <= 25 && !choice.correct) {
        // Game over scenario
        setCurrentScene({
          id: 'game_over',
          title: "GAME OVER - PATIENT EXPIRED",
          description: `Despite efforts, Mr. Johnson didn't survive. Critical errors and delays reduced chances of recovery.`,
          background: "💀",
          choices: [{ 
            text: "Restart Simulation", 
            next: 'restart',
            feedback: "Learn from mistakes and try again!"
          }]
        })
        setShowStoryPopup(true)
      } else if (choice.next === 'success') {
        // Success scenario
        setCurrentScene({
          id: 'success',
          title: "MISSION ACCOMPLISHED! 🎉",
          description: `Congratulations ${nurseName}! You successfully managed the cardiac arrest. Mr. Johnson has Return of Spontaneous Circulation and is being transferred to ICU. The family thanks you!`,
          background: "✅",
          choices: [{ 
            text: "Play Again", 
            next: 'restart',
            feedback: "Excellent work! Ready for another challenge?"
          }]
        })
        setShowStoryPopup(true)
      } else {
        showNextScene(choice.next)
      }
    }, 2000)
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getUrgencyColor = (sceneId) => {
    if (sceneId.includes('wrong') || sceneId === 'game_over') return '#dc2626'
    if (sceneId === 'success') return '#059669'
    return '#3b82f6'
  }

  const restartSimulation = () => {
    setPatientLifeline(100)
    setTimer(0)
    setGameHistory([])
    startStoryline()
  }

  return (
    <div className="simulation-page">
      {/* Hidden audio element */}
      <audio ref={audioRef} loop>
        <source src="/assets/emergency-audio.mp3" type="audio/mpeg" />
      </audio>

      <header className="simulation-header">
        <div className="simulation-header-content">
          <button 
            className="back-sim-btn"
            onClick={() => onNavigate('home')}
          >
            ← Exit to Dashboard
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
                {audioPlaying && <span className="audio-indicator">🔊</span>}
              </div>
            </div>

            {/* Current Scene Display */}
            <div className="current-scene-display">
              <h3>ACTIVE EMERGENCY</h3>
              <p>Make quick clinical decisions to save Mr. Johnson!</p>
              <div className="scene-progress">
                <div className="progress-dots">
                  {['arrival', 'assessment', 'pulse_check', 'start_cpr', 'apply_pads', 'deliver_shock'].map((sceneId, index) => (
                    <div 
                      key={sceneId}
                      className={`progress-dot ${currentScene?.id === sceneId ? 'active' : ''} ${gameHistory.some(h => h.next === sceneId) ? 'completed' : ''}`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Story Popup */}
            {showStoryPopup && currentScene && (
              <div className="story-popup-overlay">
                <div 
                  className="story-popup"
                  style={{
                    borderLeft: `6px solid ${getUrgencyColor(currentScene.id)}`
                  }}
                >
                  {/* Background Scene */}
                  <div className="popup-scene-background">
                    {currentScene.background}
                  </div>
                  
                  <div className="popup-header">
                    <div className="scene-title">
                      <h2>{currentScene.title}</h2>
                      {audioPlaying && <span className="audio-badge">🔊 AUDIO PLAYING</span>}
                    </div>
                    <p className="scene-description">{currentScene.description}</p>
                    
                    {currentScene.id.includes('wrong') && (
                      <div className="error-alert">
                        ⚠️ CRITICAL ERROR - LIFELINE DECREASED
                      </div>
                    )}
                  </div>

                  <div className="popup-choices">
                    <h4>NURSE {nurseName.toUpperCase()}, WHAT'S YOUR ACTION?</h4>
                    <div className="emergency-choices">
                      {currentScene.choices.map((choice, index) => (
                        <button
                          key={index}
                          className="emergency-choice-btn"
                          onClick={() => handleChoice(choice)}
                          disabled={currentScene.id === 'game_over' || currentScene.id === 'success'}
                        >
                          {choice.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="popup-footer">
                    <div className="decision-context">
                      <strong>Real-world context:</strong> Every 1-minute delay in CPR reduces survival by 10%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Feedback Display */}
            {gameHistory.length > 0 && !showStoryPopup && (
              <div className="feedback-popup">
                <div className={`feedback-message ${gameHistory[gameHistory.length - 1].correct ? 'correct' : 'incorrect'}`}>
                  <h4>{gameHistory[gameHistory.length - 1].correct ? '✅ CORRECT DECISION' : '❌ NEEDS IMPROVEMENT'}</h4>
                  <p>{gameHistory[gameHistory.length - 1].feedback}</p>
                  {!gameHistory[gameHistory.length - 1].correct && (
                    <div className="lifeline-loss">
                      ❤️ Lifeline decreased by 25%
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Game History */}
            <div className="game-history">
              <h4>CLINICAL DECISION LOG</h4>
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