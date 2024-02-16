import { useEffect, useState } from "react";
import "./App.css";

console.clear();

function App() {
  const [newsObject, setNewsObject] = useState("");
  const [newsArray, setNewsArray] = useState([]);
  const [urlString, setUrlString] = useState("");

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=de&apiKey=3db50491d0be4ffd811c0190a3d43a9b"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.articles);
        console.log(data.articles);
        setNewsObject(data);
        setNewsArray(data.articles);
      })
      .catch((error) => console.error("Error: ", error));
  }, []);

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
            <div type="dropdown"></div>
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
          {newsArray.map((item, i) => (
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
