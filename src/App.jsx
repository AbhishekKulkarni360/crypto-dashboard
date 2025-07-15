import React, { useState } from "react";
import CryptoSearch from "./components/CryptoSearch";
import CryptoPrices from "./components/CryptoPrices";
import CryptoChart from "./components/CryptoChart";
import './styles/index.css';
import Navbar from "./components/Navbar";

const App = () => {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  return (
    <>
  <Navbar />
  <div className="container">
    <CryptoSearch onSearch={setSelectedCoin} />
    <CryptoPrices coin={selectedCoin} />
    <CryptoChart coin={selectedCoin} />
  </div>
</>

  );
};

export default App;
