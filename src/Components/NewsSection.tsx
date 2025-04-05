"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface NewsArticle {
  id: number;
  title: string;
  published_at: string;
  url: string;
  source: {
    title: string;
    domain: string;
  };
}

const NewsSection = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNews(data.results);
      } catch (error) {
        console.error("Error fetching news", error);
      }
    };
  
    fetchNews();
  }, []);
  

  return (
    <section className="bg-[#1B2A41] p-6 sm:p-8 md:p-12 rounded-xl shadow-lg w-full min-h-screen flex flex-col items-center justify-start">
      <h2 className="text-[#CCC9DC] text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
        Top Crypto Headlines
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {news.map((article) => (
          <div
            key={article.id}
            onClick={() => router.push(`/news/${article.id}`)}
            className="cursor-pointer bg-[#0C1821] text-white p-6 rounded-xl shadow-md hover:scale-[1.02] transition-transform"
          >
            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
            <p className="text-sm text-gray-400">
              {article.source.title} • {new Date(article.published_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;
