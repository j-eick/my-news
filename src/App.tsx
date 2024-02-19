import { useEffect, useState } from "react";
import "./App.css";
import useFetchNews from "./hooks/useFetchNews.tsx";
import { headlinesArray } from "./utils/headlines.js";

console.clear();

function App() {
  const [headlines, setHeadlines] = useState([]);

  // OLD: fetching single source via HOOK
  const { newsData, loading, error, fetchedUrl } = useFetchNews(
    `https://newsapi.org/v2/top-headlines?country=de&apiKey=${
      import.meta.env.VITE_apiKEY
    }`
  );

  /**
   * Initial Promise.all() to fetch headline-news:
   *  - de, us, cn
   */
  useEffect(() => {
    // async call => waiting for promises
    const initialHeadlines = async () => {
      const res = await headlinesArray.map((country) =>
        fetch(country.url + import.meta.env.VITE_apiKEY)
          .then((res) => res.json())
          .then((data) => data.articles)
          .catch((err) => "Mishap happened: " + err)
      );

      const promisedNews = await Promise.all(res);
      setHeadlines(promisedNews);
      console.log(promisedNews);
    };

    initialHeadlines();
  }, [headlinesArray]);

  return (
    <div className="container">
      <header>My News Compilation</header>
      <main>
        <div className="newsPicker row gap">
          <div className="currentNews__container">
            <p className="currentNews__title">Current news</p>
            <p className="currentNews__countries">Ger</p>
            <button className="currentNews__remove">x</button>
          </div>
          <div className="addNews__container"></div>
        </div>
        <section className="col gap">
          {headlines &&
            headlines.map((country, i) => (
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
