import { useEffect, useState } from "react";
import axios from "axios";

const useNews = (apiKey, country = "us", category = "technology") => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setError(false);
        setLoading(true);

        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`
        );

        setArticles(response.data.articles);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { articles, error, loading };
};

export default useNews;
