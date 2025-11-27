import React, { useState, useEffect } from 'react'
import { auth } from './firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import Landing from './components/Landing'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import RespiratorySimulation from './components/simulations/RespiratorySimulation'
import CardiacSimulation from './components/simulations/CardiacSimulation'
import CardiacRhythmSimulation from './components/simulations/CardiacRhythmSimulation' // <-- NEW IMPORT
import CardiacDocumentation from './components/simulations/CardiacDocumentation'
import RhythmDocumentation from './components/simulations/RhythmDocumentation' // <-- NEW IMPORT
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState('landing')

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Render different views based on currentView state
  const renderView = () => {
    // Helper to enforce user authentication before proceeding to a view
    const authenticatedView = (Component, props = {}) => {
      if (!user) {
        setCurrentView('landing')
        return <Landing onNavigate={setCurrentView} />
      }
      return <Component onNavigate={setCurrentView} {...props} />
    }

    switch (currentView) {
      case 'landing':
        return <Landing onNavigate={setCurrentView} />
      case 'login':
        return <Login onNavigate={setCurrentView} setUser={setUser} />
      case 'signup':
        return <SignUp onNavigate={setCurrentView} setUser={setUser} />
      case 'home':
        return authenticatedView(Home, { user })

      // --- Simulation 1 Flow (Recognition) ---
      case 'cardiac-simulation':
        return authenticatedView(CardiacSimulation, {
          onPass: () => setCurrentView('cardiac-documentation')
        })
      case 'cardiac-documentation':
        return authenticatedView(CardiacDocumentation)

      // --- Simulation 2 Flow (Rhythm Management) ---
      case 'simulation2-intro': // Entry point from Sim 1 documentation
      case 'cardiac-rhythm-simulation':
        return authenticatedView(CardiacRhythmSimulation, {
          onPass: () => setCurrentView('rhythm-documentation')
        })
      case 'rhythm-documentation':
        return authenticatedView(RhythmDocumentation)

      // --- Other Simulations ---
      case 'respiratory-simulation':
        return authenticatedView(RespiratorySimulation)

      default:
        return <Landing onNavigate={setCurrentView} />
    }
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">Loading MediNova...</div>
      </div>
    )
  }

  return (
    <div className="app">
      {renderView()}
    </div>
  )
}

export default App