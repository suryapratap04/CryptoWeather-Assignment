// components/WeatherSection.tsx
"use client";

import { useState } from "react";
// import { fetchWeather } from "@/lib/api";
import WeatherCard from "./WeatherCard";

export default function WeatherSection() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);

  const handleCheckWeather = async () => {
    console.log("Checking weather for", city);
    if (city.trim()) {
      // const data = await fetchWeather(city);
      // if (data) setWeatherData(data);
      // else alert("City not found!");
      setWeatherData({
        city: "New York",
        condition: "Cloudy",
        temperature: 75,
        humidity: 65,
      });
    }
  };

  return (
    <section
      id="weather"
      className="bg-[#1B2A41] p-6 sm:p-8 md:p-12 rounded-xl shadow-lg w-full h-screen flex flex-col items-center justify-evenly"
    >
      <p className="text-lg sm:text-xl md:text-4xl text-[#CCC9DC] mb-6 md:mb-8 max-w-3xl mx-auto text-center font-bold">
        Get instant weather insights for any city. Check conditions,
        temperature, and humidity below.
      </p>

      {/* Input and Button */}
      <div className="flex flex-col items-center  sm:flex-row gap-4 md:gap-6 mb-6 md:mb-8 w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name (e.g., Paris)"
          className="p-2 md:p-3 rounded-lg  text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#324A5F] w-full border-2 border-amber-50 transition-colors duration-200 text-amber-50"
        />
        <button
          onClick={handleCheckWeather}
          className="bg-[#324A5F] text-[#CCC9DC] px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-[#0C1821] transition-colors duration-200 whitespace-nowrap text-base md:text-lg"
        >
          Check Weather
        </button>
      </div>

      {/* Weather Content */}
      <div className=" flex flex-col gap-6 md:gap-8 max-w-3xl mx-auto w-full">
        {weatherData ? (
          <WeatherCard weather={weatherData} />
        ) : (
          <div className="text-[#CCC9DC] space-y-4 md:space-y-6">
            <p className="text-lg sm:text-xl md:text-2xl">
              No data yet! Try checking the weather for cities like New York,
              Tokyo, or London.
            </p>
            <div className="bg-[#324A5F] p-4 md:p-6 rounded-lg">
              <h3 className="text-[#CCC9DC] font-semibold text-lg md:text-xl">
                Weather Tips
              </h3>
              <ul className="list-disc list-inside text-[#CCC9DC] text-base md:text-lg">
                <li>Check humidity levels for travel planning.</li>
                <li>Use temperature data to dress appropriately.</li>
                <li>Monitor conditions for outdoor activities.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
