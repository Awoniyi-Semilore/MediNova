import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/UI/Header';
import Card from '../components/UI/Card';

function Home() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="home-container">
      <Header onLogout={handleLogout} />
      
      <main className="main-content">
        <h2>Medical Simulations</h2>
        <p className="welcome-text">Welcome, {currentUser?.email}</p>
        
        <div className="cards-grid">
          <Card
            title="Cardiac Arrest Simulation"
            description="Manage a 56-year-old male patient presenting with cardiac arrest symptoms"
            onClick={() => navigate('/cardiac-simulation')}
            color="blue"
          />
          
          <Card
            title="Pediatric Respiratory Simulation"
            description="Assess and treat a 4-year-old child with respiratory distress"
            onClick={() => navigate('/pediatric-simulation')}
            color="green"
          />
        </div>
      </main>
    </div>
  );
}

export default Home;