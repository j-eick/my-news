import { useEffect, useState } from "react";
import "./App.css";
// import useFetchNews from "./hooks/useFetchNews.tsx";
// import useActiveHL from "./hooks/useActiveHL.js";
import { headlinesArray } from "./utils/headlines.js";

console.clear();

function App() {
  const [allHeadlines, setAllHeadlines] = useState([]);
  /**
   * Hook that curates a list of countries that are ACTIVE
   */
  // const [activeHL, setActiveHL] = useActiveHL(allHeadlines);
  const [choosableCountries, setChoosableCountries] = useState(headlinesArray);

  // OLD: fetching single source via HOOK
  // const { newsData, loading, error, fetchedUrl } = useFetchNews(
  //   `https://newsapi.org/v2/top-headlines?country=de&apiKey=${
  //     import.meta.env.VITE_apiKEY
  //   }`
  // );

  console.log(allHeadlines);
  console.log(choosableCountries);

  // console.log(activeHL);

  /**
   * Initial Promise.all() to fetch headline-news:
   *  - de, us, cn
   */
  useEffect(() => {
    // async call => waiting for promises
    const activeHeadlines = async () => {
      const res = await headlinesArray.map((country) =>
        fetch(country.url + import.meta.env.VITE_apiKEY)
          .then((res) => res.json())
          .then((data) => data.articles)
          .catch((err) => "Mishap happened: " + err)
      );

      const promisedNews = await Promise.all(res);
      setAllHeadlines(promisedNews);
    };

    activeHeadlines();
  }, [headlinesArray]);

  return (
    <div className="container">
      {/* #################### HEADER #################### */}
      <header className="header row">
        <h1 className="header__title">Some title</h1>
        <p className="addCountry">Add country</p>
        <ul></ul>
      </header>
      {/* #################### MAIN AREA #################### */}
      <main>
        {/* {choosableCountries && (
          <ul className="countryList col" role="list">
            {choosableCountries.map((country, j) => (
              <li key={j}>
                <button className="country__button">{country.country}</button>
              </li>
            ))}
          </ul>
        )} */}
        <section className="col gap">
          {allHeadlines &&
            allHeadlines.map((country, i) => (
              <ul key={i} role="list" className="row gap">
                {country.map((news, k) => (
                  <li key={k} className="card">
                    <article>
                      <p>{news.author}</p>
                      <h1 className="card__title">{news.title}</h1>
                      <p>Quelle: {news.source.name}</p>
                    </article>
                  </li>
                ))}
              </ul>
            ))}
        </section>
      </main>
    </div>
  );
}

export default App;
