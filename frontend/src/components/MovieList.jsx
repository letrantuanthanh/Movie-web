import React, { useState } from "react";
import MovieDetail from "./MovieDetail";

const MovieList = (props) => {
  const [movieDetail, setMovieDetail] = useState();
  const [showDetail, setShowDetail] = useState(false);

  //render detail
  const handleClickMovie = (item, category) => {
    if (!movieDetail) {
      setMovieDetail(item);
      setShowDetail(true);
    } else if (movieDetail?.id === item?.id) {
      if (props.category === props.categoryDetail) {
        setMovieDetail();
        setShowDetail(false);
      } else {
        setMovieDetail(item);
        setShowDetail(true);
      }
    } else {
      setMovieDetail(item);
    }
    props.onClickMovie(category);
  };

  return (
    <>
      <div
        className={`movie-list ${props.category === "original" && "original"}`}
      >
        {props.data?.map((item, index) => (
          <div className="item" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/original${
                props.category === "original"
                  ? item?.poster_path
                  : item?.backdrop_path
              }`}
              alt=""
              className="movie-img"
              onClick={() => handleClickMovie(item, props.category)}
            />
          </div>
        ))}
      </div>
      <div
        className={`movie-detail ${
          showDetail
            ? props.category === props.categoryDetail
              ? ""
              : "hide"
            : "hide"
        }`}
      >
        <MovieDetail data={movieDetail} />
      </div>
    </>
  );
};

export default MovieList;
