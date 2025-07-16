import React, { useState, useEffect } from "react";
import "../styles/Search.css";

const CryptoSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [coins, setCoins] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        console.error("Failed to fetch coins list", err);
      }
    };

    fetchCoins();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const suggestions = coins.filter((coin) =>
      coin.name.toLowerCase().includes(value)
    );
    setFilteredSuggestions(suggestions.slice(0, 10)); // Limit to 10
  };

  const handleSelect = (id) => {
    onSearch(id);
    setSearchTerm("");
    setFilteredSuggestions([]);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const match = coins.find(
        (coin) => coin.name.toLowerCase() === searchTerm.toLowerCase()
      );
      if (match) {
        onSearch(match.id);
      }
    }
  };

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search coin..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {filteredSuggestions.length > 0 && (
        <ul className="suggestions">
          {filteredSuggestions.map((coin) => (
            <li key={coin.id} onClick={() => handleSelect(coin.id)}>
              {coin.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CryptoSearch;
