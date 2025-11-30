import React from 'react';

const RespiratoryDocumentation3 = ({ onNavigate }) => {
  return (
    <div className="documentation-page">
      <header className="doc-header">
        <h1>Pediatric Respiratory: Advanced Management Review</h1>
        <button className="skip-btn" onClick={() => onNavigate('home')}>
          Return to Home &rarr;
        </button>
      </header>
      
      <div className="doc-content">
        <section className="escalation-protocols">
          <h2>🚨 Treatment Escalation</h2>
          <div className="key-terms-box">
            <h3>Status Asthmaticus Management</h3>
            <ul className="clinical-list">
              <li><strong>Continuous Nebulizers:</strong> Albuterol 10-15mg/hour when intermittent therapy fails</li>
              <li><strong>Adjunct Therapy:</strong> Ipratropium bromide 0.5mg added to albuterol nebulizers</li>
              <li><strong>IV Magnesium:</strong> 25-75mg/kg (max 2g) for severe exacerbations unresponsive to initial therapy</li>
              <li><strong>ICU Transfer:</strong> Required for continuous therapy or impending respiratory failure</li>
            </ul>
          </div>
        </section>

        <section className="critical-care">
          <h2>⚡️ Critical Interventions</h2>
          <div className="key-terms-box">
            <h3>Signs of Impending Respiratory Failure</h3>
            <ul className="clinical-list">
              <li><strong>Silent Chest:</strong> Absence of wheezing due to minimal air movement</li>
              <li><strong>Altered Mental Status:</strong> Confusion, lethargy, or agitation from hypoxia</li>
              <li><strong>Cyanosis:</strong> Bluish discoloration despite oxygen therapy</li>
              <li><strong>Respiratory Fatigue:</strong> Decreasing respiratory rate after initial tachypnea</li>
            </ul>
          </div>
        </section>
      </div>

      <footer className="doc-footer">
        <p>Congratulations! You have completed all three pediatric respiratory distress simulations.</p>
        <button className="next-sim-btn" onClick={() => onNavigate('home')}>
          Return to Training Menu &rarr;
        </button>
      </footer>
    </div>
  );
};

export default RespiratoryDocumentation3;