import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase-config'
import Popup from './Popup'

const Login = ({ onNavigate, setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [popup, setPopup] = useState({ show: false, message: '', type: 'error' })

  const showPopup = (message, type = 'error') => {
    setPopup({ show: true, message, type })
  }

  const hidePopup = () => {
    setPopup({ ...popup, show: false })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
      setUser(userCredential.user)
      showPopup('Welcome back!', 'success')
      setTimeout(() => onNavigate('home'), 1000)
    } catch (error) {
      let errorMessage = 'Something went wrong. Please try again.'
      
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password. Please check your credentials.'
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email. Please sign up first.'
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.'
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.'
      }
      
      showPopup(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <Popup 
        show={popup.show}
        message={popup.message}
        type={popup.type}
        onClose={hidePopup}
      />
      
      <div className="auth-container">
        <button 
          className="back-button"
          onClick={() => onNavigate('landing')}
        >
          ← Back to Home
        </button>

        <div className="auth-header">
          <div className="auth-logo">
            <span className="auth-logo-icon">⚕️</span>
            <h1>Welcome Back</h1>
          </div>
          <p>Continue your medical training journey</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="btn-spinner"></span>
                Signing In...
              </>
            ) : (
              'Sign In to MediNova'
            )}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <button 
            className="link-button"
            onClick={() => onNavigate('signup')}
          >
            Create one here
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login