import React from 'react'
import '../App.css'

const CardiacDocumentation = ({ onNavigate, user }) => {
  const nurseName = user?.displayName?.split(' ')[0] || 'Nurse'

  const learningObjectives = [
    {
      title: "Cardiac Arrest Recognition",
      items: [
        "Identify unresponsiveness and absence of normal breathing",
        "Recognize agonal breathing as a sign of cardiac arrest",
        "Perform rapid pulse check (carotid artery, 5-10 seconds)",
        "Differentiate between syncope and cardiac arrest"
      ]
    },
    {
      title: "Initial Emergency Response",
      items: [
        "Follow ABC (Airway, Breathing, Circulation) sequence",
        "Activate emergency response system immediately",
        "Apply high-flow oxygen for patients in distress",
        "Initiate cardiac monitoring for chest pain patients"
      ]
    },
    {
      title: "Basic Life Support (BLS)",
      items: [
        "Perform high-quality chest compressions (100-120/min)",
        "Minimize interruptions in CPR (<10 seconds)",
        "Coordinate with arriving emergency team",
        "Use AED/defibrillator appropriately"
      ]
    },
    {
      title: "Team Coordination",
      items: [
        "Clear communication during emergency",
        "Assign specific roles to team members",
        "Maintain situational awareness",
        "Document events and interventions"
      ]
    }
  ]

  const keyTakeaways = [
    {
      point: "Time is Muscle",
      explanation: "Every minute without CPR reduces survival by 7-10%. Early intervention is critical."
    },
    {
      point: "ABC Priority",
      explanation: "Airway, Breathing, Circulation sequence ensures systematic assessment and intervention."
    },
    {
      point: "Quality CPR Matters",
      explanation: "Proper depth, rate, and full chest recoil significantly impact outcomes."
    },
    {
      point: "Early Defibrillation",
      explanation: "For shockable rhythms, defibrillation within 3-5 minutes dramatically improves survival."
    }
  ]

  return (
    <div className="documentation-page">
      <header className="doc-header">
        <div className="doc-header-content">
          <button 
            className="back-doc-btn"
            onClick={() => onNavigate('home')}
          >
            ← Back to Dashboard
          </button>
          <div className="doc-header-info">
            <h1>Simulation 1: Learning Materials</h1>
            <p>Cardiac Emergency Recognition & Initial Response</p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => onNavigate('cardiac-simulation')}
          >
            🔄 Retry Simulation
          </button>
        </div>
      </header>

      <div className="doc-content">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-card">
            <h2>Congratulations, {nurseName}! 🎉</h2>
            <p>You've completed Simulation 1. Let's review what you've learned about cardiac emergency response.</p>
            <div className="completion-badge">
              <span>SIMULATION 1 COMPLETE</span>
            </div>
          </div>
        </section>

        {/* Learning Objectives */}
        <section className="objectives-section">
          <h2>Learning Objectives Achieved</h2>
          <div className="objectives-grid">
            {learningObjectives.map((objective, index) => (
              <div key={index} className="objective-card">
                <h3>{objective.title}</h3>
                <ul>
                  {objective.items.map((item, itemIndex) => (
                    <li key={itemIndex}>✓ {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="takeaways-section">
          <h2>Key Clinical Takeaways</h2>
          <div className="takeaways-list">
            {keyTakeaways.map((takeaway, index) => (
              <div key={index} className="takeaway-card">
                <div className="takeaway-header">
                  <span className="takeaway-number">{index + 1}</span>
                  <h4>{takeaway.point}</h4>
                </div>
                <p>{takeaway.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Response Algorithm */}
        <section className="algorithm-section">
          <h2>Cardiac Emergency Response Algorithm</h2>
          <div className="algorithm-flow">
            <div className="algorithm-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Scene Safety & Assessment</h4>
                <p>Ensure safety → Check responsiveness → Shout for help</p>
              </div>
            </div>
            <div className="step-arrow">↓</div>
            <div className="algorithm-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>ABC Assessment</h4>
                <p>Airway → Breathing → Circulation → Activate emergency response</p>
              </div>
            </div>
            <div className="step-arrow">↓</div>
            <div className="algorithm-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>CPR & Defibrillation</h4>
                <p>Start high-quality CPR → Apply AED/defibrillator → Minimize interruptions</p>
              </div>
            </div>
            <div className="step-arrow">↓</div>
            <div className="algorithm-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Advanced Care</h4>
                <p>Team coordination → Advanced airways → Medications → Post-resuscitation care</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes to Avoid */}
        <section className="mistakes-section">
          <h2>Common Mistakes in Cardiac Emergency Response</h2>
          <div className="mistakes-list">
            <div className="mistake-item">
              <span className="mistake-icon">❌</span>
              <div className="mistake-content">
                <h4>Delaying CPR for pulse check</h4>
                <p>Pulse checks should be brief (5-10 seconds). Start CPR immediately if no definite pulse.</p>
              </div>
            </div>
            <div className="mistake-item">
              <span className="mistake-icon">❌</span>
              <div className="mistake-content">
                <h4>Inadequate compression depth</h4>
                <p>Compressions should be 2-2.4 inches deep for adults. Shallow compressions are ineffective.</p>
              </div>
            </div>
            <div className="mistake-item">
              <span className="mistake-icon">❌</span>
              <div className="mistake-content">
                <h4>Prolonged interruptions</h4>
                <p>Keep interruptions under 10 seconds. Every pause reduces coronary perfusion pressure.</p>
              </div>
            </div>
            <div className="mistake-item">
              <span className="mistake-icon">❌</span>
              <div className="mistake-content">
                <h4>Failure to use AED promptly</h4>
                <p>Apply AED as soon as available. Early defibrillation is key for shockable rhythms.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="next-steps-section">
          <div className="next-steps-card">
            <h3>Ready for the Next Challenge?</h3>
            <p>You've mastered the initial response to cardiac emergencies. In Simulation 2, you'll learn advanced interventions and team leadership.</p>
            <div className="next-steps-actions">
              <button className="btn btn-outline" onClick={() => onNavigate('cardiac-simulation')}>
                🔄 Practice Simulation 1 Again
              </button>
              <button className="btn btn-primary" disabled>
                Simulation 2 - Coming Soon
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CardiacDocumentation