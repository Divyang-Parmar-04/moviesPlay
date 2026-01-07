
import {PlayCircle} from 'lucide-react'
import { FaPlay, FaPlayCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useMediaQuery } from "react-responsive";

const MovieHero = ({ movie }) => {

  const navigate = useNavigate()

  const isMobile = useMediaQuery({ maxWidth: 640 });

  function handleWatchNow(id){
    window.scrollTo({top:0,behavior:"smooth"})
    navigate(`/show/media/type/movies/${id}`)
  }

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${!isMobile?movie?.backdrop_path:movie?.poster_path})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-6 md:px-16 lg:px-36">
        <div className="max-w-2xl text-white">
          {/* Brand */}
          <p className="text-red-500 font-semibold tracking-widest mb-3">
            MOVIESPLAY
          </p>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold uppercase">
            {movie?.title}
          </h1>

          {/* Rating & Meta */}
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              ⭐ {movie?.vote_average?.toFixed(1)}
            </span>

            <span>{movie?.release_date?.slice(0, 4)}</span>
            
            <span className="capitalize">
              {movie?.genres?.join("  ")}
            </span>
          </div>

          {/* Overview */}
          <p className="mt-5 text-gray-200 leading-relaxed line-clamp-4">
            {movie?.overview}
          </p>


          {/* Buttons */}
          <div className="mt-8 flex items-center gap-4">
            <button className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-md font-semibold cursor-pointer" onClick={()=>handleWatchNow(movie.id)}>
              <span className='flex gap-2 items-center '><FaPlayCircle className=' h-6 w-6'/>Watch Now</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
