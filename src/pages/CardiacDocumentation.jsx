import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/UI/Header';
import { useAuth } from '../contexts/AuthContext';

function CardiacDocumentation() {
  const navigate = useNavigate();
  const { logout } = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="documentation-container">
      <Header onLogout={handleLogout} />
      
      <main className="documentation-content">
        <h1>Cardiac Arrest: Documentation & Clinical Review</h1>
        
        <section className="doc-section">
          <h2>Pathophysiology</h2>
          <p>Cardiac arrest represents the abrupt cessation of cardiac mechanical activity, resulting in no effective circulation. This is distinct from myocardial infarction (heart attack) which involves coronary artery blockage but may not necessarily lead to arrest.</p>
          
          <h3>Rhythm Identification:</h3>
          <ul>
            <li><strong>Shockable Rhythms:</strong> Ventricular Fibrillation (VF), Pulseless Ventricular Tachycardia (pVT)</li>
            <li><strong>Non-Shockable Rhythms:</strong> Asystole, Pulseless Electrical Activity (PEA)</li>
          </ul>
        </section>

        <section className="doc-section">
          <h2>Key Assessment Findings (The 5 P's)</h2>
          <div className="assessment-grid">
            <div className="assessment-item">
              <h4>Pulse</h4>
              <p className="critical-finding">Absent (Carotid/Femoral)</p>
            </div>
            <div className="assessment-item">
              <h4>Pressure</h4>
              <p className="critical-finding">Unobtainable</p>
            </div>
            <div className="assessment-item">
              <h4>Pupils</h4>
              <p>Dilated and Fixed (late sign)</p>
            </div>
            <div className="assessment-item">
              <h4>Pain/Response</h4>
              <p className="critical-finding">Unresponsive</p>
            </div>
            <div className="assessment-item">
              <h4>Perfusion</h4>
              <p>Pale, Cool, Cyanotic</p>
            </div>
          </div>
        </section>

        <section className="doc-section">
          <h2>Correct Choice Analysis</h2>
          
          <div className="choice-analysis">
            <h3>Question 1: Immediate Action</h3>
            <p><strong>Correct Choice:</strong> Assess responsiveness & check breathing</p>
            <p><strong>Rationale:</strong> Follows CAB approach - immediate recognition of cardiac arrest begins with assessing responsiveness and breathing pattern.</p>
            
            <h3>Question 2: Critical Next Step</h3>
            <p><strong>Correct Choice:</strong> Check carotid pulse for no more than 10 seconds</p>
            <p><strong>Rationale:</strong> Rapid pulse check confirms cardiac arrest. Limiting to 10 seconds prevents delays in CPR initiation.</p>
            
            <h3>Question 3: Definitive Action</h3>
            <p><strong>Correct Choice:</strong> Activate emergency response system/call Code Blue</p>
            <p><strong>Rationale:</strong> Early activation of emergency response while beginning CPR follows chain of survival principles.</p>
          </div>
        </section>

        <section className="doc-section">
          <h2>Nursing Documentation Requirements</h2>
          <div className="checklist">
            <h3>Time-Stamped Events:</h3>
            <ul>
              <li>Time of unresponsiveness identified</li>
              <li>Time emergency response activated</li>
              <li>Time CPR initiated</li>
              <li>Initial rhythm on monitor/AED</li>
              <li>Time of first defibrillation (if applicable)</li>
              <li>Medications administered with times</li>
              <li>Return of spontaneous circulation (ROSC) time</li>
            </ul>
          </div>
        </section>

        <div className="navigation-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/home')}
          >
            Back to Simulations
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/cardiac-simulation2')}
          >
            Continue to Simulation 2
          </button>
        </div>
      </main>
    </div>
  );
}

export default CardiacDocumentation;