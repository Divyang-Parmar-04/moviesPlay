import { NavLink } from "react-router";
import MovieCard from "../MovieCard";
import { useEffect, useState } from "react";
import MovieCardSkeleton from "../MovieCardSkeleton";

const MoviesSection = ({ title, movies, type }) => {

  const [isLoading, setIsLoading] = useState(true)
  const [movie,setMovies] = useState([])

  useEffect(() => {
   if (movies.length > 0) {
      setMovies(movies)
      if (movies) {
        setTimeout(() => { setIsLoading(false) }, 2000)
      }
    }
  }, [movies])

  return (
    <section className="mb-12 ">

      {/* Section Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="flex items-center gap-2 bg-red-600 text-white text-bold px-4 py-2 rounded-md mx-2  ">
          {title}
        </h2>

        <button className="text-red-500 text-sm hover:underline">
          <NavLink to={`/more/${type}`}>View more</NavLink>
        </button>
      </div>

      {/* Movies Grid */}
      <div className="flex flex-wrap justify-center gap-5">
        {!isLoading ?
          movie?.slice(0,14).map((movie, index) => (
            <MovieCard key={index} movie={movie} type={type} />
          ))
          : (
            Array(10).fill(0).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))
          )}
      </div>
    </section>
  );
};

export default MoviesSection;
