import React from 'react';
import Header from '../components/UI/Header';
import Card from '../components/UI/Card';

function Home({ navigateTo, currentUser }) {
  const handleLogout = async () => {
    // Firebase logout logic here
    navigateTo('landing');
  };

  return (
    <div className="home-container">
      <Header onLogout={handleLogout} />
      
      <main className="main-content">
        <h2>Medical Simulations</h2>
        <p className="welcome-text">Welcome, {currentUser?.email || 'Student'}</p>
        
        <div className="cards-grid">
          <Card
            title="Cardiac Arrest Simulation"
            description="Manage a 56-year-old male patient presenting with cardiac arrest symptoms"
            onClick={() => navigateTo('cardiac-simulation')}
            color="blue"
          />
          
          <Card
            title="Pediatric Respiratory Simulation"
            description="Assess and treat a 4-year-old child with respiratory distress"
            onClick={() => navigateTo('pediatric-simulation')}
            color="green"
          />
        </div>
      </main>
    </div>
  );
}

export default Home;