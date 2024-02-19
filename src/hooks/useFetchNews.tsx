import React, { useEffect, useState } from "react";

/**
 *
 * @param url
 * @returns fetches
 */
export default function useFetchNews(url: string) {
  const fetchedUrl = url;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [newsData, setnewsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Error: " + res.statusText);
        }
        const data = await res.json();

        setnewsData(data.articles);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { newsData, loading, error, fetchedUrl };
}
