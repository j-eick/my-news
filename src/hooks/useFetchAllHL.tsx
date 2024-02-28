import { useEffect, useState } from "react";

export default function useFetchAllHL(headlinesArray: HeadLinesArrayProps[]) {
  const [curatedHeadlines, setCuratedHeadlines] = useState<
  CuratedHeadlineProps[][]
  >([]);

  useEffect(() => {
    /**
     *  1. filtering for "active" headlines
     *  2. concatinaing url + apiKey
     */
    const activeHeadlines: string[] = headlinesArray
      .filter((item: HeadLinesArrayProps) => item.active == true)
      .map(
        (item: HeadLinesArrayProps) => item.url + import.meta.env.VITE_apiKEY
      );

    localStorage.setItem("activeHLs", JSON.stringify(activeHeadlines));

    /**
     * Fetching data
     *  1. loop over all active headlines
     *    1.1.  fetching data
     *    1.2.  loop over articles and create new article objects
     *          by adding fetched data to original headlinesArray.
     */
    async function fetchData() {
      const allArticlesByCountries: CuratedHeadlineProps[][] = [];
      for (const [i, headline] of activeHeadlines.entries()) {
        try {
          const res = await fetch(headline);
          const data = await res.json();
          const articles = await data.articles;

          /**
           * curate new headline objects
           */
          const curatedArticlesArray: CuratedHeadlineProps[] = [];
          for (const article of articles) {
            const curatedHL: CuratedHeadlineProps = {
              //add keyValues from original headline
              country: headlinesArray[i].country,
              handle: headlinesArray[i].handle,
              active: headlinesArray[i].active,
              //spread article content
              ...article,
            };
            curatedArticlesArray.push(curatedHL);
          }
          allArticlesByCountries.push(curatedArticlesArray);

          // console.log(allArticlesByCountries);
          
        } catch (err) {
          console.error("Mööp: " + err);
        }
      }
      setCuratedHeadlines(allArticlesByCountries);
      console.log(curatedHeadlines);
      
    }

    fetchData();
  }, [headlinesArray]);

  return [curatedHeadlines];
}

type CuratedHeadlineProps = {
  country: string;
  handle: string;
  active: boolean;
  title: string;
  author: string;
  content: null | string;
  description: null | string;
  publishedAt: string;
  url: string;
  urlToImage: null| string;
  source: {
    name: string;
  };
};

type HeadLinesArrayProps = {
  country: string;
  handle: string;
  url: string;
  active: boolean;
}