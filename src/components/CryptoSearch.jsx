import React, { useEffect, useState } from "react";
import '../styles/Search.css'; // Optional: create for dropdown styling

const CryptoSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [coinList, setCoinList] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    // Fetch coin list once
    fetch("https://api.coingecko.com/api/v3/coins/list")
      .then(res => res.json())
      .then(data => setCoinList(data));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.length > 0) {
      const matches = coinList.filter(coin =>
        coin.name.toLowerCase().includes(value) ||
        coin.symbol.toLowerCase().includes(value)
      ).slice(0, 10); // limit suggestions

      setFilteredCoins(matches);
    } else {
      setFilteredCoins([]);
    }
  };

  const handleSelect = (coinId) => {
    setQuery("");
    setFilteredCoins([]);
    onSearch(coinId); // send to parent
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim().toLowerCase());
      setFilteredCoins([]);
    }
  };

  return (
    <div className="search-wrapper">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search cryptocurrency"
          value={query}
          onChange={handleChange}
          autoComplete="off"
        />
        <button type="submit">Search</button>
      </form>

      {filteredCoins.length > 0 && (
        <ul className="dropdown">
          {filteredCoins.map((coin) => (
            <li key={coin.id} onClick={() => handleSelect(coin.id)}>
              {coin.name} ({coin.symbol.toUpperCase()})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CryptoSearch;
