// app/page.tsx
import WeatherSection from "../Components/WeatherSection";
import CryptoSection from "../Components/CryptoSection";
import NewsSection from "../Components/NewsSection";
import MainSection from "../Components/MainSection";


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
