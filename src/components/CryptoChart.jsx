import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const COIN = 'bitcoin'; // You can change to 'ethereum', 'dogecoin', etc.

const CryptoChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${COIN}/market_chart?vs_currency=usd&days=7`
    )
      .then((response) => response.json())
      .then((result) => {
        const chartData = result.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          price: price,
        }));
        setData(chartData);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading chart...</p>;

  return (
    <div>
      <h2>{COIN.charAt(0).toUpperCase() + COIN.slice(1)} Price (Last 7 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoChart;