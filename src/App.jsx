import React, { useState, useEffect } from 'react'
import { auth } from './firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import Landing from './components/Landing'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import RespiratorySimulation from './components/simulations/RespiratorySimulation'
import CardiacSimulation from './components/simulations/CardiacSimulation'
import CardiacRhythmSimulation from './components/simulations/CardiacRhythmSimulation'
import CardiacAsystoleSimulation from './components/simulations/CardiacAsystoleSimulation'
import CardiacDocumentation from './components/simulations/CardiacDocumentation' // <-- NOW EXPLICITLY DEFINED
import RhythmDocumentation from './components/simulations/RhythmDocumentation'
import PostArrestDocumentation from './components/simulations/PostArrestDocumentation'
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
        // FIX: The onPass prop is passed here, linking to Sim 2
        return authenticatedView(CardiacDocumentation, {
          onPass: () => setCurrentView('cardiac-rhythm-simulation')
        })

      // --- Simulation 2 Flow (Rhythm Management) ---
      case 'cardiac-rhythm-simulation':
        return authenticatedView(CardiacRhythmSimulation, {
          onPass: () => setCurrentView('rhythm-documentation')
        })
      case 'rhythm-documentation':
        return authenticatedView(RhythmDocumentation, {
          onPass: () => setCurrentView('cardiac-asystole-simulation')
        })
        
      // --- Simulation 3 Flow (Asystole & Post-Arrest) ---
      case 'cardiac-asystole-simulation':
        return authenticatedView(CardiacAsystoleSimulation, {
          onPass: () => setCurrentView('post-arrest-documentation')
        })
      case 'post-arrest-documentation':
        return authenticatedView(PostArrestDocumentation)

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