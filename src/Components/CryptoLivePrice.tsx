"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
const styles = {
  card: {
    borderRadius: "1rem",
    padding: "1rem",
    color: "white",
    transition: "background 0.3s ease",
    boxShadow: "0 0 12px rgba(0, 0, 0, 0.3)",
  },
  positive: {
    background: "linear-gradient(135deg, #2ecc71, #27ae60)",
  },
  negative: {
    background: "linear-gradient(135deg, #e74c3c, #c0392b)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  icon: {
    width: "32px",
    height: "32px",
  },
};
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

const CryptoLivePrice = () => {
  const [data, setData] = useState<Crypto[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            ids: "bitcoin,ethereum,dogecoin,cardano,solana,polkadot,tron,avalanche,litecoin,chainlink,ripple,stellar,uniswap",
        },
        }
      );
      setData(res.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1B2A41]  grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-4 ">
      {data.map((coin) => {
        const isPositive = coin.price_change_percentage_24h >= 0;
        return (
          <div
            key={coin.id}
            onClick={() => router.push(`/crypto/${coin.id}`)}
            className={`bg-[#0C1821] cursor-pointer transition-transform hover:scale-[1.03] shadow-xl rounded-2xl p-4 ${
              isPositive ? styles.positive : styles.negative
            }`}
          >
            <div className="flex items-center gap-4">
            <Image 
                src={coin.image} 
                alt={coin.name} 
                className="h-10 w-10"
                width={40}
                height={40}
                loading="lazy"
                />  
            <h2 className="text-xl font-semibold text-white">{coin.name}</h2>
            </div>
            <div className="mt-3 text-sm text-white">
              <p>
                <strong>Price:</strong> ${coin.current_price.toLocaleString()}
              </p>
              <p>
                <strong>Change (24h):</strong>{" "}
                <span className={isPositive ? "text-green-200" : "text-red-200"}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </p>
              <p>
                <strong>Market Cap:</strong> ${coin.market_cap.toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CryptoLivePrice;
