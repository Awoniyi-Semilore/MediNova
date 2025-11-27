import React from 'react';
import '../Css files/CardiacDocumentation.css'; 

const PostArrestDocumentation = ({ onNavigate }) => {
  return (
    <div className="documentation-page">
      <header className="doc-header">
        {/* FIX: Removed LaTeX syntax from the H1 tag */}
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
          {/* FIX: Cleaned up the H2 tag */}
          <h2>🧠 P-CACC: The A, B, C Priorities After ROSC</h2>
          <p>
            Achieving ROSC is only the first step. Post-cardiac arrest care determines neurological outcome. Care is focused on three main areas: Airway/Breathing, Circulation, and Targeted Temperature Management (TTM).
          </p>
          
          
          <div className="key-terms-box">
            <h3>A & B: Airway and Breathing Management</h3>
            <ul className="clinical-list">
                <li><span style={{fontWeight: 'bold'}}>Oxygenation:</span> Maintain O₂ saturation ≥ 94%. Avoid hyperoxia (O₂ sat > 98%).</li>
                {/* FIX: Removed LaTeX commands from the text */}
                <li><span style={{fontWeight: 'bold'}}>Ventilation/CO₂:</span> Maintain ETCO₂ (End-Tidal CO₂) in the range of 35–45 mmHg to prevent cerebral vasoconstriction/vasodilation.</li>
            </ul>
          </div>

          <div className="key-terms-box">
            <h3>C: Circulation Management (Perfusion)</h3>
            <ul className="clinical-list">
                {/* FIX: Removed LaTeX commands from the text */}
                <li><span style={{fontWeight: 'bold'}}>Hypotension Target:</span> Maintain SBP ≥ 90 mmHg or MAP ≥ 65 mmHg.</li>
                {/* FIX: Removed LaTeX commands from the text */}
                <li><span style={{fontWeight: 'bold'}}>Fluid/Vasoactive Drugs:</span> Initiate IV fluid bolus (1–2 L normal saline) followed by vasopressors (Norepinephrine or Dopamine) to meet BP goals.</li>
                {/* FIX: Removed LaTeX commands from the text */}
                <li><span style={{fontWeight: 'bold'}}>PCI Indication:</span> Perform immediate coronary angiography/percutaneous coronary intervention (PCI) for suspected STEMI or unstable non-STEMI.</li>
            </ul>
          </div>
        </section>

        <section className="ttm-review">
          <h2>🌡️ Targeted Temperature Management (TTM)</h2>
          <p>
            TTM is initiated for comatose patients (GCS < 8) after ROSC to improve neurological recovery.
          </p>
          <ul className="clinical-list">
            {/* FIX: Removed LaTeX commands from the text */}
            <li><span style={{fontWeight: 'bold'}}>Target Temperature:</span> Maintain a target temperature of 32–36°C for at least 24 hours.</li>
            <li><span style={{fontWeight: 'bold'}}>Method:</span> Use external cooling blankets or intravenous cold fluids.</li>
            <li><span style={{fontWeight: 'bold'}}>Monitoring:</span> Continuous core temperature monitoring (e.g., esophageal or bladder probe) is required.</li>
          </ul>
        </section>
      </div>

      <footer className="doc-footer">
        <p>You have successfully completed the core Cardiac Arrest Simulations (Recognition, VF Management, and P-CACC).</p>
        <button 
            className="next-sim-btn" 
            onClick={() => onNavigate('home')}
        >
            Return to Home &rarr;
        </button>
      </footer>
    </div>
  );
};

export default PostArrestDocumentation;