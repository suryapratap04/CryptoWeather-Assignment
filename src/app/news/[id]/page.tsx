import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY_NEWS;

type NewsPost = {
  id: number;
  title: string;
  published_at: string;
  url: string;
  domain: string;
  source: {
    title: string;
  };
  votes: {
    positive: number;
    negative: number;
    important: number;
    liked: number;
    disliked: number;
    lol: number;
    toxic: number;
    saved: number;
    comments: number;
  };
};

const fetchNewsById = async (id: string): Promise<NewsPost | null> => {
  const res = await axios.get(
    `https://cryptopanic.com/api/v1/posts/?auth_token=${API_KEY}&public=true`
  );
  const post = res.data.results.find((item: NewsPost) => item.id === parseInt(id));
  return post ?? null;
};

type Props = {
  params: { id: string };
};

export default async function NewsDetailPage({ params }: Props) {
  const { id } = params;

  if (!id || typeof id !== "string") {
    return <div className="text-white text-center p-12">Invalid news ID.</div>;
  }

  const post = await fetchNewsById(id);

  if (!post) {
    return <div className="text-white text-center p-12">News not found.</div>;
  }

  const { title, published_at, url, domain, source, votes } = post;

  return (
    <div className="bg-[#1B2A41] text-white p-6 sm:p-10 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h1>
        <p className="text-sm text-gray-400 mb-1">
          Source: <span className="font-semibold">{source?.title}</span> ({domain})
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Published: {new Date(published_at).toLocaleString()}
        </p>
        <a
          href={url}
          target="_blank"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-500 transition mb-8"
        >
          🔗 Read Full Article
        </a>
        <div className="bg-[#0C1821] p-4 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-3 text-[#CCC9DC]">
            🗳️ Community Reactions
          </h2>
          <ul className="text-sm space-y-1">
            <li>👍 Positive: {votes.positive}</li>
            <li>👎 Negative: {votes.negative}</li>
            <li>‼️ Important: {votes.important}</li>
            <li>❤️ Liked: {votes.liked}</li>
            <li>😐 Disliked: {votes.disliked}</li>
            <li>😂 LOL: {votes.lol}</li>
            <li>☣️ Toxic: {votes.toxic}</li>
            <li>🔖 Saved: {votes.saved}</li>
            <li>💬 Comments: {votes.comments}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
