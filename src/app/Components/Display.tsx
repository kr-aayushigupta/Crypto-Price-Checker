import React, { useState } from "react";
import SearchBar from "@/app/Components/Searchbar";

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;

  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    humidity: number;
    feelslike_c:number;
    heatindex_c:number;
    
  };
}

const Display: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

//   const handleCitySearch = (cityName: string) => {
//     console.log("Searching weather for:", cityName);
//     // Step 2 will use this to fetch weather data
//   };

  const fetchWeather = async (city: string) => {
    const API_KEY = "f99b1408528f4863af494641250406"; // 🔁 Replace with your key
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}`;

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("City not found");
      }
      const data = await res.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/20 rounded-2xl">
    <div className="backdrop-blur-sm p-6">
     
      <SearchBar onSearch={fetchWeather} />

        {/* if loading - display that it is loading */}
      {loading && <p className="text-center">Loading...</p>}


        {/* if there is error show the error */}
      {error && <p className="text-center text-red-500">{error}</p>}


        {/* If the weather data is succesfully fetched - display it */}
      {weather && (
        <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold">
            {weather.location.name}, {weather.location.region} ,{weather.location.country}
          </h2> 
          <p className="text-sm text-gray-500 mb-2">{weather.location.localtime}</p>

          <div className="flex items-center gap-4 mt-2">
            <img
              src={weather.current.condition.icon}
              alt={weather.current.condition.text}
              className="w-16 h-16"
            />
            <div>
              <p className="">Temperature : {weather.current.temp_c}°C</p>
              <p className="">Feels Like : {weather.current.feelslike_c}°C</p>
              <p>{weather.current.condition.text}</p>
            </div>
          </div>
          <p className="mt-2">💧 Humidity: {weather.current.humidity}%</p>
          <p>🌬 Wind Speed: {weather.current.wind_kph} kph</p>
          <p>🔥 Heat Index: {weather.current.heatindex_c} °C</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Display;
