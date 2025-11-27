import React, { useEffect } from 'react'
import './Popup.css'

const Popup = ({ message, type = 'error', onClose, show }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className={`popup-overlay ${show ? 'popup-show' : ''}`}>
      <div className={`popup popup-${type}`}>
        <div className="popup-content">
          <span className="popup-icon">
            {type === 'error' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}
          </span>
          <p>{message}</p>
        </div>
        <button className="popup-close" onClick={onClose}>×</button>
      </div>
    </div>
  )
}

export default Popup