
import { HeartIcon, Play } from 'lucide-react'
import { useNavigate } from 'react-router';

const MovieCard = ({ movie , type }) => {
  
  const navigate = useNavigate()

  return (
    <div className="group relative w-37.5 cursor-pointer smooth" onClick={()=>{
      window.scrollTo({
      top: 0,
      behavior: "smooth",
    }),navigate(`/show/media/type/${type}/${movie.id}`)}}>

      {/* Poster */}
      <div className="relative overflow-hidden rounded-md">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="h-56.25 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className=' absolute w-full h-56.25 group-hover:bg-black/40 top-0 left-0 '></div>
      </div>

      {/* Title */}
      <p className="mt-2 text-sm text-gray-200 font-medium line-clamp-2  bottom-2 flex justify-center w-full text-center z-2 ">
        {movie.title||movie.name}
      </p>

     <div className='absolute top-20 left-12 bg-red-600 h-15 w-15 flex justify-center items-center rounded-full opacity-0 group-hover:opacity-100'>
       <span className=''>
        <Play className='text-white'/>
       </span>
     </div>

    </div>
  );
};

export default MovieCard;