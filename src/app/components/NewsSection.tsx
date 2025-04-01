// components/NewsSection.tsx
// import { fetchNews } from "@/lib/api";
import NewsCard from "./NewsCard";

async function getNewsData() {
  // const data = await fetchNews();
  // return data;
  console.log("getNewsData");
  return [
    {
      title: "Bitcoin hits $50,000 for first time since May",
      link: "https://www.reuters.com/technology/bitcoin-hits-50000-first-time-since-may-2021-08-23/",
    },
    {
      title: "Ethereum upgrade hits major milestone",
      link: "https://www.coindesk.com/ethereum-london-hard-fork-major-milestone",
    },
    {
      title: "El Salvador buys 150 more bitcoins",
      link: "https://www.bbc.com/news/world-latin-america-58363145",
    },
  ];
}

export default async function NewsSection() {
  const newsData = await getNewsData();

  return (
    <section
      id="news"
      className="bg-[#1B2A41] p-6 sm:p-8 md:p-12 rounded-xl shadow-lg w-full h-screen flex flex-col items-center justify-evenly"
    >
      <p className="text-lg sm:text-xl md:text-4xl text-[#CCC9DC] mb-6 md:mb-8 max-w-3xl text-center mx-auto font-bold">
        Catch the latest crypto headlines, from market surges to global
        regulations.
      </p>
      <div className=" flex flex-col lg:flex-row gap-6 md:gap-8 max-w-4xl mx-auto w-full">
        <div className="bg-[#CCC9DC] w-full lg:w-1/3 h-48 rounded-lg flex items-center justify-center text-[#000000] text-base md:text-lg">
          Dummy Image (300x192px)
        </div>
        <div className="space-y-3 md:space-y-6 w-full lg:w-2/3">
          {newsData.map((news: any, index: number) => (
            <NewsCard key={index} news={news} />
          ))}
        </div>
      </div>
    </section>
  );
}
