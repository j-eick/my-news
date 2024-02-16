import { useEffect, useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";

console.clear();

function App() {
  const { data, loading, error } = useFetch(
    "https://newsapi.org/v2/top-headlines?country=de&apiKey=3db50491d0be4ffd811c0190a3d43a9b"
  );
  const [newsObject, setNewsObject] = useState("");
  const [newsArray, setNewsArray] = useState([]);
  const [urlString, setUrlString] = useState("");

  const clickHandler = () => {
    console.log("ya<");
  };

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
          <div className="addNews__container">
            {/* <label htmlFor="countries">add country</label>
            <select
              className="dropdown"
              name="countries"
              id="countries"
              aria-label="select a country"
            >
              <option className="option" value="China" disabled selected hidden>
                +
              </option>
              <option className="option" value="China">
                China
              </option>
              <option className="option" value="US">
                U.S.
              </option>
            </select> */}
          </div>
        </div>
        <ul role="list" className="row gap">
          {data.map((item, i) => (
            <li key={i} onClick={() => clickHandler} className="card">
              <article>
                <div>Author: {item.author}</div>
                <h1 className="card__title"> {item.title}</h1>
                <div>Quelle: {item.source.name}</div>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
