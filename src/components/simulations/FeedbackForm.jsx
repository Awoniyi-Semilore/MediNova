import React, { useState, useEffect } from 'react';

const FeedbackForm = ({ simulationType, onClose, trigger = 'manual' }) => {
  const [formData, setFormData] = useState({
    name: '',
    field: '',
    email: '',
    feedback: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAutoPopup, setShowAutoPopup] = useState(false);

  const fields = [
    'Medical Student',
    'Nursing Student',
    'Registered Nurse',
    'Physician',
    'Instructor',
    'Resident',
    'Other Healthcare Professional'
  ];

  // Auto-show popup 5 seconds after component mounts if trigger is 'auto'
  useEffect(() => {
    if (trigger === 'auto') {
      const timer = setTimeout(() => {
        setShowAutoPopup(true);
      }, 5000); // 5 seconds delay
      
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const feedbacks = JSON.parse(localStorage.getItem('simulationFeedbacks') || '[]');
      const newFeedback = {
        ...formData,
        simulationType,
        timestamp: new Date().toISOString(),
        id: Date.now()
      };
      
      feedbacks.push(newFeedback);
      localStorage.setItem('simulationFeedbacks', JSON.stringify(feedbacks));

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto popup modal
  if (trigger === 'auto' && showAutoPopup && !isSubmitted) {
    return (
      <div className="feedback-auto-popup">
        <div className="popup-content">
          <h3>Help Us Improve! 🎯</h3>
          <p>Would you like to provide feedback on the {simulationType} simulation?</p>
          <div className="popup-buttons">
            <button 
              className="popup-btn primary"
              onClick={() => setShowAutoPopup(false)}
            >
              Give Feedback
            </button>
            <button 
              className="popup-btn secondary"
              onClick={() => {
                setShowAutoPopup(false);
                onClose();
              }}
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="feedback-overlay">
        <div className="feedback-card success">
          <div className="success-icon">✅</div>
          <h3>Thank You!</h3>
          <p>Your feedback has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-overlay">
      <div className="feedback-card">
        <div className="feedback-header">
          <h2>Simulation Feedback</h2>
          <p>Help us improve the {simulationType} simulation</p>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="field">Professional Field *</label>
            <select
              id="field"
              name="field"
              value={formData.field}
              onChange={handleChange}
              required
            >
              <option value="">Select your field</option>
              {fields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Overall Rating *</label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map(star => (
                <React.Fragment key={star}>
                  <input
                    type="radio"
                    id={`star${star}`}
                    name="rating"
                    value={star}
                    checked={formData.rating === star}
                    onChange={handleChange}
                  />
                  <label htmlFor={`star${star}`}>★</label>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="feedback">Your Feedback *</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
              placeholder="What did you like about the simulation? What could be improved?"
              rows="5"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;