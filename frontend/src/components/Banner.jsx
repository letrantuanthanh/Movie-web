import React, { useEffect, useState } from "react";

const Banner = () => {
  const [randomMovie, setRandomMovie] = useState({});
  // const [isLoading, setIsLoading] = useState(true);

  const API_KEY = "b65cd56f1e4f2985b66604d9c45fbffc";

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_network=123`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      setRandomMovie(
        responseData.results[
          Math.floor(Math.random() * responseData.results.length - 1)
        ]
      );
    };

    fetchMovie().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div className="banner">
      <img
        src={
          randomMovie.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}`
            : "https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
        }
        alt=""
        className="banner-bg-img"
      />
      <div className="info">
        <p className="title">{randomMovie?.name}</p>
        <div className="button-group">
          <button>Play</button>
          <button>My list</button>
        </div>
        <span className="description">
          {randomMovie.overview ? randomMovie.overview : randomMovie.name}
        </span>
      </div>
    </div>
  );
};

export default Banner;
