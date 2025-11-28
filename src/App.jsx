import React, { useState } from 'react';
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