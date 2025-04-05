
import CryptoLivePrice from "./CryptoLivePrice";

export default async function CryptoSection() {

  return (
    <section
      id="crypto"
      className="bg-[#1B2A41] p-6 sm:p-8 md:p-12 rounded-xl shadow-lg w-full min-h-screen flex flex-col items-center justify-evenly"
    >
      <p className="text-lg sm:text-xl md:text-4xl text-[#CCC9DC] mb-6 md:mb-8 max-w-3xl mx-auto  text-center font-bold">
        Track the pulse of cryptocurrency with real-time data on Bitcoin,
        Ethereum, and more.
      </p>
      <div className=" flex flex-col lg:flex-row gap-6 md:gap-8 max-w-4xl mx-auto w-full">
        <CryptoLivePrice />
      </div>
    </section>
  );
}
