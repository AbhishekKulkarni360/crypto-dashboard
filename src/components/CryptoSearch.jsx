import React, { useState } from "react";

const CryptoSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim().toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
  <input
    type="text"
    placeholder="Search cryptocurrency (e.g. solana)"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
  <button type="submit">Search</button>
</form>
  );
};

export default CryptoSearch;
