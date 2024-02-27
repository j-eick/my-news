import "./App.css";
import { headlinesArray } from "./utils/headlines.js";
import useFetchAllHL from "./hooks/useFetchAllHL.js";

console.clear();

function App() {
  const [activeHeadlines, setActiveHeadlines] = useFetchAllHL(headlinesArray);

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
        {/* {
          activeHeadlines && (
            activeHeadlines.map((item, j) => (
              <ul className="countryList col" role="list">
                <li key={j}>
                  <button className="country__button">{item.germany}</button>
                </li>
              </ul>
            ))
          )
        } */}
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
