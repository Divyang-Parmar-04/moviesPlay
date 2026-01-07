import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

import MovieCardSkeleton from "../components/MovieCardSkeleton";
import MovieCard from "../components/MovieCard";
import MovieDetailsSkeleton from "../components/MovieDetailes/MovieDetailesSkeleton";
import VideoPlayer from "../components/MovieDetailes/VideoPlayer";
import { Play, Video } from "lucide-react";

import { useMediaQuery } from "react-responsive";

const MovieDetails = () => {

    const movieData = useSelector((state) => state.data.popularMovies);
    const serMovies = useSelector((state) => state.data.series);

    const { id, type } = useParams();
    const [movie, setMovie] = useState(null);
    const [smovies, setSMovies] = useState([])
    const [isLoading, setLoading] = useState(true);

    const isMobile = useMediaQuery({ maxWidth: 640 });


    function findBestSuggestion(data) {
        const genres = data?.genres.map((genre) => genre.name)

        const suggestedMovies = type == 'tv' ? serMovies : movieData?.filter((mov) =>
            mov.genres?.some((genre) => genres.includes(genre))
        );

        setSMovies(suggestedMovies)
    }

    const fetchDetails = async (type, id, setMovie, setLoading) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tmdb/${type}/${id}`);
            setMovie(res.data);
            findBestSuggestion(res.data);
        } catch (error) {
            console.error("Fetch failed", error);
        } finally {
            setTimeout(() => setLoading(false), 1500);
        }
    };


    useEffect(() => {
        setLoading(true)

        if (type === "tv") {
            fetchDetails("tv", id, setMovie, setLoading);
        } else {
            fetchDetails("movie", id, setMovie, setLoading);
        }

    }, [movieData, id]);


    return (
        <div className="bg-[#0b0b0b] text-white  ">

            {!isLoading ? (
                <>
                    {/* HERO SECTION */}
                    <div
                        className="relative h-[85vh] bg-cover bg-center pb-120 pt-120 md:py-70"
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
                        }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-black/20"></div>

                        {/* Content */}
                        <div className="relative z-10 flex h-full items-center px-6 md:px-16 lg:px-36">
                            <div className="flex flex-col md:flex-row gap-10 max-w-6xl">

                                {/* Poster */}
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                                    alt={movie?.title}
                                    className="w-55 rounded-lg shadow-lg"
                                />

                                {/* Info */}
                                <div className="max-w-2xl">
                                    <h1 className="text-4xl md:text-5xl font-extrabold">
                                        {movie?.title}
                                    </h1>

                                    {/* Meta */}
                                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-300">
                                        <span className="flex items-center gap-1">
                                            ⭐ {movie?.vote_average?.toFixed(1)}
                                        </span>
                                        <span>{movie?.release_date?.slice(0, 4)}</span>
                                        <span>{movie?.runtime} min</span>
                                        <span className="text-red-500 font-semibold">
                                            {movie?.status}
                                        </span>
                                    </div>

                                    {/* Genres */}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {movie?.genres?.map((g) => (
                                            <span
                                                key={g.id}
                                                className="bg-red-600/20 border border-red-600 text-red-400 px-3 py-1 rounded-full text-xs"
                                            >
                                                {g.name}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Overview */}
                                    <p className="mt-6 text-gray-200 leading-relaxed line-clamp-4">
                                        {movie?.overview}
                                    </p>

                                    {/* Buttons */}
                                    <div className="mt-8 flex flex-wrap gap-4">
                                        <button className="bg-red-600 hover:bg-red-700 cursor-pointer transition px-8 py-3 rounded-md font-semibold" onClick={() => { window.scrollTo({ top: 1400, behavior: "smooth" }) }}>
                                            <span className="flex gap-2 "><Play />Play</span>
                                        </button>
                                        <button className="border border-white/30 px-8 py-3 rounded-md hover:bg-white/10 transition">
                                            + Add to Watchlist
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ABOUT + PLAYER SECTION */}
                    <div className="px-6 md:px-16 lg:px-36 py-14">

                        {/* ABOUT */}
                        <h2 className="text-2xl font-bold mb-6">About</h2>

                        {/* About Content */}
                        <div className="flex flex-col md:flex-row gap-10">

                            {/* Backdrop Image */}
                            <div className="md:w-120 relative overflow-hidden rounded-lg group cursor-pointer">

                                {/* Image */}
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                                    alt={movie?.title}
                                    className="w-full h-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* Dark Overlay */}
                                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* YouTube Play Icon */}
                                <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 ${isMobile?"":"opacity-0 group-hover:opacity-100"} transition-opacity duration-300 z-10`}>

                                    <div className="flex items-center gap-2 px-4 py-2 bg-black/80 rounded-md">
                                        {/* <Video className="w-5 h-5 text-red-500" /> */}
                                        <img
                                            src="/yt.png"
                                            alt="Play Trailer"
                                            className="w-9 h-7"
                                        />
                                        <a href={`https://youtube.com/watch?v=${movie?.videos?.results[0]?.key}`} target="blank">
                                            <h3 className="font-semibold text-white text-sm">
                                                Watch Trailer
                                            </h3>
                                        </a>
                                    </div>

                                </div>

                            </div>


                            {/* Right: Info */}
                            <div className="md:w-1/2 space-y-4 text-sm text-gray-300">
                                <p>
                                    <span className="text-gray-400">Original Language:</span>{" "}
                                    {movie?.original_language}
                                </p>
                                <p>
                                    <span className="text-gray-400">Popularity:</span>{" "}
                                    {movie?.popularity}
                                </p>
                                <p>
                                    <span className="text-gray-400">Vote Count:</span>{" "}
                                    {movie?.vote_count}
                                </p>
                                <p>
                                    <span className="text-gray-400">Release Date:</span>{" "}
                                    {movie?.release_date}
                                </p>

                                <p className="pt-4 leading-relaxed text-gray-200">
                                    {movie?.overview}
                                </p>
                            </div>
                        </div>

                        {/* ================= CAST SECTION ================= */}
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold mb-6">Cast</h2>

                            <div className="flex gap-6 overflow-x-auto pb-4">
                                {movie?.credits?.cast?.slice(0, 12).map((cast) => (
                                    <div
                                        key={cast.id}
                                        className="min-w-30 text-center"
                                    >
                                        <img
                                            src={
                                                cast.profile_path
                                                    ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                                                    : "/avatar-placeholder.png"
                                            }
                                            alt={cast.name}
                                            className="w-25 h-25 object-cover rounded-full"
                                        />
                                        <p className="mt-2 text-sm font-medium text-white">
                                            {cast.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {cast.character}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ================= VIDEO PLAYER ================= */}

                        <VideoPlayer movieId={id} type={type} tvData={movie} />

                    </div>
                </>
            ) : (
                <MovieDetailsSkeleton />
            )}


            {/* SUGGESTED MOVIES (placeholder) */}
            <div className="px-6 md:px-16 lg:px-36 pb-20">
                <h2 className="text-2xl font-bold mb-6">Suggested Movies</h2>
                <div className="flex flex-wrap gap-5 justify-center ">
                    {!isLoading ?
                        smovies.map((movie, index) => (
                            <MovieCard key={index} movie={movie} type={type} />
                        ))
                        : (
                            Array(6).fill(0).map((_, index) => (
                                <MovieCardSkeleton key={index} />
                            ))
                        )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;

