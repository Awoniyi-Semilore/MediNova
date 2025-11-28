import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Landing from './pages/Landing';
import Home from './pages/Home';
import CardiacArrestSimulation from './components/Simulation/CardiacArrestSimulation';
import PediatricRespiratorySimulation from './components/Simulation/PediatricRespiratorySimulation';
import CardiacDocumentation from './pages/CardiacDocumentation';
import PediatricDocumentation from './pages/PediatricDocumentation';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cardiac-simulation" element={<CardiacArrestSimulation />} />
            <Route path="/pediatric-simulation" element={<PediatricRespiratorySimulation />} />
            <Route path="/cardiac-documentation" element={<CardiacDocumentation />} />
            <Route path="/pediatric-documentation" element={<PediatricDocumentation />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;