import React, { useEffect, useState } from "react";

export default function useFetch({ url }: { url: string }) {
  const [fetchedUrl, setFetchedURL] = useState(url);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(fetchedUrl);
        if (!res.ok) {
          throw new Error("Error: " + Error);
        }
        const fetchedData = await res.json();
        setFetchedData(fetchedData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchedUrl]);

  return { fetchedData, loading, error };

  // async() => {
  // .then((res) => {
  //   if (!res.ok) {
  //     throw new Error("fetching didn't work");
  //   }
  //   return res.json();
  //   setLoading(true);
  // })
  // .then((data) => {
  //   setFetchedData(data);
  //   setLoading(false);
  // })
  // .catch((error) => console.log("Error: " + error));

  return <div>useFetch</div>;
}
