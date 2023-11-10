import React, { useState } from "react";

import MovieDetail from "./MovieDetail";

const ResultList = (props) => {
  const [movieDetail, setMovieDetail] = useState();
  const [showDetail, setShowDetail] = useState(false);

  //render detail
  const handleClickMovie = (item) => {
    console.log(item);

    if (!movieDetail) {
      setMovieDetail(item);
      setShowDetail(true);
    } else if (movieDetail?.id === item?.id) {
      setMovieDetail();
      setShowDetail(false);
    } else {
      setMovieDetail(item);
    }
  };

  return (
    <div className="results-list">
      {props.data?.map((item, index) => (
        <div key={index}>
          <div
            className={`item ${
              showDetail ? (movieDetail?.id === item?.id ? "mrg-bot" : "") : ""
            }`}
          >
            {item?.poster_path !== null && (
              <img
                src={`https://image.tmdb.org/t/p/original${item?.poster_path}`}
                alt=""
                className="movie-img"
                onClick={() => handleClickMovie(item)}
              />
            )}
            {item?.poster_path === null && (
              <div
                className="poster-name"
                onClick={() => handleClickMovie(item)}
              >
                <p>{item?.original_title}</p>
              </div>
            )}
            <div
              className={`detail-panel ${
                showDetail
                  ? item?.id === movieDetail?.id
                    ? ""
                    : "hide"
                  : "hide"
              }`}
            >
              <div className="detail-container">
                <MovieDetail data={movieDetail} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultList;
