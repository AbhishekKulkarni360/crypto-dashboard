import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import '../styles/index.css'; // Ensure styles have animated-glow and spinner

const CryptoChart = ({ coin = 'bitcoin' }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=1`
    )
      .then((response) => response.json())
      .then((result) => {
        const chartData =
          result.prices?.map(([timestamp, price]) => ({
            date: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            price: price,
          })) ?? [];
        setData(chartData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching chart data:', error);
        setLoading(false);
      });
  }, [coin]);

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="chart-card animated-glow">
      <h2 style={{ textAlign: 'center' }}>
        {coin.charAt(0).toUpperCase() + coin.slice(1)} - 24H Price Chart
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#58a6ff"
            strokeWidth={2}
            dot={false}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoChart;
