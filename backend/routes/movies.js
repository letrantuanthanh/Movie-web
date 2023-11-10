const express = require("express");

const router = express.Router();

const moviesController = require("../controllers/movies");

router.get("/api/movies/trending", moviesController.getTrending);

router.get("/api/movies/top-rate", moviesController.getRating);

router.get("/api/movies/discover", moviesController.getDiscover);

router.post("/api/movies/video", moviesController.getVideo);

router.post("/api/movies/search", moviesController.searchMovie);

module.exports = router;
