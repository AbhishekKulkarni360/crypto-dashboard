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
import '../styles/index.css';

const CryptoChart = ({ coin = 'bitcoin' }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("1"); // "1" for 24H, "7" for 7D

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${timeRange}`
    )
      .then((response) => response.json())
      .then((result) => {
        const chartData =
          result.prices?.map(([timestamp, price]) => ({
            date:
              timeRange === "1"
                ? new Date(timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : new Date(timestamp).toLocaleDateString(),
            price: price,
          })) ?? [];
        setData(chartData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching chart data:', error);
        setLoading(false);
      });
  }, [coin, timeRange]);

  const toggleTimeRange = () => {
    setTimeRange((prev) => (prev === "1" ? "7" : "1"));
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="chart-card animated-glow">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>
          {coin.charAt(0).toUpperCase() + coin.slice(1)} - {timeRange === "1" ? "24H" : "7D"} Chart
        </h2>
        <button
          onClick={toggleTimeRange}
          style={{
            padding: '0.4rem 1rem',
            borderRadius: '8px',
            backgroundColor: '#58a6ff',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Switch to {timeRange === "1" ? "7D" : "24H"}
        </button>
      </div>

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
