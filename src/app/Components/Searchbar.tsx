"use client"

import React, { useState, ChangeEvent, KeyboardEvent } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      onSearch(city);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (

    <div className="bg-white rounded-2xl">
    <div className="flex flex-col justify-center items-center   gap-4 backdrop-blur-sm max-h-[500px] max-w-[600px] px-40 py-20 border-0 rounded-2xl ">
        <div className="text-3xl text-black font-bold mb-4 text-center ">🌤 Weather Today </div>
        <div className="flex flex-col gap-2 items-center sm:flex sm:flex-row sm:justify-center sm:items-center">
      <input
        type="text"
        placeholder="Enter city name..."
        value={city}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        className="border rounded px-4 py-2 w-full md:w-72 bg-white"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>

    </div>
    </div>

  );
};

export default SearchBar;
