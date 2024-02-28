import { useEffect, useState } from "react";

console.clear();

export default function useFetchAllHL(headlinesArray: OriginalHLArrayProps[]) {
  const [origHLArray] = useState<OriginalHLArrayProps[]>(headlinesArray)
  const [curatedHLs, setCuratedHLs] = useState<CuratedHeadlineProps[][]>([]);

  useEffect(() => {
    
    //---check localStorage
    const dataFromStorage = localStorage.getItem("localData");
    dataFromStorage == null ? (
      console.log("Status: Localstorage => " + "empty")
      ) : (
        console.log("Status: Localstorage => " + "full")
      )

    //---1. filtering for headlines with "active: true" property
    //---2. concatinating url + apiKey
    const activeHeadlines: string[] = origHLArray
      .filter(
        (item: OriginalHLArrayProps) => item.active == true)
      .map(
        (item: OriginalHLArrayProps) => item.url + import.meta.env.VITE_apiKEY
      );
  
    //IF LOCALSTORAGE HAS NO DATA
    if (dataFromStorage?.length == 0 || dataFromStorage == null) {
      console.log("storage = empty");
      
      //---fetch from api 
      fetchData(activeHeadlines);         

      //IF LOCALSTORAGE HAS DATA
    } else {
      console.log("fetching from localStorage...");

      //---fetch from local storage
      try{
        const dataFromLS = localStorage.getItem("localData");
        if (dataFromLS !== null) {
          const data = JSON.parse(dataFromLS);
          console.log(data);
          setCuratedHLs(data);
        } 
      } catch(err) {
        console.error("Fetching from localstorage went wrong: " + err);
      }
    }

    /**
     * FETCH DATA
     *  1. loop over all active headlines
     *    1.1.  fetching data
     *    1.2.  loop over articles and create new article objects
     *          by adding fetched data to original headlinesArray.
     */
    async function fetchData(activeHeadlines: string[]) {
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
              // active: headlinesArray[i].active,
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
      // setCuratedHLs(allArticlesByCountries);
      localStorage.setItem("localData", JSON.stringify(allArticlesByCountries));

      fetchFromLS();

      async function fetchFromLS() {
        const dataFromLS = localStorage.getItem("localData");
          if (dataFromLS !== null) {
            console.log("fetching from localStorage...");
            const data = JSON.parse(dataFromLS);
            console.log(data);
            setCuratedHLs(data);
          } 
      }

    }
  }, [origHLArray]);

  return [curatedHLs];
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
  urlToImage: null | string;
  source: {
    name: string;
  };
};

type OriginalHLArrayProps = {
  country: string;
  handle: string;
  url: string;
  active: boolean;
};
