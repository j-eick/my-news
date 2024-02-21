import { useEffect, useState } from "react";

type UseFetchAllHLProps = {
  country: string;
  handle: string;
  url: string;
  active: boolean;
};

export default function useFetchAllHL(headlinesArray: UseFetchAllHLProps[]) {
  const [allHeadlines, setAllHeadlines] = useState<any[]>([]);

  useEffect(() => {
    const activeHeadlines = async () => {
      try {
        const res = await headlinesArray.map((country) =>
          fetch(country.url + import.meta.env.VITE_apiKEY)
            .then((res) => res.json())
            .then((data) => data.articles)
            .catch((err) => {
              throw new Error("Mishap happened: " + err);
            })
        );
        const promisedNews = await Promise.all(res);
        setAllHeadlines(promisedNews);
      } catch (err) {
        console.error(err);
      }
    };

    activeHeadlines();
  }, [headlinesArray]);

  return [allHeadlines];
}
