import React from 'react';

function Popup({ type = 'info', title, message, onConfirm, onCancel, showCancel = false }) {
  const getPopupClass = () => {
    switch (type) {
      case 'success': return 'popup-success';
      case 'error': return 'popup-error';
      case 'warning': return 'popup-warning';
      default: return 'popup-info';
    }
  };

  return (
    <div className="popup-overlay">
      <div className={`popup ${getPopupClass()}`}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="popup-buttons">
          <button className="btn btn-primary" onClick={onConfirm}>
            Continue
          </button>
          {showCancel && (
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Popup;