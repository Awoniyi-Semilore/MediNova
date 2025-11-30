import React, { useState, useEffect } from 'react';
import ActionModal from '../ActionModal.jsx';

const RespiratorySimulation2 = ({ onNavigate, onPass }) => {
  const [step, setStep] = useState('oxygen-therapy');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [attempts, setAttempts] = useState(0);

  const scenarioPatient = 'Schneider (14 y/o, severe asthma exacerbation)';

  const steps = {
    'oxygen-therapy': {
      title: '💨 Immediate Oxygen Therapy',
      message: `Schneider's SpO₂ is 85%. What is the appropriate initial oxygen delivery method?`,
      type: 'blue',
      isDecision: true,
      options: [
        { text: 'A) Nasal cannula at 2L/min.', isCorrect: false, nextStep: 'fail' },
        { text: <span>B) <span style={{fontWeight: 'bold'}}>Non-rebreather mask at 15L/min to achieve SpO₂ ≥ 94%.</span></span>, isCorrect: true, nextStep: 'bronchodilator' },
        { text: 'C) Room air - avoid oxygen to prevent CO₂ retention.', isCorrect: false, nextStep: 'fail' }
      ]
    },
    'bronchodilator': {
      title: '💊 Bronchodilator Administration',
      message: `Oxygen is applied. Schneider continues to struggle. What is the first-line bronchodilator treatment?`,
      type: 'yellow',
      isDecision: true,
      options: [
        { text: 'A) Oral prednisone.', isCorrect: false, nextStep: 'fail' },
        { text: <span>B) <span style={{fontWeight: 'bold'}}>Short-acting beta-agonist via nebulizer (albuterol).</span></span>, isCorrect: true, nextStep: 'corticosteroids' },
        { text: 'C) IV aminophylline.', isCorrect: false, nextStep: 'fail' }
      ]
    },
    'corticosteroids': {
      title: '🩺 Systemic Corticosteroids',
      message: `After bronchodilator, Schneider shows slight improvement but remains in distress. When should systemic corticosteroids be administered?`,
      type: 'red',
      isDecision: true,
      options: [
        { text: 'A) Only if no improvement after 24 hours.', isCorrect: false, nextStep: 'fail' },
        { text: 'B) After consulting with pediatric pulmonology.', isCorrect: false, nextStep: 'fail' },
        { text: <span>C) <span style={{fontWeight: 'bold'}}>Immediately in moderate to severe exacerbations.</span></span>, isCorrect: true, nextStep: 'pass' }
      ]
    },
    'pass': {
      title: '✅ Simulation 2 Completed!',
      message: "Great work! You implemented the critical first-line treatments for severe asthma exacerbation: oxygen therapy, bronchodilators, and early corticosteroids. These interventions can be life-saving.",
      type: 'green',
      isDecision: false,
      actions: {
        confirm: () => onPass(),
        confirmText: 'Continue to Simulation 3'
      }
    },
    'fail': {
      title: '❌ Simulation Failed',
      message: "Incorrect treatment sequence could worsen respiratory failure. Review asthma management protocols and try again.",
      type: 'red',
      isDecision: false,
      actions: {
        confirm: () => {
          setAttempts(a => a + 1);
          setStep('oxygen-therapy');
        },
        confirmText: 'Review & Restart Simulation'
      }
    }
  };

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

  return (
    <div className="respiratory-simulation-page">
      <div className="simulation-header">
        <h2>Pediatric Respiratory: Immediate Interventions (Sim 2)</h2>
        <div className="patient-status">
          <p><span style={{fontWeight: 'bold'}}>Patient:</span> {scenarioPatient}</p>
          <p className={`status-alert status-${modalContent.type}`}>Status: {modalContent.title}</p>
          <p className="attempts-count">Attempts: <span style={{fontWeight: 'bold'}}>{attempts}</span></p>
        </div>
      </div>

      <div className="scenario-container">
        <div className="patient-bedside-view">
          <div className="patient-visual critical-color">
            😫 Severe Respiratory Distress
          </div>
          <div className="monitor-display">
            <p className="monitor-line monitor-spo2">SpO₂: <span className="red-text">85% → 94%</span></p>
            <p className="monitor-line monitor-treatment">Treatment: Oxygen + Bronchodilator</p>
            <p className="monitor-line monitor-status">Status: Critical but Stable</p>
          </div>
        </div>

        <div className="story-log">
          <h3>Treatment Log</h3>
          <p><span style={{fontWeight: 'bold'}}>Intervention 1:</span> High-flow oxygen initiated.</p>
          {step !== 'oxygen-therapy' && <p><span style={{fontWeight: 'bold'}}>Intervention 2:</span> Nebulized bronchodilator administered.</p>}
          {step === 'corticosteroids' && <p><span style={{fontWeight: 'bold'}}>Intervention 3:</span> Systemic corticosteroids prepared.</p>}
        </div>
      </div>

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

export default RespiratorySimulation2;