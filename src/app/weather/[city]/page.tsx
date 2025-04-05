// app/weather/[city]/page.tsx
"use client";

import React from "react";
import { useEffect, useState } from "react";
import WeatherCardUI from "@/Components/WeatherCardUI";
import WeatherCharts from "@/Components/WeatherCharts";

type Props = {
  params: Promise<{ city: string }>; // Async params in App Router (Next.js 14+)
};

const WeatherPage = (props: Props) => {
  const { city: initialCity } = React.use(props.params); // ✅ unwrap the promise correctly
  const [city, setCity] = useState(initialCity);         // ✅ use initial param only once
  const [inp, setInp] = useState(initialCity);           // ✅ input box pre-filled with initial city

  // Only update state once (if user didn't change it)
  useEffect(() => {
    setCity(initialCity);
    setInp(initialCity);
  }, [initialCity]);

  const handleCheckWeather = () => {
    if (inp.trim() && inp !== city) {
      setCity(inp);
      console.log("Checking weather for:", inp);
    }
  };

  return (
    <div className="bg-[#1B2A41] p-6 sm:p-8 md:p-12 rounded-xl shadow-lg w-full min-h-screen flex flex-col items-center justify-evenly">
      {/* Input and Button */}
      <div className="flex flex-col items-center sm:flex-row gap-4 md:gap-6 mb-6 md:mb-8 w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto">
        <input
          type="text"
          value={inp}
          onChange={(e) => setInp(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inp.trim() && inp !== city) {
              setCity(inp);
            }
          }}
          placeholder="Enter city name (e.g., Paris)"
          className="p-2 md:p-3 rounded-lg text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-[#324A5F] w-full border-2 border-amber-50 transition-colors duration-200 text-amber-50 bg-transparent"
        />
        <button
          onClick={handleCheckWeather}
          className="bg-[#324A5F] text-[#CCC9DC] px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-[#0C1821] transition-colors duration-200 whitespace-nowrap text-base md:text-lg"
        >
          Check Weather
        </button>
      </div>

      {/* WeatherCardUI */}
      <div className="flex flex-col gap-6 md:gap-8 max-w-3xl mx-auto w-full">
        {city ? (
          <WeatherCardUI props={city} />
        ) : (
          <p className="text-white text-lg">Please enter a city name to check the weather.</p>
        )}
      </div>

      {/* WeatherCharts */}
      {city ? (
        <WeatherCharts props={city} />
      ) : (
        <p className="text-white text-lg">Please enter a city name to check the weather.</p>
      )}
    </div>
  );
};

export default WeatherPage;
