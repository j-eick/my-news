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
            .then((data) =>
              data.articles.map((item) =>
                // console.log(item),
                ({
                  author: item.author,
                  title: item.title,
                  content: item.content,
                  description: item.description,
                  published: item.publishedAt,
                  source: item.source.name,
                  url: item.url,
                })
              )
            )
            .catch((err) => {
              console.error("Oh nooo ~ we've got an error: " + err);
            })
        );

        const promisedNews = await Promise.all(res);
        setAllHeadlines(promisedNews);

        // console.log(allHeadlines);
      } catch (err) {
        console.error(err);
      }
    };

    activeHeadlines();
  }, [headlinesArray]);

  return [allHeadlines];
}
