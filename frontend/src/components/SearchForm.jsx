import React, { useState } from "react";

const SearchForm = (props) => {
  // const [query, setQuery] = useState({});

  const [keyword, setKeyword] = useState("");
  const [genre, setGenre] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");

  // const onChangeInput = (event) => {
  //   setQuery(event.target.value);
  // };

  const handleOnSearch = () => {
    const dataSearch = {
      keyword: keyword,
      genre: genre,
      mediaType: mediaType,
      language: language,
      year: year,
    };
    props.onSearch(dataSearch);
  };

  const handleReset = () => {
    // setQuery("");
    setKeyword("");
    setGenre("");
    setMediaType("");
    setLanguage("");
    setYear("");
  };

  return (
    <div className="search-section">
      <div className="input-search">
        <div className="item">
          <span>Keyword:</span>
          <input
            type="text"
            placeholder="keyword..."
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
          />
        </div>
        <div className="item">
          <span>Genre:</span>
          <input
            type="text"
            placeholder="genre..."
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
          />
        </div>
        <div className="item">
          <span>Media Type:</span>
          <select
            name="mediaType"
            id="mediaType"
            onChange={(e) => setMediaType(e.target.value)}
            value={mediaType}
          >
            <option value="" disabled>
              Select your media type
            </option>
            <option value="all">all</option>
            <option value="movie">movie</option>
            <option value="tv">tv</option>
            <option value="person">person</option>
          </select>
        </div>
        <div className="item">
          <span>Language:</span>

          <select
            name="language"
            id="language"
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            <option value="" disabled>
              Select language
            </option>
            <option value="en">en</option>
            <option value="ja">ja</option>
            <option value="ko">ko</option>
          </select>
        </div>
        <div className="item">
          <span>Year:</span>
          <input
            type="text"
            placeholder="year..."
            onChange={(e) => setYear(e.target.value)}
            value={year}
          />
        </div>
        {/* <svg
          className="svg-inline--fa fa-search fa-w-16"
          fill="#ccc"
          aria-hidden="true"
          data-prefix="fas"
          data-icon="search"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg> */}
      </div>
      <div className="button-group">
        <button onClick={handleReset}>RESET</button>
        <button className="btn-search" onClick={handleOnSearch}>
          SEARCH
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
