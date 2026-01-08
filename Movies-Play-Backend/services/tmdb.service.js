const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const BASE_URL = process.env.TMDB_BASE_URL;
const API_KEY = process.env.TMDB_API_KEY;


const GENRE_MAP = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Mystery: 9648,
  Romance: 10749,
  Thriller: 53,
  War: 10752,
};

/* Attach genre names to movies */
const attachGenres = (movies, genreMap) => {
  return movies.map(movie => ({
    ...movie,
    genres: movie.genre_ids?.map(id => genreMap[id]) || []
  }));
};

/* Fetch all movie genres */
const getGenreMap = async () => {
  const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY }
  });

  const map = {};
  res.data.genres.forEach(g => {
    map[g.id] = g.name;
  });

  return map;
};

/* TMDB Calls */
const fetchPopularMovies = async (genreMap) => {
  const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
    params: { api_key: API_KEY }
  });

  return attachGenres(res.data.results, genreMap);
};

const fetchHollywoodMovies = async (genreMap) => {
  const res = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      with_original_language: "en",
      sort_by: "popularity.desc"
    }
  });

  return attachGenres(res.data.results, genreMap);
};

const fetchBollywoodMovies = async (genreMap) => {
  const res = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      with_original_language: "hi",
      region: "IN",
      sort_by: "popularity.desc"
    }
  });

  return attachGenres(res.data.results, genreMap);
};

const fetchSeries = async (genreMap) => {
  const res = await axios.get(`${BASE_URL}/discover/tv`, {
    params: {
      api_key: API_KEY,
      with_watch_providers: "8|9|337",
      watch_region: "IN",
      sort_by: "popularity.desc"
    }
  });

  return attachGenres(res.data.results, genreMap);
};

//TMDB SEARCH
const searchTMDB = async (query) => {
  if (!query) return [];

  const res = await axios.get(`${BASE_URL}/search/multi`, {
    params: {
      api_key: API_KEY,
      query,
      include_adult: false,
    },
  });

  // filter only movies & tv
  return res.data.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv"
  );
};


//TMDB FILLTERS
const fetchByGenre = async (req, res) => {
  const {
    genreName,
    type = "movie", // "movie" | "tv"
  } = req.body;

  try {
    let page = 1;

    const genreId = GENRE_MAP[genreName];
    if (!genreId) {
      return res.json({ data: [], msg: "NO GENRE" });
    }

    const axiosRes = await axios.get(`${BASE_URL}/discover/${type}`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        sort_by: "popularity.desc",
        page,
      },
    });

    const data = axiosRes.data.results.map(item => ({
      ...item,
      type, // inject media type
    }));

    return res.json({ data, msg: "true" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ data: [], msg: "error" });
  }
};


//TMDB ALL DETAILES 

// Fetch Movie Details
const getMovieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "credits,videos,watch/providers",
      },
    });

    const data = response.data;

    const movieData = {
      ...data,

      // 🎭 Cast (top 10)
      cast: data.credits?.cast?.slice(0, 10) || [],

      // ▶ Trailer
      trailer:
        data.videos?.results?.find(
          v => v.type === "Trailer" && v.site === "YouTube"
        )?.key || null,

      // 📺 OTT Platforms (India)
      ott: data["watch/providers"]?.results?.IN?.flatrate || [],
    };

    res.status(200).json(movieData);

  } catch (error) {
    console.error("Movie fetch failed", error.message);
    res.status(500).json({ message: "Failed to fetch movie details" });
  }
};

//  Fetch TV Show Details
const getTVDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${BASE_URL}/tv/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "credits,videos,watch/providers",
      },
    });

    const data = response.data;

    const tvData = {
      ...data,

      cast: data.credits?.cast?.slice(0, 10) || [],

      trailer:
        data.videos?.results?.find(
          v => v.type === "Trailer" && v.site === "YouTube"
        )?.key || null,

      ott: data["watch/providers"]?.results?.IN?.flatrate || [],
    };

    res.status(200).json(tvData);

  } catch (error) {
    console.error("TV fetch failed", error.message);
    res.status(500).json({ message: "Failed to fetch TV show details" });
  }
};



const getWatchProviders = async (req,res)=> {
  try {
    const { type, id } = req.params;
    const region = req.query.region || "IN"; // default India

    if (!["movie", "tv"].includes(type)) {
      return res.status(400).json({ message: "Invalid type" });
    }

    const response = await fetch(
      `${BASE_URL}/${type}/${id}/watch/providers`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    const providers =
      data?.results?.[region]?.flatrate ||
      data?.results?.[region]?.rent ||
      data?.results?.[region]?.buy ||
      [];

    res.json({
      region,
      providers,
    });
  } catch (error) {
    console.error("TMDB Watch Provider Error:", error);
    res.status(500).json({ message: "Failed to fetch watch providers" });
  }
}


module.exports = { getWatchProviders,fetchByGenre, fetchBollywoodMovies, fetchHollywoodMovies, fetchPopularMovies, fetchSeries, getGenreMap, searchTMDB , getMovieDetails,getTVDetails } 
