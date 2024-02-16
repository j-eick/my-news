import React, { useEffect, useState } from "react";

export default function useFetch(url: string) {
  const fetchedUrl = url;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState([]);

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

        setData(data.articles);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    console.log(data);
  }, [url]);

  return { data, loading, error, fetchedUrl };
}
