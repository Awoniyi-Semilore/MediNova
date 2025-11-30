import React, { useState, useEffect } from 'react';
import ActionModal from '../ActionModal.jsx';
import VideoPlayer from './VideoPlayer.jsx';

const RespiratorySimulation1 = ({ onNavigate, onPass }) => {
  const [step, setStep] = useState('play-video');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [attempts, setAttempts] = useState(0);

  const scenarioPatient = 'Schneider (14 y/o female, asthma history)';

  const startSimulation = () => {
    setStep('initial-assessment');
  };

  const steps = {
    'initial-assessment': {
      title: `Initial Assessment: ${scenarioPatient}`,
      message: `You're called to the school nurse's office. Schneider is sitting upright, using accessory muscles to breathe. She's speaking in short phrases and appears anxious. What's your first priority?`,
      type: 'blue',
      isDecision: true,
      options: [
        { text: 'A) Take a detailed medical history from her friends.', isCorrect: false, nextStep: 'fail' },
        { text: <span>B) <span style={{fontWeight: 'bold'}}>Assess airway, breathing, and circulation (ABCs).</span></span>, isCorrect: true, nextStep: 'vital-signs' },
        { text: 'C) Administer her personal inhaler immediately.', isCorrect: false, nextStep: 'fail' }
      ]
    },
    'vital-signs': {
      title: '📊 Vital Signs Assessment',
      message: `Initial assessment shows: Respiratory Rate 36/min, SpO₂ 88% on room air, Heart Rate 130 bpm. She has audible wheezing and intercostal retractions. What condition do you suspect?`,
      type: 'yellow',
      isDecision: true,
      options: [
        { text: 'A) Anxiety attack - administer calming techniques.', isCorrect: false, nextStep: 'fail' },
        { text: 'B) Pneumonia - start antibiotic therapy.', isCorrect: false, nextStep: 'fail' },
        { text: <span>C) <span style={{fontWeight: 'bold'}}>Acute asthma exacerbation - prepare for bronchodilator therapy.</span></span>, isCorrect: true, nextStep: 'severity-assessment' }
      ]
    },
    'severity-assessment': {
      title: '🚨 Severity Assessment',
      message: `Schneider is now too breathless to speak in full sentences. SpO₂ drops to 85%. This indicates severe respiratory distress. What's the appropriate classification?`,
      type: 'red',
      isDecision: true,
      options: [
        { text: 'A) Mild exacerbation - continue monitoring.', isCorrect: false, nextStep: 'fail' },
        { text: <span>B) <span style={{fontWeight: 'bold'}}>Severe exacerbation - immediate intervention required.</span></span>, isCorrect: true, nextStep: 'pass' },
        { text: 'C) Moderate exacerbation - schedule follow-up.', isCorrect: false, nextStep: 'fail' }
      ]
    },
    'pass': {
      title: '✅ Simulation 1 Completed!',
      message: "Excellent! You correctly identified Schneider's condition as acute asthma exacerbation and recognized the severity. Proper diagnosis is crucial for appropriate treatment. Proceed to learn about immediate interventions.",
      type: 'green',
      isDecision: false,
      actions: {
        confirm: () => onPass(),
        confirmText: 'Continue to Simulation 2'
      }
    },
    'fail': {
      title: '❌ Simulation Failed',
      message: "Incorrect assessment could lead to delayed treatment in real asthma emergencies. Review pediatric respiratory assessment and try again.",
      type: 'red',
      isDecision: false,
      actions: {
        confirm: () => {
          setAttempts(a => a + 1);
          setStep('initial-assessment');
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

  if (step === 'play-video') {
    const vimeoUrl = "https://player.vimeo.com/video/1141773517";
    return <VideoPlayer videoSource={vimeoUrl} onVideoEnd={startSimulation} />;
  }

  return (
    <div className="respiratory-simulation-page">
      <div className="simulation-header">
        <h2>Pediatric Respiratory: Diagnosis & Assessment (Sim 1)</h2>
        <div className="patient-status">
          <p><span style={{fontWeight: 'bold'}}>Patient:</span> {scenarioPatient}</p>
          <p className={`status-alert status-${modalContent.type}`}>Status: {modalContent.title}</p>
          <p className="attempts-count">Attempts: <span style={{fontWeight: 'bold'}}>{attempts}</span></p>
        </div>
      </div>

      <div className="scenario-container">
        <div className="patient-bedside-view">
          <div className={`patient-visual ${step === 'severity-assessment' ? 'critical-color' : ''}`}>
            {step === 'severity-assessment' ? '😫 Severe Respiratory Distress' : '😰 Respiratory Distress'}
          </div>
          <div className="monitor-display">
            <p className="monitor-line monitor-rr">RR: <span className={step !== 'initial-assessment' ? 'red-text' : ''}>36 / min</span></p>
            <p className="monitor-line monitor-spo2">SpO₂: <span className={step !== 'initial-assessment' ? 'red-text' : ''}>88%</span></p>
            <p className="monitor-line monitor-hr">HR: 130 bpm</p>
          </div>
        </div>

        <div className="story-log">
          <h3>Assessment Log</h3>
          <p><span style={{fontWeight: 'bold'}}>Initial:</span> Patient using accessory muscles, speaking phrases.</p>
          {step !== 'initial-assessment' && <p><span style={{fontWeight: 'bold'}}>Progression:</span> SpO₂ dropping, increased work of breathing.</p>}
          {step === 'severity-assessment' && <p><span style={{fontWeight: 'bold'}}>Critical:</span> Unable to speak full sentences.</p>}
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

export default RespiratorySimulation1;