import React, { useState, useEffect } from 'react';
import ActionModal from '../ActionModal.jsx';

const RespiratorySimulation3 = ({ onNavigate, onPass }) => {
  const [step, setStep] = useState('escalation');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [attempts, setAttempts] = useState(0);

  const scenarioPatient = 'Schneider (14 y/o, status asthmaticus)';

  const steps = {
    'escalation': {
      title: '🚨 Treatment Escalation',
      message: `Despite initial treatments, Schneider continues to deteriorate. Respiratory rate 40/min, SpO₂ 89% on NRB. What's the next appropriate escalation?`,
      type: 'red',
      isDecision: true,
      options: [
        { text: 'A) Wait 30 minutes for current treatments to work.', isCorrect: false, nextStep: 'fail' },
        { text: <span>B) <span style={{fontWeight: 'bold'}}>Continuous nebulized albuterol and prepare for ICU transfer.</span></span>, isCorrect: true, nextStep: 'adjunct-therapy' },
        { text: 'C) Increase oxygen to 100% via simple mask.', isCorrect: false, nextStep: 'fail' }
      ]
    },
    'adjunct-therapy': {
      title: '💉 Adjunct Therapies',
      message: `Schneider is now in status asthmaticus. What adjunct therapy should be considered when beta-agonists alone are insufficient?`,
      type: 'yellow',
      isDecision: true,
      options: [
        { text: 'A) Antibiotics for potential infection.', isCorrect: false, nextStep: 'fail' },
        { text: <span>B) <span style={{fontWeight: 'bold'}}>Ipratropium bromide nebulizer combined with albuterol.</span></span>, isCorrect: true, nextStep: 'critical-decision' },
        { text: 'C) Sedation to reduce anxiety.', isCorrect: false, nextStep: 'fail' }
      ]
    },
    'critical-decision': {
      title: '⚡️ Critical Care Decision',
      message: `Schneider shows signs of impending respiratory failure: silent chest, decreased consciousness. What is the most critical intervention?`,
      type: 'red',
      isDecision: true,
      options: [
        { text: 'A) Administer IV fluids for hydration.', isCorrect: false, nextStep: 'fail' },
        { text: 'B) Call family for emergency consent.', isCorrect: false, nextStep: 'fail' },
        { text: <span>C) <span style={{fontWeight: 'bold'}}>Prepare for intubation and mechanical ventilation.</span></span>, isCorrect: true, nextStep: 'pass' }
      ]
    },
    'pass': {
      title: '✅ Simulation 3 Completed!',
      message: "Outstanding! You managed a life-threatening status asthmaticus case through appropriate escalation, adjunct therapies, and recognizing when advanced airway management is necessary. This comprehensive approach saves lives.",
      type: 'green',
      isDecision: false,
      actions: {
        confirm: () => onPass(),
        confirmText: 'View Documentation'
      }
    },
    'fail': {
      title: '❌ Simulation Failed',
      message: "Failure to escalate treatment appropriately in status asthmaticus can lead to respiratory arrest. Review severe asthma management protocols.",
      type: 'red',
      isDecision: false,
      actions: {
        confirm: () => {
          setAttempts(a => a + 1);
          setStep('escalation');
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
        <h2>Pediatric Respiratory: Advanced Management (Sim 3)</h2>
        <div className="patient-status">
          <p><span style={{fontWeight: 'bold'}}>Patient:</span> {scenarioPatient}</p>
          <p className={`status-alert status-${modalContent.type}`}>Status: {modalContent.title}</p>
          <p className="attempts-count">Attempts: <span style={{fontWeight: 'bold'}}>{attempts}</span></p>
        </div>
      </div>

      <div className="scenario-container">
        <div className="patient-bedside-view">
          <div className="patient-visual critical-color">
            🚨 Status Asthmaticus
          </div>
          <div className="monitor-display">
            <p className="monitor-line monitor-rr">RR: <span className="red-text">40 / min</span></p>
            <p className="monitor-line monitor-spo2">SpO₂: <span className="red-text">89% on NRB</span></p>
            <p className="monitor-line monitor-status">Condition: Deteriorating</p>
          </div>
        </div>

        <div className="story-log">
          <h3>Critical Care Log</h3>
          <p><span style={{fontWeight: 'bold'}}>Status:</span> Not responding to initial therapies.</p>
          {step !== 'escalation' && <p><span style={{fontWeight: 'bold'}}>Escalation:</span> Continuous nebulizers initiated.</p>}
          {step === 'critical-decision' && <p><span style={{fontWeight: 'bold'}}>Critical:</span> Impending respiratory failure detected.</p>}
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

export default RespiratorySimulation3;