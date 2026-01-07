const {
  getGenreMap,
  fetchPopularMovies,
  fetchHollywoodMovies,
  fetchBollywoodMovies,
  fetchSeries
} = require("../services/tmdb.service.js");


const getAllMovies = async (req, res) => {
  try {
    const genreMap = await getGenreMap();

    const [
      popular,
      hollywood,
      bollywood,
      series
    ] = await Promise.all([
      fetchPopularMovies(genreMap),
      fetchHollywoodMovies(genreMap),
      fetchBollywoodMovies(genreMap),
      fetchSeries(genreMap)
    ]);

    res.json({
      popular,
      hollywood,
      bollywood,
      series
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

module.exports = {getAllMovies}
