import React from 'react';
import '../Css files/CardiacDocumentation.css'; // Reusing styles

const RhythmDocumentation = ({ onNavigate }) => {
  return (
    <div className="documentation-page">
      <header className="doc-header">
        <h1>Post-Simulation Review: ACLS and Rhythm Management</h1>
        <button 
            className="skip-btn" 
            onClick={() => onNavigate('home')}
        >
            Return to Home &rarr;
        </button>
      </header>
      
      <div className="doc-content">
        <section className="acls-review">
          <h2>🧠 ACLS Algorithm Review</h2>
          <p>
            The two main branches of the ACLS Cardiac Arrest Algorithm are based on the initial rhythm:
          </p>
          
          <div className="key-terms-box">
            <h3>Shockable Rhythms ($VF$/$pVT$)</h3>
            <p>
              Requires immediate defibrillation. If no $ROSC$, the cycle continues with 2 minutes of $CPR$ and drug administration.
            </p>
            <ul className="clinical-list">
                <li><span style={{fontWeight: 'bold'}}>Shock 1:</span> Immediate (200J, Biphasic).</li>
                <li><span style={{fontWeight: 'bold'}}>Post-Shock:</span> 2 minutes $CPR$ immediately (do NOT check pulse).</li>
                <li><span style={{fontWeight: 'bold'}}>Medication Cycle 1:</span> Epinephrine 1 mg IV/IO.</li>
                <li><span style={{fontWeight: 'bold'}}>Shock 2:</span> Repeat shock (200J+).</li>
                <li><span style={{fontWeight: 'bold'}}>Medication Cycle 2:</span> Amiodarone 300 mg IV/IO (or Lidocaine).</li>
            </ul>
            [Image of ACLS Cardiac Arrest Algorithm]
          </div>

          <div className="key-terms-box">
            <h3>Non-Shockable Rhythms (Asystole/$PEA$)</h3>
            <p>
              Requires high-quality $CPR$ and identification/treatment of underlying causes (H's and T's). Defibrillation is ineffective.
            </p>
            <ul className="clinical-list">
                <li><span style={{fontWeight: 'bold'}}>Action:</span> Immediate $CPR$ for 2 minutes.</li>
                <li><span style={{fontWeight: 'bold'}}>Medication Cycle 1:</span> Epinephrine 1 mg IV/IO (as soon as IV/IO access is available).</li>
                <li><span style={{fontWeight: 'bold'}}>Repeat:</span> Re-assess rhythm (no pulse check unless $ROSC$). Continue $CPR$/Epi every 3-5 minutes.</li>
            </ul>
          </div>
        </section>

        <section className="hs-and-ts">
          <h2>💊 5 H's and 5 T's (Reversible Causes)</h2>
          <p>
            Documentation of attempts to identify and treat reversible causes is critical. The "H's and T's" should be considered during every $CPR$ cycle.
          </p>
          <div style={{display: 'flex', gap: '2rem'}}>
            <ul style={{flex: 1}}>
              <span style={{fontWeight: 'bold', fontSize: '1.1rem'}}>H's (Hypovolemia, Hypoxia, etc.)</span>
              <li><span style={{fontWeight: 'bold'}}>Hypovolemia:</span> Look for blood loss, administer fluids/blood.</li>
              <li><span style={{fontWeight: 'bold')}>Hypoxia:</span> Ensure patent airway, check oxygen saturation.</li>
              <li><span style={{fontWeight: 'bold'}}>Hydrogen Ion (Acidosis):</span> Hyperventilation, Bicarb administration.</li>
              <li><span style={{fontWeight: 'bold'}}>Hypo/Hyperkalemia:</span> Check electrolytes, administer D50/Insulin or Calcium.</li>
              <li><span style={{fontWeight: 'bold'}}>Hypothermia:</span> Warming measures.</li>
            </ul>
            <ul style={{flex: 1}}>
              <span style={{fontWeight: 'bold', fontSize: '1.1rem'}}>T's (Tension Pneumothorax, Tamponade, etc.)</span>
              <li><span style={{fontWeight: 'bold'}}>Tension Pneumothorax:</span> Needle decompression.</li>
              <li><span style={{fontWeight: 'bold')}>Tamponade (Cardiac):</span> Pericardiocentesis.</li>
              <li><span style={{fontWeight: 'bold'}}>Toxins:</span> Consider antidote, call Poison Control.</li>
              <li><span style={{fontWeight: 'bold'}}>Thrombosis (Pulmonary or Coronary):</span> Consider Fibrinolytics (for confirmed PE).</li>
              <li><span style={{fontWeight: 'bold'}}>Trauma:</span> Treat injuries (Bleeding, Spleen Rupture, etc.).</li>
            </ul>
          </div>
        </section>
      </div>

      <footer className="doc-footer">
        <p>You have successfully mastered the initial ACLS management phase. Ready to return to the main training menu?</p>
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

export default RhythmDocumentation;