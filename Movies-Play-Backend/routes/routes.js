const express = require("express")
const {getAllMovies} = require('../controller/movieController');
const { searchTMDB, fetchByGenre, getMovieDetails, getTVDetails,getWatchProviders } = require("../services/tmdb.service");

const router = express.Router()

router.get("/movies/all",getAllMovies)

router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    const results = await searchTMDB(q);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed" });
  }
});

router.post("/search/genre",fetchByGenre)

router.get("/tmdb/movie/:id", getMovieDetails);

router.get("/tmdb/tv/:id", getTVDetails);

router.get("/tmdb/providers/:type/:id", getWatchProviders);

module.exports = router