// src/components/Navbar.jsx
import { useState } from 'react';
import './Navbar.css';

const Navbar = ({ setCurrentView }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => setCurrentView('overview')}>
        CHRONOCRAFT
      </div>
      <div className="navbar-links">
        <button onClick={() => setCurrentView('overview')}>Overview</button>
        <button onClick={() => setCurrentView('experience')}>Experience</button>
        <button onClick={() => setCurrentView('about')}>About</button>
      </div>
    </nav>
  );
};

export default Navbar;
