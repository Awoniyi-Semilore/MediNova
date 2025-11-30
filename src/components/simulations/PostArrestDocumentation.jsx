import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import '../Css files/CardiacDocumentation.css'; 

const PostArrestDocumentation = ({ onNavigate }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <div className="documentation-page">
      {showFeedback && (
        <FeedbackForm 
          simulationType="Cardiac Arrest" 
          onClose={() => setShowFeedback(false)} 
        />
      )}
      
      <header className="doc-header">
        <h1>Post-Simulation Review: Post-Cardiac Arrest Care (P-CACC)</h1>
        <button 
            className="skip-btn" 
            onClick={() => onNavigate('home')}
        >
            Return to Home &rarr;
        </button>
      </header>

      <div className="doc-content">
        <section className="p-cacc-review">
          <h2>🧠 P-CACC: The A, B, C Priorities After ROSC</h2>
          <p>
            Achieving ROSC is only the first step. Post-cardiac arrest care determines neurological outcome. Care is focused on three main areas: Airway/Breathing, Circulation, and Targeted Temperature Management (TTM).
          </p>

          <div className="key-terms-box">
            <h3>A & B: Airway and Breathing Management</h3>
            <ul className="clinical-list">
                <li><span style={{fontWeight: 'bold'}}>Oxygenation:</span> Maintain O₂ saturation &ge; 94%. Avoid hyperoxia (O₂ sat &gt; 98%).</li>
                <li><span style={{fontWeight: 'bold'}}>Ventilation/CO₂:</span> Maintain ETCO₂ (End-Tidal CO₂) in the range of 35-45 mmHg to prevent cerebral vasoconstriction/vasodilation.</li>
            </ul>
          </div>

          <div className="key-terms-box">
            <h3>C: Circulation Management (Perfusion)</h3>
            <ul className="clinical-list">
                <li><span style={{fontWeight: 'bold'}}>Hypotension Target:</span> Maintain SBP &ge; 90 mmHg or MAP &ge; 65 mmHg.</li>
                <li><span style={{fontWeight: 'bold'}}>Fluid/Vasoactive Drugs:</span> Initiate IV fluid bolus (1-2 L normal saline) followed by vasopressors (Norepinephrine or Dopamine) to meet BP goals.</li>
                <li><span style={{fontWeight: 'bold'}}>PCI Indication:</span> Perform immediate coronary angiography/percutaneous coronary intervention (PCI) for suspected STEMI or unstable non-STEMI.</li>
            </ul>
          </div>
        </section>

        <section className="ttm-review">
          <h2>🌡️ Targeted Temperature Management (TTM)</h2>
          <p>
            TTM is initiated for comatose patients (GCS &lt; 8) after ROSC to improve neurological recovery.
          </p>
          <ul className="clinical-list">
            <li><span style={{fontWeight: 'bold'}}>Target Temperature:</span> Maintain a target temperature of 32-36°C for at least 24 hours.</li>
            <li><span style={{fontWeight: 'bold'}}>Method:</span> Use external cooling blankets or intravenous cold fluids.</li>
            <li><span style={{fontWeight: 'bold'}}>Monitoring:</span> Continuous core temperature monitoring (e.g., esophageal or bladder probe) is required.</li>
          </ul>
        </section>
      </div>

      <footer className="doc-footer">
        <p>You have successfully completed the core Cardiac Arrest Simulations (Recognition, VF Management, and P-CACC).</p>
        <div className="feedback-section">
          <button 
            className="feedback-btn"
            onClick={() => setShowFeedback(true)}
          >
            📝 Provide Feedback
          </button>
          <button 
            className="next-sim-btn" 
            onClick={() => onNavigate('home')}
          >
            Return to Home &rarr;
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PostArrestDocumentation;