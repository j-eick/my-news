import { useEffect, useState } from "react";

type UseFetchAllHLProps = {
  country: string;
  handle: string;
  url: string;
  active: boolean;
};

export default function useFetchAllHL(headlinesArray: UseFetchAllHLProps[]) {
  const [allHeadlines, setAllHeadlines] = useState<UseFetchAllHLProps[]>([]);

  useEffect(() => {
    const activeHeadlines = async () => {
      try {
        const res = await headlinesArray.map((country) =>
          fetch(country.url + import.meta.env.VITE_apiKEY)
            .then((res) => res.json())
            .then((data) => data.articles)
            .catch((err) => {
              console.error("Mishap happened: " + err);
            })
        );
        const promisedNews = await Promise.all(res);
        // fill state-variable
        setAllHeadlines(promisedNews);
      } catch (err) {
        console.error(err);
      }
    };

    activeHeadlines();
  }, [headlinesArray]);

  return [allHeadlines];
}
