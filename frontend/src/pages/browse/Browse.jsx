import React, { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import MovieList from "../../components/MovieList";

import "../../styles/browse.css";

function Browse() {
  //begin state
  const [originalMovies, setOriginalMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);
  const [documentaries, setDocumentaries] = useState([]);

  const [categoryDetail, setCategoryDetail] = useState("");

  //API Key
  // const API_KEY = "b65cd56f1e4f2985b66604d9c45fbffc";

  const userToken = "8qlOkxz4wq";

  const requests = {
    fetchTrending: `http://localhost:5000/api/movies/trending?token=${userToken}`,
    fetchNetflixOriginals: `http://localhost:5000/api/movies/trending?token=${userToken}&genre=18`,
    fetchTopRated: `http://localhost:5000/api/movies/top-rate?token=${userToken}`,
    fetchActionMovies: `http://localhost:5000/api/movies/discover?token=${userToken}&genre=28`,
    fetchComedyMovies: `http://localhost:5000/api/movies/discover?token=${userToken}&genre=35`,
    fetchHorrorMovies: `http://localhost:5000/api/movies/discover?token=${userToken}&genre=27`,
    fetchRomanceMovies: `http://localhost:5000/api/movies/discover?token=${userToken}&genre=10749`,
    fetchDocumentaries: `http://localhost:5000/api/movies/discover?token=${userToken}&genre=99`,
    // fetchSearch: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US`,
  };

  //fetch API
  const fetchMovies = async () => {
    const responseData = await Promise.all([
      fetch(requests.fetchNetflixOriginals),
      fetch(requests.fetchTrending),
      fetch(requests.fetchTopRated),
      fetch(requests.fetchActionMovies),
      fetch(requests.fetchComedyMovies),
      fetch(requests.fetchHorrorMovies),
      fetch(requests.fetchRomanceMovies),
      fetch(requests.fetchDocumentaries),
    ]);

    const data1 = await responseData[0].json();
    const data2 = await responseData[1].json();
    const data3 = await responseData[2].json();
    const data4 = await responseData[3].json();
    const data5 = await responseData[4].json();
    const data6 = await responseData[5].json();
    const data7 = await responseData[6].json();
    const data8 = await responseData[7].json();

    setOriginalMovies(data1.results);
    setTrendingMovies(data2.results);
    setTopRatedMovies(data3.results);
    setActionMovies(data4.results);
    setComedyMovies(data5.results);
    setHorrorMovies(data6.results);
    setRomanceMovies(data7.results);
    setDocumentaries(data8.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Banner />
      <div className="browse-content">
        <MovieList
          data={originalMovies}
          categoryDetail={categoryDetail}
          onClickMovie={(category) => setCategoryDetail(category)}
          category="original"
        />

        <h3 className="category">Xu hướng</h3>
        <MovieList
          data={trendingMovies}
          categoryDetail={categoryDetail}
          onClickMovie={(category) => setCategoryDetail(category)}
          category="trending"
        />

        <h3 className="category">Xếp hạng cao</h3>
        <MovieList
          data={topRatedMovies}
          categoryDetail={categoryDetail}
          onClickMovie={(category) => setCategoryDetail(category)}
          category="toprated"
        />

        <h3 className="category">Hành động</h3>
        <MovieList
          data={actionMovies}
          categoryDetail={categoryDetail}
          onClickMovie={(category) => setCategoryDetail(category)}
          category="action"
        />

        <h3 className="category">Hài</h3>
        <MovieList
          data={comedyMovies}
          categoryDetail={categoryDetail}
          onClickMovie={(category) => setCategoryDetail(category)}
          category="comedy"
        />

        <h3 className="category">Kinh dị</h3>
        <MovieList
          data={horrorMovies}
          categoryDetail={categoryDetail}
          onClickMovie={(category) => setCategoryDetail(category)}
          category="horror"
        />

        <h3 className="category">Lãng mạn</h3>
        <MovieList
          data={romanceMovies}
          categoryDetail={categoryDetail}
          onClickMovie={(category) => setCategoryDetail(category)}
          category="romance"
        />

        <h3 className="category">Tài liệu</h3>

        <MovieList
          data={documentaries}
          categoryDetail={categoryDetail}
          onClickMovie={(category) => setCategoryDetail(category)}
          category="documentaries"
        />
      </div>
    </div>
  );
}

export default Browse;
