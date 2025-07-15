import React, { useState } from "react";

const CryptoSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim().toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Search cryptocurrency (e.g. solana)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "0.5rem", width: "220px" }}
      />
      <button type="submit" style={{ padding: "0.5rem 1rem", marginLeft: "1rem" }}>
        Search
      </button>
    </form>
  );
};

export default CryptoSearch;