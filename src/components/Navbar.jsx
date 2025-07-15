import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav style={{
      width: '95%',
      position: 'fixed', // Stick to the top!
      top: 0,
      left: 0,
      background: '#222',
      color: '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      zIndex: 1000, // Stay above other content
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)' // Optional: adds subtle shadow
    }}>
      <h1 style={{margin: 0, fontSize: '2rem'}}>Crypto Dashboard</h1>
      <a href="#" style={{color: '#fff', textDecoration: 'none', fontSize: '1.2rem'}}>Home</a>
    </nav>
  );
};

export default Navbar;