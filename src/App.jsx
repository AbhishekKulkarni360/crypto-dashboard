import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CryptoPrices from './components/CryptoPrices';
import CryptoChart from './components/CryptoChart';
import CryptoSearch from './components/CryptoSearch';

function App() {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  return (
    <>
      <Navbar />
      <main style={{ padding: '2rem', marginTop: '80px' }}>
        <h2>Dashboard</h2>
        <CryptoSearch onSearch={setSelectedCoin} />
        <CryptoPrices coin={selectedCoin} />
        <CryptoChart coin={selectedCoin} />
      </main>
    </>
  );
}

export default App;