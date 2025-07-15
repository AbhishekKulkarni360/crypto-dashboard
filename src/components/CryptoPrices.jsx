import React, { useEffect, useState } from 'react';

const COINS = ['bitcoin', 'ethereum', 'dogecoin'];

const CryptoPrices = () => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch prices from CoinGecko
    fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${COINS.join(',')}&vs_currencies=usd`)
      .then(response => response.json())
      .then(data => {
        setPrices(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch prices');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading crypto prices...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Latest Crypto Prices</h2>
      <ul>
        {COINS.map(coin => (
          <li key={coin}>
            <strong>{coin[0].toUpperCase() + coin.slice(1)}:</strong> ${prices[coin]?.usd ?? 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoPrices;