import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`https://en.wikipedia.org/w/api.php`, {
        params: {
          action: "query",
          list: "search",
          format: "json",
          origin: "*",
          srsearch: searchTerm,
        },
      });
      setSearchResults(data.query.search);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleRandomArticle = async () => {
    try {
      const { data } = await axios.get(`https://en.wikipedia.org/w/api.php`, {
        params: {
          action: "query",
          format: "json",
          origin: "*",
          list: "random",
        },
      });
      window.open(
        `https://en.wikipedia.org/wiki/${data.query.random[0].title}`,
        "_blank"
      );
    } catch (error) {
      console.error("Error fetching random article:", error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Wikipedia Search</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Wikipedia"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="results">
          {searchResults.map((result) => (
            <div className="result" key={result.pageid}>
              <h2>
                <a
                  href={`https://en.wikipedia.org/wiki/${result.title}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {result.title}
                </a>
              </h2>
              <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
            </div>
          ))}
        </div>
        <div className="random-button">
          <button onClick={handleRandomArticle}>Random Article</button>
        </div>
      </div>
    </div>
  );
};

export default App;
