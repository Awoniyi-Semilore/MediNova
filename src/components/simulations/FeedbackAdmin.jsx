import React, { useState, useEffect } from 'react';

const FeedbackAdmin = ({ onNavigate }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [filter, setFilter] = useState('all');

  const ADMIN_PASSWORD = 'MediNova2024'; // Change this to a secure password

  useEffect(() => {
    if (isAuthenticated) {
      const storedFeedbacks = JSON.parse(localStorage.getItem('simulationFeedbacks') || '[]');
      setFeedbacks(storedFeedbacks);
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
    setPassword('');
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (filter === 'all') return true;
    return feedback.simulationType.toLowerCase().includes(filter.toLowerCase());
  });

  const exportToCSV = () => {
    const headers = ['Name', 'Field', 'Email', 'Rating', 'Feedback', 'Simulation', 'Date'];
    const csvData = filteredFeedbacks.map(fb => [
      fb.name,
      fb.field,
      fb.email,
      fb.rating,
      `"${fb.feedback.replace(/"/g, '""')}"`,
      fb.simulationType,
      new Date(fb.timestamp).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `simulation-feedbacks-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-card">
          <h2>Feedback Admin Access</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>
            <button type="submit" className="btn-primary">Access Feedback</button>
          </form>
          <button 
            className="back-btn"
            onClick={() => onNavigate('home')}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-admin">
      <header className="admin-header">
        <h1>Simulation Feedback Dashboard</h1>
        <div className="admin-actions">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Simulations</option>
            <option value="cardiac">Cardiac Only</option>
            <option value="respiratory">Respiratory Only</option>
          </select>
          <button onClick={exportToCSV} className="export-btn">
            📊 Export CSV
          </button>
          <button 
            onClick={() => onNavigate('home')}
            className="back-btn"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      <div className="feedback-stats">
        <div className="stat-card">
          <h3>Total Feedbacks</h3>
          <p className="stat-number">{feedbacks.length}</p>
        </div>
        <div className="stat-card">
          <h3>Average Rating</h3>
          <p className="stat-number">
            {feedbacks.length > 0 
              ? (feedbacks.reduce((sum, fb) => sum + parseInt(fb.rating), 0) / feedbacks.length).toFixed(1)
              : '0.0'
            }/5
          </p>
        </div>
      </div>

      <div className="feedbacks-list">
        {filteredFeedbacks.length === 0 ? (
          <div className="no-feedback">
            <p>No feedback submissions yet.</p>
          </div>
        ) : (
          filteredFeedbacks.map(feedback => (
            <div key={feedback.id} className="feedback-item">
              <div className="feedback-header">
                <div className="feedback-meta">
                  <strong>{feedback.name}</strong>
                  <span className="field">{feedback.field}</span>
                  <span className="simulation-type">{feedback.simulationType}</span>
                </div>
                <div className="feedback-rating">
                  {'★'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}
                </div>
              </div>
              <p className="feedback-text">{feedback.feedback}</p>
              <div className="feedback-footer">
                <span className="email">{feedback.email}</span>
                <span className="timestamp">
                  {new Date(feedback.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackAdmin;