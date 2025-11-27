import React from 'react';
import '../Css files/CardiacDocumentation.css';

const CardiacDocumentation = ({ onNavigate }) => {
  return (
    <div className="documentation-page">
      <header className="doc-header">
        <h1>Post-Simulation Review: Cardiac Arrest Documentation</h1>
        <button 
            className="skip-btn" 
            onClick={() => onNavigate('simulation2-intro')}
        >
            Skip to Simulation 2 &rarr;
        </button>
      </header>
      
      <div className="doc-content">
        <section className="pathophysiology-review">
          <h2>🧠 Pathophysiology and Distinction</h2>
          <p>
            <span style={{fontWeight: 'bold'}}>Cardiac arrest (CA)</span> is the sudden, unexpected loss of heart function, breathing, and consciousness. It is a state of <span style={{fontWeight: 'bold'}}>cessation of cardiac mechanical activity</span>.
          </p>
          <p>
            The critical skill in Simulation 1 was differentiation:
            <ul>
              <li> <span style={{fontWeight: 'bold'}}>Cardiac Arrest (CA):</span> An electrical failure leading to absent pulse. Priority: C-A-B (Compressions, Airway, Breathing) and Defibrillation.</li>
              <li> <span style={{fontWeight: 'bold'}}>Myocardial Infarction (MI):</span> A circulation problem (clot) that may or may not lead to CA. Priority: MONA (Morphine, Oxygen, Nitroglycerin, Aspirin).</li>
            </ul>
          </p>
          <div className="key-terms-box">
            <h3>Rhythm Review</h3>
            <p>
              The advanced life support (ACLS) protocol hinges on the initial rhythm identification. 
              <br/>
              <span style={{fontWeight: 'bold'}}>Shockable:</span> Ventricular Fibrillation ($VF$) and Pulseless Ventricular Tachycardia ($pVT$). Requires immediate counter-shock (defibrillation) to reset the electrical system.
              <br/>
              <span style={{fontWeight: 'bold'}}>Non-Shockable:</span> Asystole (flatline) and Pulseless Electrical Activity ($PEA$). Requires high-quality CPR and pharmacological intervention (e.g., Epinephrine).
            </p>
          </div>
        </section>

        <section className="assessment-findings">
          <h2>📋 Clinical Assessment & The 5 P's of Cardiopulmonary Failure</h2>
          <p>
            For appropriate documentation, the nurse must quickly confirm the following absence of signs, indicating catastrophic failure.
          </p>
          <ul className="clinical-list">
            <li><span style={{fontWeight: 'bold'}}>Pulse: Absent</span> (Checked at the carotid site for 5-10 seconds). Document the exact time the pulse was confirmed absent.</li>
            <li><span style={{fontWeight: 'bold'}}>Pressure (BP): Unobtainable</span> (Automated cuffs will often read 'Error' or 0/0).</li>
            <li><span style={{fontWeight: 'bold'}}>Pain/Response:</span> Patient is completely <span style={{fontWeight: 'bold'}}>Unresponsive</span> (GCS $\le 3$).</li>
            <li><span style={{fontWeight: 'bold'}}>Perfusion/Skin:</span> Skin color is often <span style={{fontWeight: 'bold'}}>Cyanotic</span> (dusky/blue) due to deoxygenated blood pooling, or extremely <span style={{fontWeight: 'bold'}}>Pale/Mottled</span> due to lack of circulation.</li>
            <li><span style={{fontWeight: 'bold'}}>Pupils:</span> Often <span style={{fontWeight: 'bold'}}>Fixed</span> and <span style={{fontWeight: 'bold'}}>Dilated</span> (A late, ominous sign).</li>
          </ul>
        </section>

        <section className="documentation-checklist">
          <h2>✍️ Nursing Documentation Checklist (The "Code Log")</h2>
          <p>The code documentation must be a chronological and precise record of the event, ensuring legal defensibility and quality review:</p>
          <div className="log-table-container">
            <table>
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Documentation Required</th>
                  <th>Clinical Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Arrest Confirmed</td>
                  <td>Date and Time (e.g., 10:02 AM)</td>
                  <td>"Patient unresponsive, apneic, no palpable carotid pulse."</td>
                </tr>
                <tr>
                  <td>Code Activated</td>
                  <td>Time (e.g., 10:03 AM)</td>
                  <td>The moment the Code Blue alert was initiated.</td>
                </tr>
                <tr>
                  <td>CPR Start</td>
                  <td>Time (10:03 AM) & Quality</td>
                  <td>Depth/Rate adherence (e.g., "High-quality CPR initiated at 10:03 AM by RN Smith.")</td>
                </tr>
                <tr>
                  <td>Defibrillation</td>
                  <td>Time, Energy Level (J or kJ), Rhythm</td>
                  <td>Example: "Defibrillation delivered at 200 J for $VF$."</td>
                </tr>
                <tr>
                  <td>Medications</td>
                  <td>Time, Drug, Dose (mg or mcg), Route (IV or IO)</td>
                  <td>Example: "Epinephrine 1 mg IV push given at 10:05 AM."</td>
                </tr>
                <tr>
                  <td>ROSC</td>
                  <td>Time, Post-ROSC BP and HR</td>
                  <td>Time of Return of Spontaneous Circulation.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <footer className="doc-footer">
        <p>You have successfully reviewed the core documentation principles. Ready for the next challenge?</p>
        <button 
            className="next-sim-btn" 
            onClick={() => onNavigate('simulation2-intro')}
        >
            Proceed to Simulation 2: Rhythm Management &rarr;
        </button>
      </footer>
    </div>
  );
};

export default CardiacDocumentation;