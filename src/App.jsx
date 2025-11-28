import React, { useState, useEffect } from 'react'
import { auth } from './src/firebase-config' // Path updated
import { onAuthStateChanged } from 'firebase/auth'
import Landing from './src/components/Landing' // Path updated
import Login from './src/components/Login' // Path updated
import SignUp from './src/components/SignUp' // Path updated
import Home from './src/components/Home' // Path updated
import VideoIntro from './src/components/VideoIntro' // Path updated
import RespiratorySimulation from './src/components/simulations/RespiratorySimulation' // Path updated
import CardiacSimulation from './src/components/simulations/CardiacSimulation' // Path updated
import CardiacRhythmSimulation from './src/components/simulations/CardiacRhythmSimulation' // Path updated
import CardiacAsystoleSimulation from './src/components/simulations/CardiacAsystoleSimulation' // Path updated
import CardiacDocumentation from './src/components/simulations/CardiacDocumentation' // Path updated
import RhythmDocumentation from './src/components/simulations/RhythmDocumentation' // Path updated
import PostArrestDocumentation from './src/components/simulations/PostArrestDocumentation' // Path updated
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
      
      // --- Simulation 1 Flow: Video Briefing -> Core Simulation ---
      case 'cardiac-video-briefing':
        // VideoIntro component handles navigation to 'cardiac-simulation'
        return authenticatedView(VideoIntro, { onNavigate: setCurrentView })
        
      case 'cardiac-simulation':
        return authenticatedView(CardiacSimulation, {
          onPass: () => setCurrentView('cardiac-documentation')
        })
      case 'cardiac-documentation':
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
      <div className="loading-screen text-center p-10">
        <div className="loading-spinner text-lg font-semibold text-blue-600">Loading MediNova...</div>
      </div>
    )
  }

  return (
    <div className="app min-h-screen bg-gray-50 font-inter">
      {renderView()}
    </div>
  )
}

export default App