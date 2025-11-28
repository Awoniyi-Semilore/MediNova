import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Landing from './pages/Landing';
import Home from './pages/Home';
import CardiacArrestSimulation from './components/Simulation/CardiacArrestSimulation';
import PediatricRespiratorySimulation from './components/Simulation/PediatricRespiratorySimulation';
import CardiacDocumentation from './pages/CardiacDocumentation';
import PediatricDocumentation from './pages/PediatricDocumentation';
import './styles/globals.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing navigateTo={navigateTo} />;
      case 'home':
        return <Home navigateTo={navigateTo} currentUser={currentUser} />;
      case 'cardiac-simulation':
        return <CardiacArrestSimulation navigateTo={navigateTo} />;
      case 'pediatric-simulation':
        return <PediatricRespiratorySimulation navigateTo={navigateTo} />;
      case 'cardiac-documentation':
        return <CardiacDocumentation navigateTo={navigateTo} currentUser={currentUser} />;
      case 'pediatric-documentation':
        return <PediatricDocumentation navigateTo={navigateTo} currentUser={currentUser} />;
      default:
        return <Landing navigateTo={navigateTo} />;
    }
  };

  return (
    <AuthProvider>
      <div className="App">
        {renderPage()}
      </div>
    </AuthProvider>
  );
}

export default App;
