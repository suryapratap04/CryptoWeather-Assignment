// components/CryptoCard.tsx
interface CryptoData {
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export default function CryptoCard({ crypto }: { crypto: CryptoData }) {
  return (
    <div className="bg-white/80 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-semibold text-purple-900">{crypto.name}</h3>
      <p className="text-purple-800">
        Price: ${crypto.current_price.toLocaleString()}
      </p>
      <p
        className={`text-purple-800 ${
          crypto.price_change_percentage_24h >= 0
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%
      </p>
      <p className="text-purple-800">
        Market Cap: ${crypto.market_cap.toLocaleString()}
      </p>
    </div>
  );
}
