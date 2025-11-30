import React, { useState, useEffect } from 'react'
import { auth } from './firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import Landing from './components/Landing'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import RespiratorySimulation from './components/simulations/RespiratorySimulation'
import RespiratorySimulation1 from './components/simulations/RespiratorySimulation1'
import RespiratorySimulation2 from './components/simulations/RespiratorySimulation2'
import RespiratorySimulation3 from './components/simulations/RespiratorySimulation3'
import RespiratoryDocumentation1 from './components/simulations/RespiratoryDocumentation1.jsx'
import RespiratoryDocumentation2 from './components/simulations/RespiratoryDocumentation2'
import RespiratoryDocumentation3 from './components/simulations/RespiratoryDocumentation3'
import CardiacSimulation from './components/simulations/CardiacSimulation'
import CardiacRhythmSimulation from './components/simulations/CardiacRhythmSimulation'
import CardiacAsystoleSimulation from './components/simulations/CardiacAsystoleSimulation'
import CardiacDocumentation from './components/simulations/CardiacDocumentation'
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

      // --- Cardiac Simulation Flow ---
      case 'cardiac-simulation':
        return authenticatedView(CardiacSimulation, {
          onPass: () => setCurrentView('cardiac-documentation')
        })
      case 'cardiac-documentation':
        return authenticatedView(CardiacDocumentation, {
          onPass: () => setCurrentView('cardiac-rhythm-simulation')
        })
      case 'cardiac-rhythm-simulation':
        return authenticatedView(CardiacRhythmSimulation, {
          onPass: () => setCurrentView('rhythm-documentation')
        })
      case 'rhythm-documentation':
        return authenticatedView(RhythmDocumentation, {
          onPass: () => setCurrentView('cardiac-asystole-simulation')
        })
      case 'cardiac-asystole-simulation':
        return authenticatedView(CardiacAsystoleSimulation, {
          onPass: () => setCurrentView('post-arrest-documentation')
        })
      case 'post-arrest-documentation':
        return authenticatedView(PostArrestDocumentation)

      // --- Respiratory Simulation 1 Flow (Diagnosis) ---
      case 'respiratory-simulation1':
        return authenticatedView(RespiratorySimulation1, {
          onPass: () => setCurrentView('respiratory-documentation1')
        })
      case 'respiratory-documentation1':
        return authenticatedView(RespiratoryDocumentation1, {
          onPass: () => setCurrentView('respiratory-simulation2')
        })

      // --- Respiratory Simulation 2 Flow (Immediate Interventions) ---
      case 'respiratory-simulation2':
        return authenticatedView(RespiratorySimulation2, {
          onPass: () => setCurrentView('respiratory-documentation2')
        })
      case 'respiratory-documentation2':
        return authenticatedView(RespiratoryDocumentation2, {
          onPass: () => setCurrentView('respiratory-simulation3')
        })

      // --- Respiratory Simulation 3 Flow (Advanced Management) ---
      case 'respiratory-simulation3':
        return authenticatedView(RespiratorySimulation3, {
          onPass: () => setCurrentView('respiratory-documentation3')
        })
      case 'respiratory-documentation3':
        return authenticatedView(RespiratoryDocumentation3)

      // --- Legacy Respiratory Simulation (Keep for backward compatibility) ---
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