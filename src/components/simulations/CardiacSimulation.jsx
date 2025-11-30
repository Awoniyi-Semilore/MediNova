import React, { useState, useEffect } from 'react';
import ActionModal from '../ActionModal.jsx'; // The interactive decision modal
import VideoPlayer from '../VideoPlayer.jsx'; // The video component (Now in a new file, using a standard name)
import '../Css files/CardiacSimulation.css'; 

const CardiacSimulation = ({ onNavigate, onPass }) => {
  // Scenario Flow State
  const [step, setStep] = useState('video-intro'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [attempts, setAttempts] = useState(0);

  const scenarioPatient = 'Mr. David Chen (68 y/o, 2 days post-op, hip replacement)';

  // Function to move to the next step, used by the VideoPlayer
  const startSimulation = () => {
    setStep('initial-assessment');
  };

  // --- SCENARIO STEP DEFINITIONS ---
  const steps = {
    'video-intro': {
      title: '🎥 Simulation 1: Cardiac Arrest Recognition',
      message: 'Welcome, Nurse! You are on a post-surgical unit. A video briefing on the scenario is ready. You may skip the video if you feel prepared.',
      type: 'blue',
      isDecision: false, // Not a decision step, uses actions
      actions: {
        confirm: startSimulation, // Skip video
        confirmText: 'Skip Video & Start Simulation',
        cancel: () => { 
          setIsModalOpen(false); // Close modal
          setStep('play-video'); // Change step to trigger video display
        },
        cancelText: 'Watch Video Briefing'
      }
    },
    'play-video': { // New step to hold the video
      title: 'Video Briefing',
      message: 'Please watch the scenario video.',
      type: 'blue',
      isDecision: false,
      actions: {} // No actions needed, the VideoPlayer handles progression
    },
    'initial-assessment': {
      title: `Patient Check: ${scenarioPatient}`,
      message: `You enter the room at 09:30 for a routine check. You see Mr. Chen slumped slightly in bed, and his <b>breathing is shallow and slow</b> (RR ≈ 6 bpm). What is your immediate priority?`,
      type: 'blue',
      isDecision: true,
      options: [
        { text: 'A) Check pedal pulses for signs of DVT.', isCorrect: false, nextStep: 'fail' },
        { text: <span>B) <span style={{fontWeight: 'bold'}}>Assess Responsiveness & Airway (Shake & Shout).</span></span>, isCorrect: true, nextStep: 'loss-of-consciousness' },
        { text: 'C) Check IV fluids and assess the Foley catheter output.', isCorrect: false, nextStep: 'fail' }
      ]
    },
    'loss-of-consciousness': {
      title: '🚨 Critical Deterioration!',
      message: `Mr. Chen is <b>unresponsive</b> to your verbal and physical stimuli. His skin is rapidly becoming <b>dusky/cyanotic</b> (a blue-gray pallor). Based on this presentation, your suspicion for a Code Blue must rise.`,
      type: 'pink',
      isDecision: true,
      options: [
        { text: 'A) Administer prescribed PRN pain medication for potential over-sedation.', isCorrect: false, nextStep: 'fail' },
        // Using HTML entity for $\le$
        { text: <span>B) <span style={{fontWeight: 'bold'}}>Check Carotid Pulse & Breathing for &le; 10 seconds.</span></span>, isCorrect: true, nextStep: 'arrest-confirm' },
        { text: 'C) Call the primary physician for STAT orders.', isCorrect: false, nextStep: 'fail' }
      ]
    },
    'arrest-confirm': {
      title: '💔 Cardiac Arrest Confirmed!',
      message: `No pulse is felt, and the patient is apneic. Cardiac Arrest is confirmed. You must initiate the <b>Chain of Survival</b> immediately to maximize the chance of neurologically intact survival.`,
      type: 'red',
      isDecision: true,
      options: [
        { text: 'A) Start chest compressions immediately before calling for help.', isCorrect: false, nextStep: 'fail' },
        { text: <span>B) <span style={{fontWeight: 'bold'}}>Activate the Emergency Response System/Call a Code Blue.</span></span>, isCorrect: true, nextStep: 'pass' },
        { text: 'C) Prepare to administer IV fluids to increase blood pressure.', isCorrect: false, nextStep: 'fail' }
      ]
    },
    'pass': {
      title: '✅ Simulation Passed!',
      message: "Code team activated! You correctly identified the cardiac arrest, prioritized the A-B-C (now C-A-B) steps, and initiated the call for help. This is the foundation of ACLS. Proceed to the Documentation review.",
      type: 'green',
      isDecision: false,
      actions: {
        confirm: () => onPass(), // Navigates to documentation
        confirmText: 'Go to Cardiac Documentation'
      }
    },
    'fail': {
      title: '❌ Simulation Failed',
      message: "Your chosen action resulted in a critical delay or an incorrect intervention. In this real-life scenario, this could have catastrophic consequences. Review the situation and try again.",
      type: 'red',
      isDecision: false,
      actions: {
        confirm: () => {
          setAttempts(a => a + 1);
          setStep('initial-assessment'); // Reset to the start of the scenario
        },
        confirmText: 'Review & Restart Simulation'
      }
    }
  };

  // --- Logic and Handlers ---

  useEffect(() => {
    // Only show the modal if the step is NOT 'play-video'
    const currentStep = steps[step];
    if (currentStep && step !== 'play-video') {
      setModalContent(currentStep);
      setIsModalOpen(true);
    }
  }, [step]);

  const handleModalConfirm = () => {
    const currentStep = steps[step];
    if (currentStep?.actions?.confirm) {
      currentStep.actions.confirm();
    }
    setIsModalOpen(false); // Close the modal if the action doesn't change the step
  };

  const handleOptionSelect = (option) => {
    setIsModalOpen(false);
    if (option.isCorrect) {
      setStep(option.nextStep);
    } else {
      setStep('fail');
    }
  };

  // --- Conditional Rendering: Show VideoPlayer instead of main content when step is 'play-video' ---
  if (step === 'play-video') {
        // CORRECT PATH: Assumes Cardiac Arrest.mp4 is in the root public/videos folder.
        const localVideoPath = '/videos/Cardiac Arrest.mp4'; 
        
        return <VideoPlayer videoSource={localVideoPath} onVideoEnd={startSimulation} />;
    }

  // Render the main scenario backdrop
  return (
    <div className="cardiac-simulation-page">
      <div className="simulation-header">
        <h2>Emergency Scenario 1: Cardiac Arrest Recognition</h2>
        <div className="patient-status">
          <p><span style={{fontWeight: 'bold'}}>Patient:</span> {scenarioPatient}</p>
          <p className={`status-alert status-${modalContent.type}`}>Status: {modalContent.title}</p>
          <p className="attempts-count">Attempts: <span style={{fontWeight: 'bold'}}>{attempts}</span></p>
        </div>
      </div>
      
      <div className="scenario-container">
        {/* Visual representation placeholder */}
        <div className="patient-bedside-view">
          {/* Use placeholders that reflect the patient's status */}
          <div className={`patient-visual ${step === 'loss-of-consciousness' ? 'critical-color' : ''}`}>
            {step === 'loss-of-consciousness' || step === 'arrest-confirm' ? '🚨 Unresponsive & Cyanotic Patient' : '😴 Resting Patient'}
          </div>
          <div className="monitor-display">
            <p className="monitor-line monitor-hr">HR: <span className={step === 'arrest-confirm' ? 'red-text' : ''}>0 (Non-palpable)</span></p>
            <p className="monitor-line monitor-rr">RR: <span className={step === 'initial-assessment' ? 'pink-text' : ''}>6 / min</span></p>
            <p className="monitor-line monitor-bp">BP: Unobtainable</p>
          </div>
        </div>
        
        {/* Current Scenario Text */}
        <div className="story-log">
          <h3>Incident Log</h3>
          <p><span style={{fontWeight: 'bold'}}>09:30:</span> Entered room for vital signs check. Noted shallow respirations.</p>
          {step !== 'initial-assessment' && <p><span style={{fontWeight: 'bold'}}>09:31:</span> Patient unresponsive to verbal stimuli.</p>}
          {step === 'arrest-confirm' || step === 'pass' && <p className="code-called-log"><span style={{fontWeight: 'bold'}}>09:32:</span> CODE BLUE ACTIVATED.</p>}
        </div>
      </div>
      
      {/* The main action modal for decision making */}
      <ActionModal
        show={isModalOpen}
        title={modalContent.title}
        message={modalContent.message}
        type={modalContent.type}
        options={modalContent.options}
        onSelect={handleOptionSelect}
        showActionsOnly={!modalContent.isDecision}
        onConfirm={handleModalConfirm}
        confirmText={modalContent.actions?.confirmText}
      />
      
      <button className="back-to-home-btn" onClick={() => onNavigate('home')}>
        &larr; Back to Training Menu
      </button>
    </div>
  );
};

export default CardiacSimulation;