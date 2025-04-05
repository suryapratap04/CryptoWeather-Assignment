// components/CryptoSection.tsx
// import { fetchCrypto } from "@/lib/api";
import CryptoCard from "./CryptoCard";

interface CryptoData {
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

async function getCryptoData() {
  // const data = await fetchCrypto();
  // return data;
  return [
    {
      id: "bitcoin",
      name: "Bitcoin",
      current_price: 50000,
      price_change_percentage_24h: 2.5,
      market_cap: 940000000000,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      current_price: 3200,
      price_change_percentage_24h: -1.5,
      market_cap: 380000000000,
    },
  ];
}

export default async function CryptoSection() {
  const cryptoData = await getCryptoData();

  return (
    <section
      id="crypto"
      className="bg-[#1B2A41] p-6 sm:p-8 md:p-12 rounded-xl shadow-lg w-full h-screen flex flex-col items-center justify-evenly"
    >
      <p className="text-lg sm:text-xl md:text-4xl text-[#CCC9DC] mb-6 md:mb-8 max-w-3xl mx-auto  text-center font-bold">
        Track the pulse of cryptocurrency with real-time data on Bitcoin,
        Ethereum, and more.
      </p>
      <div className=" flex flex-col lg:flex-row gap-6 md:gap-8 max-w-4xl mx-auto w-full">
        <div className="bg-[#CCC9DC] w-full lg:w-1/3 h-48 rounded-lg flex items-center justify-center text-[#000000] text-base md:text-lg">
          Dummy Image (300x192px)
        </div>
        <div className="space-y-4 md:space-y-6 w-full lg:w-2/3">
          {cryptoData.map((crypto: CryptoData) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      </div>
    </section>
  );
}
