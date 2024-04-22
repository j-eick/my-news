import { useEffect, useState } from "react";
import updateDisplayedHLs from "../utils/updateDisplayedHLs";

console.clear();

export default function useFetchAllHL(allHeadlines: UncuratedHLArrayProps[]) {
  const [curatedHLs, setCuratedHLs] = useState<CuratedHeadlineProps[][]>([]);

  useEffect(() => {
    
    //---1. filtering for headlines => "active: true"
    //---2. concatinating url + apiKey
    const activeHeadlines: string[] = allHeadlines
      .filter((item: UncuratedHLArrayProps) => item.active == true)
      .map(
        (item: UncuratedHLArrayProps) => item.url + import.meta.env.VITE_apiKEY
      );    

    console.log(
      "need to re-fetch: " +
        updateDisplayedHLs(allHeadlines).toString().toUpperCase()
    );

    //---check local-storage
    const dataFromStorage = localStorage.getItem("localData");
    //---IF localStorage has NO DATA   OR   userHL differs from local-storage-HLs
    if (dataFromStorage == null || updateDisplayedHLs(allHeadlines)) {
      console.log(updateDisplayedHLs(allHeadlines));

      console.log("Status: empty localStorage || needs update");
      //---fetch from api
      fetchData(activeHeadlines);

      //---ELSE fetch from localStorage
    } else {
      console.log("fetching from localStorage...");
      try {
        const dataFromLS = localStorage.getItem("localData");
        console.log(curatedHLs);
        
        if (dataFromLS !== null) {
          const data = JSON.parse(dataFromLS);
          console.log("localStorage-data: ");
          console.log(data);
          setCuratedHLs(data);
          console.log("fetching done");
        }
      } catch (err) {
        console.error("Fetching from localstorage went wrong: " + err);
      }
    }

    /**
     * FETCH DATA
     *  1. loop over all active headlines
     *    1.1.  fetching data
     *    1.2.  loop over articles and create new article objects
     *          by adding fetched data to original allHeadlines.   */
    async function fetchData(activeHeadlines: string[]) {

      const allArticlesByCountries: CuratedHeadlineProps[][] = [];
      for (const [i, headline] of activeHeadlines.entries()) {
        try {
          const res = await fetch(headline);
          const data = await res.json();
          const articles = await data.articles;          

          //---curate new headline objects
          const curatedArticlesArray: CuratedHeadlineProps[] = [];
          for (const article of articles) {
            const curatedHL: CuratedHeadlineProps = {
              //add keyValues from original headline

              // FIXME: allHeadlines refers to initial array and doesn't
              //        take new order of content of activeHeadlines into
              //        consideration. 
              //        =>  While allHeadlines has fix order, activeHeadlines
              //            can have different order all the time. 
              country: allHeadlines[i].country,
              handle: allHeadlines[i].handle,
              active: allHeadlines[i].active,
              ...article,
            };
            
            curatedArticlesArray.push(curatedHL);
          }
          allArticlesByCountries.push(curatedArticlesArray);

        } catch (err) {
          console.error("Mööp: " + err);
        }
      }
      
      setCuratedHLs(allArticlesByCountries);
      localStorage.setItem("localData", JSON.stringify(allArticlesByCountries));

      // fetchFromLS();

      // function fetchFromLS() {
      //   const dataFromLS = localStorage.getItem("localData");
      //   if (dataFromLS !== null) {
      //     console.log("fetching from localStorage...");
      //     const data = JSON.parse(dataFromLS);
           // CONSOLE: console.log(data);
      //     setCuratedHLs(data);
      //   }
      // }
    }
  }, [allHeadlines]);

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

type UncuratedHLArrayProps = {
  country: string;
  handle: string;
  url: string;
  active: boolean;
};
