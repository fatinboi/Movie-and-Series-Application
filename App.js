import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const apiKey = "YOUR_OMDB_API_KEY"; // Replace with your OMDb API key

  const searchMovies = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`
      );

      if (response.data.Search) {
        setSearchResults(response.data.Search);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  return (
    <div>
      <h1>Movie and Series Search</h1>
      <input
        type="text"
        placeholder="Search for movies or series"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={searchMovies}>Search</button>
      <div>
        {searchResults.map((result) => (
          <div key={result.imdbID}>
            <h2>{result.Title}</h2>
            <p>{result.Type}</p>
            <img src={result.Poster} alt={`${result.Title} Poster`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
