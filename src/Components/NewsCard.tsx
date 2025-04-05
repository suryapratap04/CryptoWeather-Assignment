// components/NewsCard.tsx
interface NewsData {
  title: string;
  link: string;
}

export default function NewsCard({ news }: { news: NewsData }) {
  return (
    <div className="bg-white/80 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <a
        href={news.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-rose-900 hover:text-rose-700 transition-colors duration-200"
      >
        {news.title}
      </a>
    </div>
  );
}
