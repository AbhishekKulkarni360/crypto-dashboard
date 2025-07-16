import React, { useEffect, useState } from "react";

const CryptoPrices = ({ coin = "bitcoin" }) => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`
        );
        const data = await res.json();
        setPrice(data[coin]?.usd ?? "N/A");
      } catch (error) {
        console.error("Error fetching price:", error);
        setPrice("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [coin]);

  return (
    <div className="price-card">
      <h3 style={{ marginBottom: "0.5rem", color: "#58a6ff" }}>
        {coin.charAt(0).toUpperCase() + coin.slice(1)} Price:
      </h3>

      {loading ? (
        <div className="spinner" />
      ) : (
        <p
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#ffffff",
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          ${price?.toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default CryptoPrices;
