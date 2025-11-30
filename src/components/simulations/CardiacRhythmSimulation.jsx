import React, { useState, useEffect } from 'react';
import ActionModal from '../ActionModal.jsx';
import '../Css files/CardiacSimulation.css'; // Reusing the same styles

const CardiacRhythmSimulation = ({ onNavigate, onPass }) => {
  const [step, setStep] = useState('simulation2-intro'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [attempts, setAttempts] = useState(0);

  const scenarioPatient = 'Mr. David Chen (Code in progress, initial arrest identified)';

  // --- SCENARIO STEP DEFINITIONS ---
  const steps = {
    'simulation2-intro': {
      title: '🎥 Simulation 2: Initial Rhythm Identification & ACLS',
      message: `Welcome to the second phase. The Code Blue team has arrived, and high-quality CPR is in progress. The AED/Defibrillator is attached. Your immediate priority is to identify the initial rhythm and initiate the correct ACLS pathway.`,
      type: 'blue',
      isDecision: false, 
      actions: {
        confirm: () => setStep('rhythm-check'),
        confirmText: 'Begin Rhythm Check'
      }
    },
    'rhythm-check': {
      title: `Rhythm Check: Analyzing...`,
      message: `CPR is briefly paused for rhythm analysis. The monitor shows a chaotic, unorganized electrical pattern: <b>Ventricular Fibrillation ($VF$)</b>. [Image of Ventricular Fibrillation EKG] What is the absolute next action?`,
      type: 'red',
      isDecision: true,
      options: [
        { text: 'A) Administer Epinephrine 1 mg IV push.', isCorrect: false, nextStep: 'fail' },
        { text: <span>B) <span style={{fontWeight: 'bold'}}>Charge and deliver immediate defibrillation (Shock).</span></span>, isCorrect: true, nextStep: 'vf-action' },
        { text: 'C) Establish a secondary IV access point.', isCorrect: false, nextStep: 'fail' }
      ]
    },
    'vf-action': {
      title: `⚡️ Defibrillation Delivered!`,
      message: `The shock was delivered successfully. The patient's heart rhythm remains non-perfusing (no pulse). According to the ACLS algorithm, what must be done <b>immediately</b> after a shock?`,
      type: 'pink',
      isDecision: true,
      options: [
        { text: 'A) Check for a pulse for 10 seconds.', isCorrect: false, nextStep: 'fail' },
        { text: <span>B) <span style={{fontWeight: 'bold'}}>Resume high-quality chest compressions immediately for 2 minutes.</span></span>, isCorrect: true, nextStep: 'post-shock-cpr' },
        { text: 'C) Prepare a second shock immediately.', isCorrect: false, nextStep: 'fail' }
      ]
    },
    'post-shock-cpr': {
      title: `💉 First Drug Administration`,
      message: `Compressions are in progress. You have 2 minutes to cycle before the next rhythm check. The team leader orders medication. Which is the <b>first line drug</b> in the $VF$/pulseless $VT$ pathway?`,
      type: 'yellow',
      isDecision: true,
      options: [
        { text: 'A) Adenosine 6 mg rapid IV push.', isCorrect: false, nextStep: 'fail' },
        { text: 'B) Lidocaine 1-1.5 mg/kg IV bolus.', isCorrect: false, nextStep: 'fail' },
        { text: <span>C) <span style={{fontWeight: 'bold'}}>Epinephrine 1 mg IV/IO push.</span></span>, isCorrect: true, nextStep: 'pass' }
      ]
    },
    'pass': {
      title: '✅ Simulation 2 Passed!',
      message: "Excellent! You successfully managed the initial $VF$ cycle: Shock, immediate CPR, and Epinephrine administration. You have secured the patient for the critical next phase of the resuscitation. Proceed to the Rhythm Management Documentation review.",
      type: 'green',
      isDecision: false,
      actions: {
        confirm: () => onPass(), // Navigates to documentation
        confirmText: 'Go to Rhythm Management Documentation'
      }
    },
    'fail': {
      title: '❌ Simulation Failed',
      message: "Critical error in ACLS protocol or timing. Review the steps for a Shockable rhythm ($VF$/$pVT$) and try again.",
      type: 'red',
      isDecision: false,
      actions: {
        confirm: () => {
          setAttempts(a => a + 1);
          setStep('rhythm-check'); // Restart from the decision point
        },
        confirmText: 'Review & Restart Simulation'
      }
    }
  };

  // --- Logic and Handlers (Same as Sim 1) ---

  useEffect(() => {
    // Show the modal whenever the step changes
    const currentStep = steps[step];
    if (currentStep) {
      setModalContent(currentStep);
      setIsModalOpen(true);
    }
  }, [step]);

  const handleModalConfirm = () => {
    const currentStep = steps[step];
    if (currentStep?.actions?.confirm) {
      currentStep.actions.confirm();
    }
    setIsModalOpen(false);
  };

  const handleOptionSelect = (option) => {
    setIsModalOpen(false);
    if (option.isCorrect) {
      setStep(option.nextStep);
    } else {
      setStep('fail');
    }
  };

  // Render the main scenario backdrop
  return (
    <div className="cardiac-simulation-page">
      <div className="simulation-header">
        <h2>Emergency Scenario 2: ACLS & Rhythm Management</h2>
        <div className="patient-status">
          <p><span style={{fontWeight: 'bold'}}>Patient:</span> {scenarioPatient}</p>
          <p className={`status-alert status-${modalContent.type}`}>Status: {modalContent.title}</p>
          <p className="attempts-count">Attempts: <span style={{fontWeight: 'bold'}}>{attempts}</span></p>
        </div>
      </div>
      
      <div className="scenario-container">
        {/* Visual representation placeholder */}
        <div className="patient-bedside-view">
          <div className={`patient-visual ${step === 'rhythm-check' ? 'critical-color' : ''}`}>
            {step === 'rhythm-check' ? '⚡️ Defibrillator Attached - Analyzing Rhythm' : 'CPR in Progress'}
          </div>
          <div className="monitor-display">
            <p className="monitor-line monitor-hr">Rhythm: <span className={step === 'rhythm-check' ? 'red-text' : ''}>VF / Asystole</span></p>
            <p className="monitor-line monitor-rr">CPR Cycle: 1 of 5</p>
            <p className="monitor-line monitor-bp">Defib Counter: 1st Shock Delivered</p>
          </div>
        </div>
        
        {/* Current Scenario Text */}
        <div className="story-log">
          <h3>ACLS Log</h3>
          <p><span style={{fontWeight: 'bold'}}>09:32:</span> Code Blue activated (from Sim 1).</p>
          <p><span style={{fontWeight: 'bold'}}>09:33:</span> Code Team arrived. Pads placed, CPR cycle started.</p>
          {step !== 'rhythm-check' && <p><span style={{fontWeight: 'bold'}}>09:35:</span> Rhythm check performed: $VF$ confirmed.</p>}
          {step === 'vf-action' || step === 'post-shock-cpr' || step === 'pass' && <p className="code-called-log"><span style={{fontWeight: 'bold'}}>09:35:30:</span> Defibrillation delivered, 200J.</p>}
          {step === 'post-shock-cpr' || step === 'pass' && <p className="code-called-log"><span style={{fontWeight: 'bold'}}>09:36:</span> Epinephrine 1 mg administered.</p>}
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

export default CardiacRhythmSimulation;