// app/page.tsx
import WeatherSection from "./components/WeatherSection";
import CryptoSection from "./components/CryptoSection";
import NewsSection from "./components/NewsSection";
import MainSection from "./components/MainSection";


export default function Dashboard() {
  return (
    <div className="bg-[#0C1821] text-[#CCC9DC]">
      <MainSection />
      <div className="space-y-8 p-4">
        <WeatherSection />
        <CryptoSection />
        <NewsSection />
      </div>
    </div>
  );
}
