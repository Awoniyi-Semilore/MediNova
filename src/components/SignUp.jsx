import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from ''./config/firebase.js'
import { auth } from '../firebase-config'
import Popup from './Popup'

const SignUp = ({ onNavigate, setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
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

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      showPopup('Passwords do not match. Please try again.')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      showPopup('Password should be at least 6 characters long.')
      setLoading(false)
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      )
      
      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`
      })
      
      setUser(userCredential.user)
      showPopup('Account created successfully! Welcome to MediNova.', 'success')
      setTimeout(() => onNavigate('home'), 1500)
    } catch (error) {
      let errorMessage = 'Something went wrong. Please try again.'
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please use a different email or login.'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password.'
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
            <h1>Join MediNova</h1>
          </div>
          <p>Start your emergency medicine training journey</p>
        </div>

        <form onSubmit={handleSignUp} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                required
              />
            </div>
          </div>
          
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
              placeholder="Create a password (min. 6 characters)"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
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
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <button 
            className="link-button"
            onClick={() => onNavigate('login')}
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  )
}

export default SignUp