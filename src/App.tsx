import "./App.css";
import { useEffect, useState } from "react";
import { headlinesArray } from "./utils/headlines.js";
import useFetchAllHL from "./hooks/useFetchAllHL.js";

console.clear();

function App() {
  const [allHeadlines, setAllHeadlines] = useState(headlinesArray);
  const [displayedHLs, setDisplayedHLs] = useFetchAllHL(allHeadlines);

  /** TOGGLES COUNTRY SYMBOLS by click of its handle
   *
   * After clicking a country handle, var allHeadlines is updated.
   * @param e buttonClickEvent(e)
*/
  const handleActivateHL = (e: BtnClickEvent) => {
    const clickedHandle = (e.target as HTMLButtonElement).textContent;

    const updatedArray = allHeadlines.map((hl) => {      
      if (hl.handle === clickedHandle) {        
        return { ...hl, active: !hl.active };
      } else {
        return hl;
      }
    });

    // CONSOLE: console.log(updatedArray);
    setAllHeadlines(updatedArray);
  };

  useEffect(() => {
    console.log(allHeadlines);
    console.log(displayedHLs);    
  }, [allHeadlines])
  

  return (
    <div className="container">
      {/* ############  1. HEADER  ################################### */}
      {/* ############################################################ */}
      <header className="header row">
        <h1 className="header__title">Pick your news</h1>
          <div className="allHandles__container">
            <ul className="allHandles__list" role="list">
              {
                allHeadlines.map((hl, i) => (                
                  hl.active ? (
                    <li key={i} className="allHandles__card active">
                      <button
                        className="allHandles__button"
                        onClick={(e: BtnClickEvent) => handleActivateHL(e)}
                      >
                        {hl.handle}
                      </button>
                    </li>
                  ) : (
                    <li key={i} className="allHandles__card">
                      <button
                        className="allHandles__button"
                        onClick={(e: BtnClickEvent) => handleActivateHL(e)}
                      >
                        {hl.handle}
                      </button>
                    </li>
                  )
                )
              )}
            </ul>
          </div>
      </header>
      {/* ############  2. MAIN  ##################################### */}
      {/* ############################################################ */}
      <main>
        {/* ##########################  2.1 PICKED COUNTRIES  ######## */}
        {/* ########################################################## */}
        {/* {allHeadlines && (
          <div className="container__displayedCountries">
            <ul className="displayedCountries__list row gap1" role="list">
              {allHeadlines.map((country, j) => (
                country.active ? (
                  <li key={j} className="displayedCountries__cards">
                    <button className="country__button">
                      {country}
                    </button>
                  </li>
                )))
              }
            </ul>
          </div>
        )} */}
        {/* ##########################  2.2 HEADLINES  ############### */}
        {/* ########################################################## */}
        <section className="col gap1">
          {displayedHLs &&
            displayedHLs.map((country, i) => (
              <ul
                key={i}
                role="list"
                className="activeHeadlines__list row gap1"
              >
                {country.map((article, k) => (
                  <li key={k} className="activeHeadlines__card">
                    <article>
                      <p>{article.author}</p>
                      <a href={article.url}>
                        <h1 className="card__title">{article.title}</h1>
                      </a>
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

type BtnClickEvent = React.MouseEvent<HTMLButtonElement>;
