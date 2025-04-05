"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Card, CircularProgress, Typography } from "@mui/material";

interface CryptoDetails {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
}

const CryptoDetailPage = () => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState<CryptoDetails | null>(null);

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: {
          vs_currency: "usd",
          ids: id,
        },
      });
      setCrypto(res.data[0]);
    } catch (error) {
      console.error("Failed to fetch crypto details", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (!crypto) return <div className="bg-[#1B2A41] min-h-screen min-w-full text-white p-8">
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 5, p: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body1" mt={2}>
            Loading Crypto...
        </Typography>
        </Card>
  </div>;

  return (
    <div className="bg-[#1B2A41] min-h-screen p-6 sm:p-12 text-white">
      <div className="max-w-4xl mx-auto bg-[#0C1821] p-6 rounded-2xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <Image src={crypto.image} alt={crypto.name} className="w-16 h-16" />
          <h1 className="text-3xl font-bold">{crypto.name} ({crypto.symbol.toUpperCase()})</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <p><strong>Current Price:</strong> ${crypto.current_price.toLocaleString()}</p>
            <p><strong>Market Cap:</strong> ${crypto.market_cap.toLocaleString()}</p>
            <p><strong>Rank:</strong> #{crypto.market_cap_rank}</p>
            <p><strong>Fully Diluted Valuation:</strong> ${crypto.fully_diluted_valuation.toLocaleString()}</p>
            <p><strong>Total Volume:</strong> ${crypto.total_volume.toLocaleString()}</p>
            <p><strong>24h High:</strong> ${crypto.high_24h}</p>
            <p><strong>24h Low:</strong> ${crypto.low_24h}</p>
          </div>
          <div>
            <p><strong>Price Change 24h:</strong> ${crypto.price_change_24h.toFixed(2)}</p>
            <p><strong>Change % 24h:</strong> {crypto.price_change_percentage_24h.toFixed(2)}%</p>
            <p><strong>Market Cap Change 24h:</strong> ${crypto.market_cap_change_24h.toFixed(2)}</p>
            <p><strong>Market Cap Change % 24h:</strong> {crypto.market_cap_change_percentage_24h.toFixed(2)}%</p>
            <p><strong>Circulating Supply:</strong> {crypto.circulating_supply.toLocaleString()}</p>
            <p><strong>Total Supply:</strong> {crypto.total_supply.toLocaleString()}</p>
            <p><strong>Max Supply:</strong> {crypto.max_supply?.toLocaleString() || "N/A"}</p>
          </div>
        </div>

        <div className="mt-6">
          <p><strong>All-Time High:</strong> ${crypto.ath} ({crypto.ath_change_percentage.toFixed(2)}% from ATH on {new Date(crypto.ath_date).toLocaleDateString()})</p>
          <p><strong>All-Time Low:</strong> ${crypto.atl} ({crypto.atl_change_percentage.toFixed(2)}% from ATL on {new Date(crypto.atl_date).toLocaleDateString()})</p>
          {crypto.roi && (
            <p><strong>ROI:</strong> {crypto.roi.times.toFixed(2)}x ({crypto.roi.percentage.toFixed(2)}%) in {crypto.roi.currency.toUpperCase()}</p>
          )}
          <p className="text-xs mt-2 text-gray-400">Last Updated: {new Date(crypto.last_updated).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetailPage;
