const Movies = require("../models/movies");
const Videos = require("../models/videos");

const paginateData = require("../ultils/paging");

exports.getTrending = (req, res, next) => {
  const page = req.query.page;

  Movies.fetchAll((movies) => {
    const newArr = movies.sort((a, b) => a.popularity - b.popularity).reverse();

    const pagiData = paginateData(newArr, page);

    res.json({
      results: pagiData.data,
      page: pagiData.page,
      total_pages: pagiData.totalPages,
    });
  });
};

exports.getRating = (req, res, next) => {
  const page = req.query.page;

  Movies.fetchAll((movies) => {
    const newArr = movies
      .sort((a, b) => a.vote_average - b.vote_average)
      .reverse();
    const pagiData = paginateData(newArr, page);

    res.json({
      results: pagiData.data,
      page: pagiData.page,
      total_pages: pagiData.totalPages,
    });
  });
};

exports.getDiscover = (req, res, next) => {
  const page = req.query.page;
  const genre = req.query.genre;
  if (!genre) {
    res.status(400).send({ message: "Not found gerne param" });
    res.end();
  } else {
    Movies.fetchAll((movies) => {
      const newArr = movies.filter((item) =>
        item.genre_ids.includes(Number(genre))
      );

      if (newArr.length === 0) {
        res.status(400).send({ message: "Not found that gerne id" });
        res.end();
      } else {
        const pagiData = paginateData(newArr, page);

        res.json({
          results: pagiData.data,
          page: pagiData.page,
          total_pages: pagiData.totalPages,
        });
      }
    });
  }
};

exports.getVideo = (req, res, next) => {
  const filmId = req.body.film_id;

  if (!filmId) {
    res.status(400).send({ message: "Not found film_id parram" });
    res.end();
  } else {
    Videos.fetchAll((vids) => {
      const dataById = vids.filter((item) => item.id === Number(filmId));

      if (dataById.length === 0) {
        res.status(404).send({ message: "Not found video" });
        res.end();
      } else {
        const videosById = dataById[0].videos;

        const newArr = videosById
          .filter(
            (item) =>
              item?.type === "Trailer" &&
              item.official === true &&
              item.site === "YouTube"
          )
          .sort((a, b) => {
            const aTime = new Date(a.published_at);
            const bTime = new Date(b.published_at);
            return aTime.getTime() - bTime.getTime();
          })
          .reverse()
          .concat(
            videosById
              .filter(
                (item) =>
                  item?.type === "Teaser" &&
                  item.official === true &&
                  item?.site === "YouTube"
              )
              .sort((a, b) => {
                const aTime = new Date(a.published_at);
                const bTime = new Date(b.published_at);
                return aTime.getTime() - bTime.getTime();
              })
              .reverse(),
            videosById
              .filter(
                (item) =>
                  item?.type === "Featurette" &&
                  item.official === true &&
                  item?.site === "YouTube"
              )
              .sort((a, b) => {
                const aTime = new Date(a.published_at);
                const bTime = new Date(b.published_at);
                return aTime.getTime() - bTime.getTime();
              })
              .reverse(),
            videosById
              .filter(
                (item) =>
                  item?.type === "Clip" &&
                  item.official === true &&
                  item?.site === "YouTube"
              )
              .sort((a, b) => {
                const aTime = new Date(a.published_at);
                const bTime = new Date(b.published_at);
                return aTime.getTime() - bTime.getTime();
              })
              .reverse()
          );

        if (newArr.length === 0) {
          res.status(404).send({ message: "Not found video" });
          res.end();
        } else {
          const pagiData = paginateData(newArr);

          res.json({
            results: pagiData.data,
            page: pagiData.page,
            total_pages: pagiData.totalPages,
          });
        }
      }
    });
  }
};

exports.searchMovie = (req, res, next) => {
  const keyword = req.body.keyword;
  const genre = req.body.genre;
  const mediaType = req.body.mediaType;
  const language = req.body.language;
  const year = req.body.year;

  if (!keyword) {
    res.status(400).send({ message: "Not found keyword parram" });
    res.end();
  } else {
    Movies.fetchAll((movies) => {
      let newArr = movies.filter(
        (item) =>
          item?.title?.toLowerCase().includes(keyword.toLowerCase()) ||
          item?.overview?.toLowerCase().includes(keyword.toLowerCase())
      );

      if (genre) {
        let genreId;
        if (genre.toLowerCase() === "action") {
          genreId = 28;
        } else if (genre.toLowerCase() === "comedy") {
          genreId = 35;
        } else if (genre.toLowerCase() === "horror") {
          genreId = 27;
        } else if (genre.toLowerCase() === "romance") {
          genreId = 10749;
        } else if (genre.toLowerCase() === "documentaries") {
          genreId = 10749;
        } else {
          genreId = undefined;
        }

        if (genreId) {
          newArr = newArr.filter((item) => item.genre_ids.includes(genreId));
        }
      }

      if (mediaType) {
        newArr = newArr.filter((item) => item.media_type === mediaType);
      }

      if (language) {
        newArr = newArr.filter((item) => item.original_language === language);
      }

      if (year) {
        newArr = newArr.filter((item) => {
          const itemDate = new Date(item.release_date);

          return itemDate.getFullYear() === Number(year);
        });
      }

      const pagiData = paginateData(newArr);

      res.json({
        results: pagiData.data,
        page: pagiData.page,
        total_pages: pagiData.totalPages,
      });
    });
  }
};
