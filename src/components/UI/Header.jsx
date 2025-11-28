import React from 'react';

function Header({ onLogout }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>MediNova</h1>
          <span className="tagline">Medical Innovations</span>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          Sign Out
        </button>
      </div>
    </header>
  );
}

export default Header;