import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts';
import '../styles/index.css';

const CryptoChart = ({ coin = 'bitcoin' }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7`
    )
      .then((res) => res.json())
      .then((result) => {
        const sampled = result.prices.filter((_, index) => index % 8 === 0);
        const chartData = sampled.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString('en-GB'),
          price: parseFloat(price.toFixed(2)),
        }));
        setData(chartData);
        setLoading(false);
      });
  }, [coin]);

  if (loading) {
    return (
      <div className="chart-card">
        <div className="spinner" />
        <p>⏳ Loading chart for {coin}...</p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      <h2>{coin.charAt(0).toUpperCase() + coin.slice(1)} Price (Last 7 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis domain={['auto', 'auto']} stroke="#ccc" />
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <Tooltip
            contentStyle={{ backgroundColor: '#222', border: 'none', color: '#fff' }}
            labelStyle={{ color: '#58a6ff' }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorPrice)"
            dot={{ r: 2 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoChart;
