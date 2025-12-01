import React, { useEffect, useState } from 'react';

const FeedbackAnalytics = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('simulationFeedbacks') || '[]');
    setFeedbacks(stored);
    
    if (stored.length > 0) {
      const cardiac = stored.filter(f => f.simulationType.includes('Cardiac')).length;
      const respiratory = stored.filter(f => f.simulationType.includes('Respiratory')).length;
      const avgRating = (stored.reduce((sum, f) => sum + parseFloat(f.rating), 0) / stored.length).toFixed(1);
      
      setStats({
        total: stored.length,
        cardiac,
        respiratory,
        avgRating,
        latest: stored.slice(-5).reverse()
      });
    }
  }, []);

  if (!stats) {
    return (
      <div className="analytics-empty">
        <p>No feedback data available yet.</p>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard">
      <h2>Feedback Analytics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Feedback</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Cardiac Simulations</h3>
          <p className="stat-number">{stats.cardiac}</p>
        </div>
        <div className="stat-card">
          <h3>Respiratory Simulations</h3>
          <p className="stat-number">{stats.respiratory}</p>
        </div>
        <div className="stat-card">
          <h3>Average Rating</h3>
          <p className="stat-number">{stats.avgRating}/5</p>
        </div>
      </div>
      
      <div className="latest-feedbacks">
        <h3>Latest Feedback</h3>
        {stats.latest.map(fb => (
          <div key={fb.id} className="feedback-preview">
            <span className="sim-type">{fb.simulationType}</span>
            <span className="rating">{"★".repeat(fb.rating)}</span>
            <p className="preview-text">{fb.feedback.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackAnalytics;