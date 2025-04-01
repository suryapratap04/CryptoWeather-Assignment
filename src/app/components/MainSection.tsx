// components/MainSection.tsx
"use client";

import { useRouter } from "next/navigation";

export default function MainSection() {
  const router = useRouter();

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Optional: Update URL hash without full navigation
    router.push(`#${sectionId}`, { scroll: false });
  };

  return (
    <section className="bg-[#0C1821] h-screen w-full flex flex-col items-center justify-between text-center p-6">
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-[#CCC9DC] leading-tight">
          CryptoWeather <br /> Nexus
        </h1>
      </div>
      <div className="flex flex-col items-center gap-8 pb-12">
        <p className="text-lg sm:text-xl text-[#CCC9DC] max-w-2xl">
          Welcome to CryptoWeather Nexus, your premium dashboard for real-time
          weather updates, cryptocurrency insights, and the latest crypto news.
          Seamlessly blending cutting-edge data with a luxurious design, explore
          the world at your fingertips.
        </p>
        <div className="flex  flex-wrap items-center justify-center flex-row gap-4">
          <button
            onClick={() => handleScrollToSection("weather")}
            className="bg-[#324A5F] text-[#CCC9DC] px-6 py-3 rounded-lg hover:bg-[#1B2A41] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#CCC9DC]"
          >
            Weather
          </button>
          <button
            onClick={() => handleScrollToSection("crypto")}
            className="bg-[#324A5F] text-[#CCC9DC] px-6 py-3 rounded-lg hover:bg-[#1B2A41] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#CCC9DC]"
          >
            Crypto
          </button>
          <button
            onClick={() => handleScrollToSection("news")}
            className="bg-[#324A5F] text-[#CCC9DC] px-6 py-3 rounded-lg hover:bg-[#1B2A41] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#CCC9DC]"
          >
            News
          </button>
        </div>
      </div>
    </section>
  );
}
