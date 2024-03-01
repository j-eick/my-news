import "./App.css";
import { headlinesArray } from "./utils/headlines.js";
import useFetchAllHL from "./hooks/useFetchAllHL.js";

console.clear();

function App() {
  const [activeHeadlines, setActiveHeadlines] = useFetchAllHL(headlinesArray);

  const handleActivateHL = (e: BtnClickEvent) => {
    const clickedHandle = (e.target as HTMLButtonElement).textContent;
    
    // headlinesArray.forEach(hl => {
    //   if (hl.handle === clickedHandle) {
    //     console.log(hl);
    //     headlinesArray = {

    //     }
        
    //   }
    // })
    
  }

  return (
    <div className="container">
      {/* ############  1. HEADER  ################################### */}
      {/* ############################################################ */}
      <header className="header row">
        <h1 className="header__title">Some title</h1>
        <p className="addCountry">Add country</p>
        {
          activeHeadlines && (
            <div className="allHandles__container">
              <ul className="allHandles__list" role="list">
                {
                  headlinesArray.map((hl, i) => (
                    hl.active === true ? (
                      <li key={i} className="allHandles__card active">
                      <button className="allHandles__button">{hl.handle}</button>
                    </li>
                    ) : (
                      <li key={i} className="allHandles__card">
                      <button 
                        className="allHandles__button" 
                        onClick={(e: BtnClickEvent) => handleActivateHL(e)}>{hl.handle}
                      </button>
                    </li>
                    )
                    ))
                  }
              </ul>
        </div>
          )
        }
      </header>
      {/* ############  2. MAIN  ##################################### */}
      {/* ############################################################ */}
      <main>
        {/* ##########################  2.1 PICKED COUNTRIES  ######## */}
        {/* ########################################################## */}
        {activeHeadlines && (
          <div className="container__displayedCountries">
            <ul className="displayedCountries__list row gap1" role="list">
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
        <section className="col gap1">
          {activeHeadlines &&
            activeHeadlines.map((country, i) => (
              <ul key={i} role="list" className="activeHeadlines__list row gap1">
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