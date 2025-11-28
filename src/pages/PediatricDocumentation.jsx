import React from 'react';
import Header from '../components/UI/Header';

function PediatricDocumentation({ navigateTo, currentUser }) {
  const handleLogout = async () => {
    navigateTo('landing');
  };

  return (
    <div className="documentation-container">
      <Header onLogout={handleLogout} />
      
      <main className="documentation-content">
        <h1>Pediatric Respiratory Distress: Documentation & Clinical Review</h1>
        
        <section className="doc-section">
          <h2>Pathophysiology</h2>
          <p>Pediatric respiratory distress involves increased work of breathing and potential respiratory failure. Children have smaller airways, making them more susceptible to obstruction from inflammation, secretions, or foreign bodies.</p>
          
          <h3>Common Pediatric Respiratory Conditions:</h3>
          <ul>
            <li><strong>Asthma/Bronchiolitis:</strong> Airway inflammation and bronchospasm</li>
            <li><strong>Croup:</strong> Upper airway obstruction from vocal cord swelling</li>
            <li><strong>Epiglottitis:</strong> Medical emergency with potential complete airway obstruction</li>
            <li><strong>Pneumonia:</strong> Lower respiratory tract infection</li>
          </ul>
        </section>

        <section className="doc-section">
          <h2>Key Assessment Findings (Pediatric Specific)</h2>
          <div className="assessment-grid">
            <div className="assessment-item">
              <h4>Respiratory Rate</h4>
              <p className="critical-finding">Tachypnea for age</p>
            </div>
            <div className="assessment-item">
              <h4>Work of Breathing</h4>
              <p>Nasal flaring, retractions</p>
            </div>
            <div className="assessment-item">
              <h4>Air Movement</h4>
              <p>Wheezing, stridor, grunting</p>
            </div>
            <div className="assessment-item">
              <h4>Mental Status</h4>
              <p>Irritability or lethargy</p>
            </div>
            <div className="assessment-item">
              <h4>Color</h4>
              <p>Pallor or cyanosis</p>
            </div>
          </div>
        </section>

        <section className="doc-section">
          <h2>Pediatric Assessment Triangle (PAT)</h2>
          <div className="assessment-grid">
            <div className="assessment-item">
              <h4>Appearance</h4>
              <p>Muscle tone, interactiveness, consolability</p>
            </div>
            <div className="assessment-item">
              <h4>Work of Breathing</h4>
              <p>Abnormal sounds, positioning, retractions</p>
            </div>
            <div className="assessment-item">
              <h4>Circulation</h4>
              <p>Skin color, pallor, mottling</p>
            </div>
          </div>
        </section>

        <section className="doc-section">
          <h2>Correct Choice Analysis</h2>
          
          <div className="choice-analysis">
            <h3>Question 1: Initial Pediatric Assessment</h3>
            <p><strong>Correct Choice:</strong> Use Pediatric Assessment Triangle (PAT)</p>
            <p><strong>Rationale:</strong> PAT provides rapid global assessment of pediatric patients without touching them first, identifying critically ill children quickly.</p>
            
            <h3>Question 2: Respiratory Distress Signs</h3>
            <p><strong>Correct Choice:</strong> Nasal flaring and intercostal retractions</p>
            <p><strong>Rationale:</strong> These are classic signs of increased work of breathing in pediatric patients with smaller, more compliant chest walls.</p>
            
            <h3>Question 3: Emergency Intervention</h3>
            <p><strong>Correct Choice:</strong> Administer supplemental oxygen</p>
            <p><strong>Rationale:</strong> Oxygen is first-line treatment for respiratory distress while preparing for further interventions.</p>
          </div>
        </section>

        <section className="doc-section">
          <h2>Nursing Documentation Requirements</h2>
          <div className="checklist">
            <h3>Pediatric-Specific Documentation:</h3>
            <ul>
              <li>Respiratory rate and effort</li>
              <li>Presence of retractions/nasal flaring</li>
              <li>Breath sounds and adventitious sounds</li>
              <li>Oxygen saturation levels</li>
              <li>Mental status and consolability</li>
              <li>Parental concerns and history</li>
              <li>Weight-based medication calculations</li>
            </ul>
          </div>
        </section>

        <div className="navigation-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => navigateTo('home')}
          >
            Back to Simulations
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => navigateTo('pediatric-simulation2')}
          >
            Continue to Simulation 2
          </button>
        </div>
      </main>
    </div>
  );
}

export default PediatricDocumentation;