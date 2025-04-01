// components/WeatherCard.tsx
interface WeatherData {
  name: string;
  main: { temp: number; humidity: number };
  weather: { description: string }[];
}

export default function WeatherCard({ weather }: { weather: WeatherData }) {
  return (
    <div className="bg-[#CCC9DC] p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-3xl font-bold text-[#000000] mb-2">{weather.name}</h3>
      <p className="text-xl text-[#0C1821]">Temp: {weather.main.temp}°C</p>
      <p className="text-xl text-[#0C1821]">
        Humidity: {weather.main.humidity}%
      </p>
      <p className="text-lg text-[#324A5F] italic capitalize">
        {weather.weather[0].description}
      </p>
    </div>
  );
}
