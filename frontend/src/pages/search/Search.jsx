import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import SearchForm from "../../components/SearchForm";
import ResultList from "../../components/ResultList";

import "../../styles/search.css";

const Search = () => {
  // const API_KEY = "b65cd56f1e4f2985b66604d9c45fbffc";

  const userToken = "8qlOkxz4wq";

  const [results, setResults] = useState([]);

  //fetch API search
  const hanldeSearch = async (query) => {
    // const responseData = await fetch(
    //   `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}&language=en-US`
    // );

    // const data = await responseData.json();
    // setResults(data.results);

    if (!query.keyword) {
      alert("Please enter your keyword!");
      return;
    }

    try {
      const response = await fetch(
        `//localhost:5000/api/movies/search?token=${userToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(query),
        }
      );

      if (!response.ok) {
        // setVideoNotFound(true);
        return;
      }

      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="search-page">
      <Navbar />
      <SearchForm onSearch={(query) => hanldeSearch(query)} />
      <h3 className="sub-title">Search Result</h3>
      <ResultList data={results} />
    </div>
  );
};

export default Search;
