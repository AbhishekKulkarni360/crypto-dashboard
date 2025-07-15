import React from 'react';
import Navbar from './components/Navbar';
import CryptoPrices from './components/CryptoPrices';

function App() {
  return (
    <>
      <Navbar />
      <main style={{padding: '2rem', marginTop: '80px'}}>
        <h2>Dashboard</h2>
        <CryptoPrices />
      </main>
    </>
  );
}

export default App;