import { useEffect, useState } from "react";

export default function News({ category, onSummarize }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:3000/api/news?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("NEWS RECEIVED:", data);

        setArticles(data.results || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category]);

  // ✅ Summarize function
  const summarizeArticle = async (article) => {
    try {
      const response = await fetch("http://localhost:3000/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: article.description }),
      });

      const data = await response.json();

      onSummarize({
        ...article,
        summary: data.summary,
      });
    } catch (error) {
      console.error("Summary failed:", error);
    }
  };

  if (loading) return <p style={{ color: "white" }}>Loading...</p>;

  if (!articles.length)
    return <p style={{ color: "white" }}>No news found</p>;

  return (
    <div>
      {articles.map((item, index) => (
        <div key={index} className="news-card">
          {item.image_url && (
            <img src={item.image_url} className="news-image" alt="" />
          )}

          <h2 className="news-title">{item.title}</h2>
          <p className="news-desc">{item.description}</p>

          <button
            className="summarize-btn"
            onClick={() => summarizeArticle(item)}
          >
            Summarize Article
          </button>
        </div>
      ))}
    </div>
  );
}
