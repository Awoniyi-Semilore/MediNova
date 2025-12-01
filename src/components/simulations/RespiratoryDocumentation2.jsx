import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';

const RespiratoryDocumentation2 = ({ onNavigate, onPass }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <div className="documentation-page">
      {showFeedback && (
        <FeedbackForm 
          simulationType="Pediatric Respiratory Interventions" 
          onClose={() => setShowFeedback(false)}
          trigger="auto"
        />
      )}
      
      <header className="doc-header">
        <h1>Pediatric Respiratory: Immediate Interventions Review</h1>
        <button className="skip-btn" onClick={() => onNavigate('home')}>
          Return to Home &rarr;
        </button>
      </header>
      
      <div className="doc-content">
        <section className="treatment-protocols">
          <h2>💨 First-Line Treatments</h2>
          <div className="key-terms-box">
            <h3>Asthma Exacerbation Management</h3>
            <ul className="clinical-list">
              <li><strong>Oxygen Therapy:</strong> High-flow (10-15L/min) via non-rebreather mask to maintain SpO₂ ≥94%</li>
              <li><strong>Bronchodilators:</strong> Short-acting beta-agonists (albuterol) via nebulizer or MDI with spacer</li>
              <li><strong>Corticosteroids:</strong> Early administration reduces inflammation and prevents progression</li>
              <li><strong>Monitoring:</strong> Continuous pulse oximetry and frequent reassessment</li>
            </ul>
          </div>
        </section>

        <section className="medication-guide">
          <h2>💊 Medication Dosing</h2>
          <div className="clinical-table">
            <div className="table-row header">
              <div>Medication</div>
              <div>Route</div>
              <div>Pediatric Dose</div>
              <div>Frequency</div>
            </div>
            <div className="table-row">
              <div>Albuterol</div>
              <div>Nebulized</div>
              <div>2.5-5mg</div>
              <div>Every 20min x3</div>
            </div>
            <div className="table-row">
              <div>Prednisone</div>
              <div>Oral</div>
              <div>1-2mg/kg</div>
              <div>Daily x3-5 days</div>
            </div>
          </div>
        </section>
      </div>

      <footer className="doc-footer">
        <p>You have mastered immediate interventions. Ready for advanced management?</p>
        <div className="feedback-section">
          <button 
            className="feedback-btn"
            onClick={() => setShowFeedback(true)}
          >
            📝 Provide Feedback
          </button>
          <button className="next-sim-btn" onClick={onPass}>
            Continue to Simulation 3: Advanced Management &rarr;
          </button>
        </div>
      </footer>
    </div>
  );
};

export default RespiratoryDocumentation2;