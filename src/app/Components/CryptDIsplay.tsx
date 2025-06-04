"use client";

import React, { useState } from "react";
import CoinSelector from "@/app/Components/CryptoSearchbar";
import CoinData from "@/app/Components/CoinDta";

const CryptoDisplay: React.FC = () => {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");

  return (
    <div className="bg-black/20 rounded-2xl">
    <div className="backdrop-blur-sm p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white" >💹 Crypto Price Tracker</h1>
      <CoinSelector selectedCoin={selectedCoin} onSelect={setSelectedCoin} />
      <CoinData coinId={selectedCoin} />
    </div>
    </div>
  );
};

export default CryptoDisplay;

