import React, { useCallback, useEffect, useState } from "react";
import YouTube from "react-youtube";

const MovieDetail = (props) => {
  const [video, setVideo] = useState([]);
  const [videoNotFound, setVideoNotFound] = useState(false);

  const userToken = "8qlOkxz4wq";

  //style component youtube
  const opts = {
    height: "320px",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  //fetch API video
  const fetchVideo = useCallback(async () => {
    // const response = await fetch(
    //   `https://api.themoviedb.org/3/movie/${props.data?.id}/videos?api_key=b65cd56f1e4f2985b66604d9c45fbffc`
    // );

    // if (!response.ok) {
    //   setVideoNotFound(true);
    //   return;
    // }

    // const videoDatas = await response.json();
    // const videos = videoDatas?.results;

    // if (videos.length < 1) {
    //   setVideoNotFound(true);
    // } else {
    //   const filterData = videos
    //     .filter((item) => item?.type === "Trailer" && item?.site === "YouTube")
    //     .concat(
    //       videos.filter(
    //         (item) => item?.type === "Teaser" && item?.site === "YouTube"
    //       ),
    //       videos.filter(
    //         (item) => item?.type === "Featurette" && item?.site === "YouTube"
    //       ),
    //       videos.filter(
    //         (item) => item?.type === "Clip" && item?.site === "YouTube"
    //       )
    //     );

    //   setVideo(filterData);
    // }

    try {
      const response = await fetch(
        `http://localhost:5000/api/movies/video?token=${userToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ film_id: props.data.id }),
        }
      );

      if (!response.ok) {
        setVideoNotFound(true);
        return;
      }

      const videoDatas = await response.json();
      const videos = videoDatas?.results;
      setVideo(videos);
    } catch (err) {
      console.log(err);
    }
  }, [props.data]);

  useEffect(() => {
    if (!props.data) return;
    setVideoNotFound(false);
    fetchVideo();
  }, [fetchVideo, props.data]);

  return (
    <div className="detail-section">
      <div className="detail">
        <h2 className="movie-name">
          {props.data?.original_title || props.data?.name}
        </h2>
        <p>
          Release Date: {props.data?.release_date || props.data?.first_air_date}
        </p>
        <p>Vote: {props.data?.vote_average}/10</p>
        <p className="description">{props.data?.overview}</p>
      </div>
      <div className="trailer">
        {!videoNotFound && <YouTube videoId={video?.[0]?.key} opts={opts} />}
        {videoNotFound && (
          <img
            src={
              props.data?.backdrop_path
                ? `https://image.tmdb.org/t/p/original/${props.data?.backdrop_path}`
                : "https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
            }
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
