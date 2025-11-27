import React from 'react'
import './Confirmpopup.css'

const ConfirmPopup = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null

  return (
    <div className="confirm-popup-overlay">
      <div className="confirm-popup">
        <div className="confirm-popup-header">
          <span className="confirm-popup-icon">⚠️</span>
          <h3>{title}</h3>
        </div>
        <div className="confirm-popup-body">
          <p>{message}</p>
        </div>
        <div className="confirm-popup-actions">
          <button className="btn btn-outline confirm-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary confirm-ok" onClick={onConfirm}>
            Yes, Go Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmPopup