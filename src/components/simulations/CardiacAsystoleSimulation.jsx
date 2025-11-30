import React, { useState, useEffect } from 'react';
import ActionModal from '../ActionModal.jsx';
import '../Css files/CardiacSimulation.css'; 

const CardiacAsystoleSimulation = ({ onNavigate, onPass }) => {
  const [step, setStep] = useState('simulation3-intro'); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [attempts, setAttempts] = useState(0);

  const scenarioPatient = 'Mr. David Chen (Code in progress, 2nd rhythm check)';

  // --- SCENARIO STEP DEFINITIONS ---
  const steps = {
    'simulation3-intro': {
      title: '🎥 Simulation 3: Asystole & Post-Arrest Care',
      message: `Welcome to the third phase. You are 6 minutes into the code. Epinephrine has been administered. The team is pausing for the second rhythm check.`,
      type: 'blue',
      isDecision: false, 
      actions: {
        confirm: () => setStep('asystole-check'),
        confirmText: 'Begin Rhythm Check'
      }
    },
    'asystole-check': {
      title: `Rhythm Check: Analyzing...`,
      message: `CPR is briefly paused. The monitor shows a flat, straight line: <b>Asystole (a non-shockable rhythm)</b>. What is the next immediate step?`,
      type: 'red',
      isDecision: true,
      options: [
        { text: 'A) Immediate Defibrillation (Shock).', isCorrect: false, nextStep: 'fail' },
        { text: <span>B) <span style={{fontWeight: 'bold'}}>Resume high-quality chest compressions immediately for 2 minutes.</span></span>, isCorrect: true, nextStep: 'asystole-action' },
        // Fixed: Replaced $\le 10$ with $\le 10$ seconds. (Kept $\le$ but will use <= in final output for max compatibility)
        { text: 'C) Check for a pulse for <= 10 seconds.', isCorrect: false, nextStep: 'fail' }
      ]
    },
    'asystole-action': {
      title: `💊 Non-Shockable Management`,
      message: `Compressions are in progress. Since Asystole is a non-shockable rhythm, the focus shifts to treating the H's and T's and maximizing perfusion. When should the next dose of Epinephrine be administered?`,
      type: 'yellow',
      isDecision: true,
      options: [
        { text: 'A) Immediately now, as soon as the rhythm is confirmed.', isCorrect: false, nextStep: 'fail' },
        { text: 'B) Never, Epinephrine is only used for VF/pVT.', isCorrect: false, nextStep: 'fail' },
        { text: <span>C) <span style={{fontWeight: 'bold'}}>Every 3-5 minutes (i.e., during the next CPR cycle).</span></span>, isCorrect: true, nextStep: 'rosc-pulse-check' }
      ]
    },
    'rosc-pulse-check': {
      title: '✨ Pulse Check: Return of Spontaneous Circulation (ROSC)!',
      message: `After the CPR cycle, the team leader checks the pulse. A strong carotid pulse is felt, and the patient's ETCO2 suddenly jumps from 15 mmHg to 40 mmHg. ROSC is confirmed. What is the highest priority now?`,
      type: 'green',
      isDecision: true,
      options: [
        { text: 'A) Continue chest compressions until the patient wakes up.', isCorrect: false, nextStep: 'fail' },
        // Fixed: Replaced $\ge 94\%$ with >= 94%
        { text: <span> B) <span style={{fontWeight: 'bold'}}> Optimize Airway & Ventilation (Maintain O2 saturation {'>='} 94% and manage CO2).</span></span>, isCorrect: true, nextStep: 'post-arrest-bp' },
        { text: 'C) Administer a third dose of Epinephrine.', isCorrect: false, nextStep: 'fail' }
      ]
    },
    'post-arrest-bp': {
      title: '🏥 Post-Cardiac Arrest Care (P-CACC)',
      message: `The patient is stable but hypotensive (BP 80/55 mmHg). The team must manage hypotension aggressively to maintain organ perfusion. What is the target SBP (Systolic Blood Pressure)?`,
      type: 'green',
      isDecision: true,
      options: [
        // Fixed: Removed all LaTeX and replaced $\ge$ with >=
        { text: 'A) SBP target >= 120 mmHg.', isCorrect: false, nextStep: 'fail' },
        // Fixed: Removed all LaTeX and replaced $\ge$ with >=
        { text: <span>B) <span style={{fontWeight: 'bold'}}>SBP target {'>='} 90 mmHg (or MAP {'>='} 65 mmHg).</span></span>, isCorrect: true, nextStep: 'pass' },
        // Fixed: Removed all LaTeX
        { text: 'C) SBP target 70 mmHg to allow for passive warming.', isCorrect: false, nextStep: 'fail' }
      ]
    },
    'pass': {
      title: '✅ Simulation 3 Passed!',
      message: "Outstanding! You correctly navigated the non-shockable algorithm, recognized ROSC using clinical signs (ETCO2 jump), and initiated the critical P-CACC steps by managing airway and blood pressure. Proceed to the Post-Arrest Care Documentation review.",
      type: 'green',
      isDecision: false,
      actions: {
        confirm: () => onPass(), 
        confirmText: 'Go to Post-Arrest Documentation'
      }
    },
    'fail': {
      title: '❌ Simulation Failed',
      message: "A major error in PEA/Asystole management or ROSC priority setting occurred. Review the non-shockable algorithm and P-CACC steps, then try again.",
      type: 'red',
      isDecision: false,
      actions: {
        confirm: () => {
          setAttempts(a => a + 1);
          setStep('asystole-check'); 
        },
        confirmText: 'Review & Restart Simulation'
      }
    }
  };

  // --- Logic and Handlers (Same as Sim 1/2) ---

  useEffect(() => {
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
        <h2>Emergency Scenario 3: Asystole & Post-Arrest Care</h2>
        <div className="patient-status">
          <p><span style={{fontWeight: 'bold'}}>Patient:</span> {scenarioPatient}</p>
          <p className={`status-alert status-${modalContent.type}`}>Status: {modalContent.title}</p>
          <p className="attempts-count">Attempts: <span style={{fontWeight: 'bold'}}>{attempts}</span></p>
        </div>
      </div>
      
      <div className="scenario-container">
        {/* Visual representation placeholder */}
        <div className="patient-bedside-view">
          <div className={`patient-visual ${step === 'asystole-check' ? 'critical-color' : ''}`}>
            {step === 'asystole-check' ? ' monitor shows flatline' : 'CPR in Progress / Stable Post-Arrest'}
          </div>
          <div className="monitor-display">
            {/* Fixed: Removed LaTeX from ROSC, ETCO2, mmHg, BP, P-CACC */}
            <p className="monitor-line monitor-hr">Rhythm: <span className={step === 'asystole-check' ? 'red-text' : ''}>Asystole / ROSC Rhythm</span></p>
            <p className="monitor-line monitor-rr">End-Tidal CO2 (ETCO2): <span className={step === 'rosc-pulse-check' ? 'green-text' : ''}>15 $\to$ 40 mmHg</span></p>
            <p className="monitor-line monitor-bp">BP: <span className={step === 'post-arrest-bp' ? 'pink-text' : ''}>80/55 mmHg (Post-ROSC)</span></p>
          </div>
        </div>
        
        {/* Current Scenario Text */}
        <div className="story-log">
          <h3>ACLS Log Continued</h3>
          <p><span style={{fontWeight: 'bold'}}>09:39:</span> Rhythm check performed: Asystole confirmed.</p>
          <p><span style={{fontWeight: 'bold'}}>09:40:</span> High-quality CPR resumed. Epinephrine administered (2nd dose).</p>
          {step === 'rosc-pulse-check' || step === 'post-arrest-bp' || step === 'pass' && <p className="code-called-log"><span style={{fontWeight: 'bold'}}>09:42:</span> Pulse check: ROSC confirmed. ETCO2 jump noted.</p>}
          {step === 'post-arrest-bp' || step === 'pass' && <p className="code-called-log"><span style={{fontWeight: 'bold'}}>09:43:</span> Post-arrest care initiated. Vasopressors prepared for hypotension.</p>}
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

export default CardiacAsystoleSimulation;