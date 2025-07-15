import React, { useState } from "react";
import CryptoSearch from "./components/CryptoSearch";
import CryptoPrices from "./components/CryptoPrices";
import CryptoChart from "./components/CryptoChart";

const App = () => {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Crypto Dashboard</h1>
      <CryptoSearch onSearch={setSelectedCoin} />
      <CryptoPrices coin={selectedCoin} />
      <CryptoChart coin={selectedCoin} />
    </div>
  );
};

export default App;
