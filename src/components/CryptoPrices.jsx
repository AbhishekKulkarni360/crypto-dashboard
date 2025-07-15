import React, { useEffect, useState } from "react";

const CryptoPrices = ({ coin = "bitcoin" }) => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`)
      .then((res) => res.json())
      .then((data) => {
        setPrice(data[coin]?.usd ?? "N/A");
        setLoading(false);
      });
  }, [coin]);

  if (loading) return <p>Loading price...</p>;

  return (
    <div>
      <h3>{coin.charAt(0).toUpperCase() + coin.slice(1)} Price:</h3>
      <p>${price}</p>
    </div>
  );
};

export default CryptoPrices;
