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
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [currentFeedback, setCurrentFeedback] = useState('')

  const nurseName = user?.displayName?.split(' ')[0] || 'Nurse'

  // Comprehensive Simulation 1 Storyline - Initial Emergency Response
  const storyline = [
    {
      id: 'triage_arrival',
      title: "EMERGENCY DEPARTMENT - TRIAGE",
      description: `You're at the triage desk when Mr. Johnson (58M) is rushed in by paramedics. He's pale, diaphoretic (sweaty), and clutching his chest. His wife is following, looking terrified.`,
      background: "🏥",
      urgency: "URGENT",
      choices: [
        { 
          text: "Immediately assess airway, breathing, circulation (ABC)", 
          next: 'abc_assessment', 
          correct: true,
          feedback: "Excellent! ABC assessment is the first priority in any emergency."
        },
        { 
          text: "Ask the wife for complete medical history first", 
          next: 'wrong_history_first', 
          correct: false,
          feedback: "While history is important, patient assessment takes priority in emergencies."
        },
        { 
          text: "Direct them to a waiting room bed", 
          next: 'wrong_waiting', 
          correct: false,
          feedback: "Critical patients need immediate assessment, not waiting."
        },
        { 
          text: "Start filling out admission paperwork", 
          next: 'wrong_paperwork', 
          correct: false,
          feedback: "Clinical assessment always comes before administrative tasks."
        }
      ]
    },
    {
      id: 'abc_assessment',
      title: "INITIAL ASSESSMENT - ABC",
      description: `You quickly assess Mr. Johnson. Airway: patent but he's struggling to speak. Breathing: rapid and shallow at 28/min. Circulation: weak radial pulse, skin cool and clammy.`,
      background: "🔍",
      urgency: "HIGH",
      choices: [
        { 
          text: "Apply oxygen via non-rebreather mask at 15L/min", 
          next: 'oxygen_application', 
          correct: true,
          feedback: "Correct! Oxygen is crucial for patients with respiratory distress and potential cardiac issues."
        },
        { 
          text: "Take a full set of vital signs immediately", 
          next: 'vitals_first', 
          correct: false,
          feedback: "While vitals are important, addressing hypoxia takes immediate priority."
        },
        { 
          text: "Ask him to describe his pain in detail", 
          next: 'wrong_pain_assessment', 
          correct: false,
          feedback: "Detailed pain assessment can wait until basic life support is established."
        },
        { 
          text: "Start an IV line immediately", 
          next: 'wrong_iv_first', 
          correct: false,
          feedback: "IV access is important but oxygenation comes first in the ABC sequence."
        }
      ]
    },
    {
      id: 'oxygen_application',
      title: "OXYGEN ADMINISTERED",
      description: `You apply high-flow oxygen. Mr. Johnson's color improves slightly but he remains in distress. He points to his chest: "The pain... crushing..."`,
      background: "💨",
      urgency: "HIGH",
      choices: [
        { 
          text: "Attach cardiac monitor and get 12-lead ECG immediately", 
          next: 'ecg_monitoring', 
          correct: true,
          feedback: "Perfect! Cardiac monitoring is essential for chest pain patients to rule out STEMI."
        },
        { 
          text: "Administer nitroglycerin for the chest pain", 
          next: 'wrong_nitro_first', 
          correct: false,
          feedback: "Never give nitroglycerin before checking blood pressure and ruling out right ventricular infarction."
        },
        { 
          text: "Give morphine for pain relief", 
          next: 'wrong_morphine', 
          correct: false,
          feedback: "Morphine should be given cautiously and only after initial assessment in cardiac patients."
        },
        { 
          text: "Take a detailed family history", 
          next: 'wrong_family_history', 
          correct: false,
          feedback: "Clinical assessment and monitoring take priority over detailed history at this stage."
        }
      ]
    },
    {
      id: 'ecg_monitoring',
      title: "CARDIAC MONITORING INITIATED",
      description: `You attach the monitor. Rhythm shows sinus tachycardia at 110 bpm. As you're placing ECG electrodes, Mr. Johnson suddenly becomes unresponsive!`,
      background: "📊",
      urgency: "CRITICAL",
      choices: [
        { 
          text: "Shout for help and check for responsiveness and pulse", 
          next: 'unresponsive_check', 
          correct: true,
          feedback: "Correct! Immediate assessment of unresponsiveness is the first step in cardiac arrest."
        },
        { 
          text: "Immediately start chest compressions", 
          next: 'wrong_compressions_early', 
          correct: false,
          feedback: "Always check for pulse and breathing before starting CPR to avoid unnecessary compressions."
        },
        { 
          text: "Run to get the crash cart", 
          next: 'wrong_crash_cart', 
          correct: false,
          feedback: "Never leave an unresponsive patient. Call for help while assessing the patient."
        },
        { 
          text: "Check pupil response first", 
          next: 'wrong_pupils', 
          correct: false,
          feedback: "In unresponsive patients, circulation assessment (pulse check) takes priority over neurological exam."
        }
      ]
    },
    {
      id: 'unresponsive_check',
      title: "NO PULSE DETECTED - CARDIAC ARREST",
      description: `No carotid pulse! Patient is not breathing. Monitor now shows Ventricular Fibrillation! This is a Code Blue!`,
      background: "💔",
      urgency: "CRITICAL",
      choices: [
        { 
          text: "Begin high-quality CPR and call Code Blue", 
          next: 'cpr_initiation', 
          correct: true,
          feedback: "Excellent! Early CPR and activating emergency response are critical for survival."
        },
        { 
          text: "Apply defibrillator pads immediately", 
          next: 'wrong_pads_first', 
          correct: false,
          feedback: "CPR should begin immediately while someone else gets the defibrillator."
        },
        { 
          text: "Check for a pulse for another 30 seconds", 
          next: 'wrong_prolonged_check', 
          correct: false,
          feedback: "Pulse check should be brief (5-10 seconds). Prolonged checking delays life-saving CPR."
        },
        { 
          text: "Give emergency medications first", 
          next: 'wrong_meds_first', 
          correct: false,
          feedback: "CPR and defibrillation are the first priorities in cardiac arrest, not medications."
        }
      ]
    },
    {
      id: 'cpr_initiation',
      title: "CPR IN PROGRESS - CODE BLUE ACTIVATED",
      description: `You're performing chest compressions at 100-120/min. The Code Blue team arrives with the crash cart. Monitor shows persistent V-Fib.`,
      background: "🫀",
      urgency: "CRITICAL",
      choices: [
        { 
          text: "Continue CPR while team applies defibrillator pads", 
          next: 'team_coordination', 
          correct: true,
          feedback: "Perfect! Minimizing interruptions in CPR is crucial for maintaining coronary perfusion."
        },
        { 
          text: "Stop CPR to help apply the pads faster", 
          next: 'wrong_stop_cpr', 
          correct: false,
          feedback: "CPR should continue during pad application. Every second without compressions reduces survival."
        },
        { 
          text: "Switch to rescue breaths only", 
          next: 'wrong_breaths_only', 
          correct: false,
          feedback: "In cardiac arrest, chest compressions are more important than rescue breaths initially."
        },
        { 
          text: "Check rhythm before continuing", 
          next: 'wrong_rhythm_check', 
          correct: false,
          feedback: "Rhythm checks should be brief and scheduled, not interrupting ongoing CPR unnecessarily."
        }
      ]
    },
    {
      id: 'team_coordination',
      title: "TEAM RESPONSE - DEFIBRILLATOR READY",
      description: `Pads applied! "All clear!" your colleague shouts. Monitor shows persistent V-Fib. The team is ready for your direction.`,
      background: "⚡",
      urgency: "CRITICAL",
      choices: [
        { 
          text: "Deliver 200J biphasic shock and immediately resume CPR", 
          next: 'defibrillation', 
          correct: true,
          feedback: "Correct! Immediate CPR after defibrillation is essential for success."
        },
        { 
          text: "Wait to see if rhythm changes before resuming", 
          next: 'wrong_wait_rhythm', 
          correct: false,
          feedback: "Never wait after defibrillation. Resume CPR immediately regardless of rhythm."
        },
        { 
          text: "Check pulse before deciding next steps", 
          next: 'wrong_pulse_check_after', 
          correct: false,
          feedback: "Pulse checks immediately after shock are unreliable. Resume CPR immediately."
        },
        { 
          text: "Administer epinephrine before resuming CPR", 
          next: 'wrong_epi_first', 
          correct: false,
          feedback: "Medications can wait. CPR and minimizing interruptions are the priority."
        }
      ]
    },
    {
      id: 'defibrillation',
      title: "SHOCK DELIVERED - CONTINUING RESUSCITATION",
      description: `Shock delivered successfully! You immediately resume CPR. After 2 minutes of quality CPR, rhythm check shows organized electrical activity!`,
      background: "📈",
      urgency: "HIGH",
      choices: [
        { 
          text: "Check for pulse and breathing - ROSC achieved!", 
          next: 'success', 
          correct: true,
          feedback: "OUTSTANDING! You successfully managed the cardiac arrest from recognition to ROSC!"
        }
      ]
    },
    // Wrong path scenarios with educational feedback
    {
      id: 'wrong_history_first',
      title: "DELAY IN ASSESSMENT",
      description: `Taking detailed history first wasted critical minutes. Mr. Johnson's condition deteriorates while you're getting history.`,
      background: "⏰",
      urgency: "HIGH",
      choices: [
        { 
          text: "Return to ABC assessment immediately", 
          next: 'abc_assessment', 
          correct: false,
          feedback: "Remember: In emergencies, clinical assessment always comes before detailed history."
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

  const handleVideoEnd = () => {
    startStoryline()
  }

  const handleSkipVideo = () => {
    startStoryline()
  }

  const startStoryline = () => {
    setCurrentStep('simulation')
    showNextScene('triage_arrival')
  }

  const showNextScene = (sceneId) => {
    const scene = storyline.find(s => s.id === sceneId)
    if (scene) {
      setTimeout(() => {
        setCurrentScene(scene)
        setShowStoryPopup(true)
        setShowFeedback(false)
      }, 1000)
    }
  }

  const handleChoice = (choice) => {
    // Add to game history
    setGameHistory(prev => [...prev, {
      scene: currentScene.title,
      action: choice.text,
      correct: choice.correct,
      feedback: choice.feedback,
      timestamp: timer
    }])

    // Update score
    if (choice.correct) {
      setScore(prev => prev + 10)
    }

    // Handle lifeline changes
    if (!choice.correct) {
      setPatientLifeline(prev => Math.max(0, prev - 15))
    }

    // Show feedback
    setShowStoryPopup(false)
    setCurrentFeedback(choice.feedback)
    setShowFeedback(true)
    
    setTimeout(() => {
      setShowFeedback(false)
      
      if (patientLifeline <= 20 && !choice.correct) {
        // Game over scenario
        setCurrentScene({
          id: 'game_over',
          title: "SIMULATION FAILED",
          description: `Critical errors were made in the emergency response. Review the learning objectives and try again.`,
          background: "💀",
          choices: [{ 
            text: "Review Learning Materials", 
            next: 'documentation',
            feedback: "Understanding the fundamentals is key to successful emergency response."
          }]
        })
        setShowStoryPopup(true)
      } else if (choice.next === 'success') {
        // Success scenario - Calculate final score
        const finalScore = score + (patientLifeline * 0.5) + 30
        setCurrentScene({
          id: 'success',
          title: "SIMULATION 1 COMPLETE! 🎉",
          description: `Congratulations ${nurseName}! You successfully managed the cardiac emergency from recognition through resuscitation. Final Score: ${Math.round(finalScore)}/100`,
          background: "✅",
          choices: [{ 
            text: "Review Learning Materials", 
            next: 'documentation',
            feedback: "Excellent work! Let's review what you've learned."
          }]
        })
        setShowStoryPopup(true)
      } else if (choice.next === 'documentation') {
        // Go to documentation page
        onNavigate('cardiac-documentation')
      } else {
        showNextScene(choice.next)
      }
    }, 3000)
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
            <h1>Simulation 1: Cardiac Emergency Response</h1>
            <p>Initial Assessment & Basic Life Support</p>
          </div>
          <div className="simulation-controls">
            <div className="timer-display">
              ⏱️ {formatTime(timer)}
            </div>
            <div className="score-display">
              🏆 {score}
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
                  <h3>SIMULATION 1: CARDIAC EMERGENCY</h3>
                  <p>Learn to recognize and respond to cardiac emergencies</p>
                  <div className="learning-objectives">
                    <h4>Learning Objectives:</h4>
                    <ul>
                      <li>✓ Recognize signs of cardiac compromise</li>
                      <li>✓ Perform initial ABC assessment</li>
                      <li>✓ Initiate basic life support</li>
                      <li>✓ Coordinate emergency team response</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="video-controls">
                <button className="btn btn-skip" onClick={handleSkipVideo}>
                  ⏭️ Begin Simulation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Simulation Area */}
        {currentStep === 'simulation' && (
          <div className="simulation-game-area">
            {/* Status Dashboard */}
            <div className="simulation-dashboard">
              <div className="dashboard-item">
                <span className="dashboard-label">Patient Status:</span>
                <span className={`dashboard-value ${patientLifeline > 60 ? 'stable' : patientLifeline > 30 ? 'critical' : 'failing'}`}>
                  {patientLifeline > 60 ? 'STABLE' : patientLifeline > 30 ? 'CRITICAL' : 'FAILING'}
                </span>
              </div>
              <div className="dashboard-item">
                <span className="dashboard-label">Lifeline:</span>
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
              <div className="dashboard-item">
                <span className="dashboard-label">Time:</span>
                <span className="dashboard-value">{formatTime(timer)}</span>
              </div>
              <div className="dashboard-item">
                <span className="dashboard-label">Score:</span>
                <span className="dashboard-value">{score}</span>
              </div>
            </div>

            {/* Progress Tracker */}
            <div className="progress-tracker">
              <h4>Simulation Progress</h4>
              <div className="progress-steps">
                {['Triage', 'Assessment', 'Monitoring', 'Arrest', 'CPR', 'Defibrillation', 'ROSC'].map((step, index) => (
                  <div 
                    key={step}
                    className={`progress-step ${currentScene && index <= storyline.findIndex(s => s.id === currentScene.id) ? 'completed' : ''} ${currentScene && storyline.findIndex(s => s.id === currentScene.id) === index ? 'active' : ''}`}
                  >
                    <div className="step-number">{index + 1}</div>
                    <div className="step-label">{step}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Story Popup */}
            {showStoryPopup && currentScene && (
              <div className="story-popup-overlay">
                <div 
                  className="story-popup"
                  style={{
                    borderLeft: `6px solid ${getUrgencyColor(currentScene.urgency)}`
                  }}
                >
                  <div className="popup-scene-background">
                    {currentScene.background}
                  </div>
                  
                  <div          correct: false,
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
