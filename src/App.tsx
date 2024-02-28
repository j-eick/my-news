import "./App.css";
import { headlinesArray } from "./utils/headlines.js";
import useFetchAllHL from "./hooks/useFetchAllHL.js";

console.clear();

function App() {
  const [activeHeadlines] = useFetchAllHL(headlinesArray);

  return (
    <div className="container">
      {/* ############  1. HEADER  ################################### */}
      {/* ############################################################ */}
      <header className="header row">
        <h1 className="header__title">Some title</h1>
        <p className="addCountry">Add country</p>
        <ul></ul>
      </header>
      {/* ############  2. MAIN  ##################################### */}
      {/* ############################################################ */}
      <main>
        {/* ##########################  2.1 PICKED COUNTRIES  ######## */}
        {/* ########################################################## */}
        {activeHeadlines && (
          <div className="container__displayedCountries">
            <ul className="displayedCountries__list row gap" role="list">
              {activeHeadlines.map((country, j) => (
                <li key={j} className="displayedCountries__cards">
                  <button className="country__button">
                    {country[0].country}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* ##########################  2.2 HEADLINES  ############### */}
        {/* ########################################################## */}
        <section className="col gap">
          {activeHeadlines &&
            activeHeadlines.map((country, i) => (
              <ul key={i} role="list" className="row gap">
                {country.map((article, k) => (
                  <li key={k} className="card">
                    <article>
                      <p>{article.author}</p>
                      <h1 className="card__title">{article.title}</h1>
                      <p>Quelle: {article.source.name}</p>
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
