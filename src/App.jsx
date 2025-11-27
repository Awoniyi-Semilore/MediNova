import React, { useState, useEffect } from 'react'
import { auth } from './firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import Landing from './components/Landing'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import RespiratorySimulation from './components/simulations/RespiratorySimulation'
import './App.css'
import CardiacDocumentation from './components/simulations/CardiacDocumentation'

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
    switch (currentView) {
      case 'cardiac-documentation':
  return <CardiacDocumentation onNavigate={setCurrentView} user={user} />
      case 'landing':
        return <Landing onNavigate={setCurrentView} />
      case 'login':
        return <Login onNavigate={setCurrentView} setUser={setUser} />
      case 'signup':
        return <SignUp onNavigate={setCurrentView} setUser={setUser} />
      case 'home':
        if (!user) {
          setCurrentView('landing')
          return <Landing onNavigate={setCurrentView} />
        }
        return <Home onNavigate={setCurrentView} user={user} />
      case 'cardiac-simulation':
        if (!user) {
          setCurrentView('landing')
          return <Landing onNavigate={setCurrentView} />
        }
        return <CardiacSimulation onNavigate={setCurrentView} />
      case 'respiratory-simulation':
        if (!user) {
          setCurrentView('landing')
          return <Landing onNavigate={setCurrentView} />
        }
        return <RespiratorySimulation onNavigate={setCurrentView} />
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