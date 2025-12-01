import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import '../Css files/CardiacDocumentation.css';

const CardiacDocumentation = ({ onNavigate, onPass }) => {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <div className="documentation-page">
      {showFeedback && (
        <FeedbackForm 
          simulationType="Cardiac Arrest Recognition" 
          onClose={() => setShowFeedback(false)}
          trigger="auto"
        />
      )}
      
      <header className="doc-header">
        <h1>Post-Simulation Review: Cardiac Arrest Recognition (Sim 1)</h1>
        <button 
            className="skip-btn" 
            onClick={() => onNavigate('home')}
        >
            Return to Home &rarr;
        </button>
      </header>

      <div className="doc-content">
        <section className="recognition-review">
          <h2>🔍 Recognition and Activation</h2>
          <p>
            The initial steps of the Chain of Survival focus on rapid assessment and activating professional help. Every second counts in achieving neurological recovery.
          </p>
          <div className="key-terms-box">
            <h3>Key Takeaways from Simulation 1</h3>
            <ul className="clinical-list">
                <li><span style={{fontWeight: 'bold'}}>Priority 1:</span> Assess responsiveness immediately (Shake & Shout).</li>
                <li><span style={{fontWeight: 'bold'}}>Priority 2:</span> If unresponsive, check for pulse and breathing simultaneously for no more than ≤ 10 seconds.</li>
                <li><span style={{fontWeight: 'bold'}}>Priority 3:</span> If no pulse/apneic, <strong>immediately call a Code Blue</strong> (Activate the Emergency Response System). Do not delay activation to start CPR alone.</li>
                <li><span style={{fontWeight: 'bold'}}>Priority 4:</span> Start high-quality chest compressions (CAB) at a rate of 100-120 per minute, 5-6 cm deep.</li>
            </ul>
          </div>
        </section>

        <section className="chain-of-survival">
          <h2>🔗 The Adult Chain of Survival</h2>
          <p>
            The Chain of Survival dictates the sequence of interventions. Simulation 1 focused on links 1 and 2.
          </p>
          <ol className="clinical-list">
            <li>Immediate Recognition of Cardiac Arrest and Activation of the Emergency Response System.</li>
            <li>Early Cardiopulmonary Resuscitation (CPR) with emphasis on chest compressions.</li>
            <li>Rapid Defibrillation (for shockable rhythms like VF/pVT).</li>
            <li>Effective Advanced Life Support (ALS) (Simulations 2 & 3).</li>
            <li>Integrated Post-Cardiac Arrest Care (P-CACC) (Simulation 3).</li>
          </ol>
        </section>
      </div>

      <footer className="doc-footer">
        <p>You have successfully mastered the initial recognition phase. Continue to Simulation 2 to learn ACLS rhythm management.</p>
        <div className="feedback-section">
          <button 
            className="feedback-btn"
            onClick={() => setShowFeedback(true)}
          >
            📝 Provide Feedback
          </button>
          <button 
            className="next-sim-btn" 
            onClick={onPass}
          >
            Continue to Simulation 2: Rhythm Management &rarr;
          </button>
        </div>
      </footer>
    </div>
  );
};

export default CardiacDocumentation;