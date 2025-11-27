import React, { useState } from 'react';
import React, { useState, useEffect } from 'react'Expand commentComment on line R1Code has comments. Press enter to view.
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

// 1. IMPORT YOUR NEW COMPONENT
// Reverting to the most common structure and adding the explicit extension 
// for strict compilers. If this fails, the paths are definitely different 
// in your project (Awoniyi-Semilore/MediNova).
import CardiacArrestSim from './components/simulations/CardiacArrestSim.jsx';
import Landing from './components/Landing.jsx'; 

const App = () => {
    // Manages which page is currently displayed
    const [currentView, setCurrentView] = useState('landing');
    
    // Function to change the view (passed to children components)
    const handleNavigate = (view) => {
        setCurrentView(view);
    };

    const renderContent = () => {
        switch (currentView) {
            case 'landing':
                return <Landing onNavigate={handleNavigate} />;

            // 2. CHECK THIS ROUTE! 
            // This is the case that must render the component with the Vimeo video.
            case 'simulation1': 
                return <CardiacArrestSim onNavigate={handleNavigate} />;

            case 'signup':
                return <div>Sign Up Page Placeholder</div>;
            case 'login':
                return <div>Login Page Placeholder</div>;
            
            default:
                return <Landing onNavigate={handleNavigate} />;
        }
    };

    return (
        <div className="App">
            {renderContent()}
        </div>
    );
};

export default App;