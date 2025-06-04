"use client";

import React, { useEffect, useState } from "react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
}

interface CoinSelectorProps {
  selectedCoin: string;
  onSelect: (coinId: string) => void;
}

const CoinSelector: React.FC<CoinSelectorProps> = ({ selectedCoin, onSelect }) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
        );
        const data = await res.json();
        const coinList = data.map((coin: any) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
        }));
        setCoins(coinList);
      } catch (err) {
        setError("Failed to load coin list.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) return <p className="text-center">Loading coins...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-sm mx-auto my-4">
      <label className="block mb-1 font-medium text-white">Select Coin:</label>
      <select
        value={selectedCoin}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded shadow-sm bg-white"
      >
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.name} ({coin.symbol})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CoinSelector;
