import React from 'react';
import './Css files/ActionModal.css';

/**
 * ActionModal is used for presenting. scenario context and multiple-choice options.
 * It replaces the simple, timed Popup for interactive decision points.
 * * @param {boolean} show - Whether the modal is visible.
 * @param {string} title - Title of the prompt (e.g., 'Initial Assessment').
 * @param {string} message - The main story and observation text.
 * @param {string} type - 'blue' (Prompt), 'pink' (Critical), 'red' (Fail/Urgency), 'green' (Pass/Success).
 * @param {Array<Object>} options - Array of { text, nextStep, isCorrect } objects.
 * @param {Function} onSelect - Handler for option selection.
 * @param {boolean} showActionsOnly - If true, displays only the standard buttons (for Pass/Fail).
 * @param {Function} onConfirm - Handler for the confirm button (used in Pass/Fail states).
 * @param {string} confirmText - Text for the confirm button.
 */
const ActionModal = ({
  show,
  title,
  message,
  type = 'blue',
  options,
  onSelect,
  showActionsOnly = false,
  onConfirm,
  confirmText = 'Continue'
}) => {
  if (!show) return null;

  const modalClass = `action-modal-content action-modal-${type}`;

  return (
    <div className="action-modal-overlay">
      <div className={modalClass}>
        <div className="action-modal-header">
          <h3 className="action-modal-title">{title}</h3>
        </div>
        <div className="action-modal-body">
          <p className="action-modal-message" dangerouslySetInnerHTML={{ __html: message }}></p>
        </div>

        <div className="action-modal-actions">
          {showActionsOnly ? (
            // For simple Pass/Fail states (confirm only)
            <button className={`action-btn action-btn-${type}`} onClick={onConfirm}>
              {confirmText}
            </button>
          ) : (
            // For scenario decision points (multiple choices)
            options && options.map((option, index) => (
              <button
                key={index}
                className="action-option-btn"
                onClick={() => onSelect(option)}
              >
                {option.text}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionModal;