import "./App.css";
import { headlinesArray } from "./utils/headlines.js";
import useFetchAllHL from "./hooks/useFetchAllHL.js";
// import useActiveHL from "./hooks/useActiveHL.js";
// import useActiveHL from "./hooks/useActiveHL.js";

console.clear();

function App() {
  const [allHeadlines, setAllHeadlines] = useFetchAllHL(headlinesArray);
  // Hook that curates a list of countries that are ACTIVE
  // const [activeHL, setActiveHL] = useActiveHL(allHeadlines);

  // OLD: fetching single source via HOOK
  // const { newsData, loading, error, fetchedUrl } = useFetchNews(
  //   `https://newsapi.org/v2/top-headlines?country=de&apiKey=${
  //     import.meta.env.VITE_apiKEY
  //   }`
  // );

  console.log(allHeadlines);

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
