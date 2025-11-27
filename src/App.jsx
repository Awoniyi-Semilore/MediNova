import React, { useState, useEffect } from 'react';
import { auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
// Path fix: Assuming directory is 'Components' (uppercase C) and adding explicit '.jsx' extension
import Landing from './components/Landing.jsx'; 
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Home from './components/Home.jsx';
import RespiratorySimulation from './components/simulations/RespiratorySimulation.jsx';
import CardiacSimulation from './components/simulations/CardiacSimulation.jsx';
import CardiacRhythmSimulation from './components/simulations/CardiacRhythmSimulation.jsx';
import CardiacAsystoleSimulation from './components/simulations/CardiacAsystoleSimulation.jsx';
import CardiacDocumentation from './components/simulations/CardiacDocumentation.jsx';
import RhythmDocumentation from './components/simulations/RhythmDocumentation.jsx';
import PostArrestDocumentation from './components/simulations/PostArrestDocumentation.jsx';
import CardiacArrestSim from './components/simulations/CardiacArrestSim.jsx'; 
import './App.css';

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
            case 'home':
                return <Home onNavigate={handleNavigate} />;

            // RENDER YOUR NEW SIMULATION COMPONENT HERE
            case 'simulation1': 
                return <CardiacArrestSim onNavigate={handleNavigate} />;

            case 'signup':
                return <SignUp onNavigate={handleNavigate} />;
            case 'login':
                return <Login onNavigate={handleNavigate} />;
            
            // Add other simulation cases based on your Home component's navigation logic
            case 'respiratory_sim':
                return <RespiratorySimulation onNavigate={handleNavigate} />;
            case 'cardiac_rhythm_sim':
                return <CardiacRhythmSimulation onNavigate={handleNavigate} />;
            case 'cardiac_asystole_sim':
                return <CardiacAsystoleSimulation onNavigate={handleNavigate} />;
            case 'cardiac_documentation':
                return <CardiacDocumentation onNavigate={handleNavigate} />;
            case 'rhythm_documentation':
                return <RhythmDocumentation onNavigate={handleNavigate} />;
            case 'post_arrest_documentation':
                return <PostArrestDocumentation onNavigate={handleNavigate} />;
            
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