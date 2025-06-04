
"use client";
import React, { useEffect, useState } from "react";

interface CoinDataProps {
  coinId: string;
}

interface CoinInfo {
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

const CoinData: React.FC<CoinDataProps> = ({ coinId }) => {
  const [coin, setCoin] = useState<CoinInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

//   fetch(`/api/coin?id=${coinId}`)


  useEffect(() => {
    const fetchCoinData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/coin?id=${coinId}`)

        const data = await res.json();
        setCoin(data[0]);
      } catch (err) {
        setError("Failed to load coin data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId]);

  if (loading) return <p className="text-center text-white">Loading data...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!coin) return null;

  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-white shadow-md rounded">
      <div className="flex items-center space-x-4">
        <img src={coin.image} alt={coin.name} className="w-10 h-10" />
        <h2 className="text-xl font-semibold">{coin.name}</h2>
      </div>
      <ul className="mt-4 space-y-2 text-gray-700">
        <li>
          💵 <strong>Price:</strong> ${coin.current_price.toLocaleString()}
        </li>
        <li>
          📉 <strong>24h Change:</strong>{" "}
          <span
            className={
              coin.price_change_percentage_24h >= 0
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </li>
        <li>
          💰 <strong>Market Cap:</strong> ${coin.market_cap.toLocaleString()}
        </li>
      </ul>
    </div>
  );
};

export default CoinData;
