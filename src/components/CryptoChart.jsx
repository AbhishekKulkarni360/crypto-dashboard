import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
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

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=1&interval=hourly`)
      .then((res) => res.json())
      .then((result) => {
        const chartData = result.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
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
        <p>Loading chart...</p>
      </div>
    );
  }

  return (
    <div className="chart-card animated-glow">
    <h2>{coin.charAt(0).toUpperCase() + coin.slice(1)} - 24H Price Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#58a6ff" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#333" strokeDasharray="4 4" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" domain={['auto', 'auto']} />
          <Tooltip
            contentStyle={{ backgroundColor: '#222', border: 'none', color: '#fff' }}
            labelStyle={{ color: '#58a6ff' }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#58a6ff"
            fill="url(#priceGradient)"
            dot={{ r: 2 }}
            activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoChart;
