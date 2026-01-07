import { useSelector } from "react-redux";
import MovieHero from "../components/Home/MovieHero";
import { useEffect, useState } from "react";
import MoviesSection from "../components/Home/MoviesSection";
import MovieHeroSkeleton from "../components/Home/MovieHeroSkeleton";

function Home() {

  const popMovies = useSelector((state) => state.data.popularMovies);
  const holMovies = useSelector((state) => state.data.hollywoodMovies);
  const bolMovies = useSelector((state) => state.data.bollywoodMovies);
  const serMovies = useSelector((state) => state.data.series);

  const [movie, setMovie] = useState(null);
  const [isLoading , setIsLoading] = useState(true)

  useEffect(() => {
    if (popMovies && popMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * popMovies.length);
      setMovie(popMovies[randomIndex]);

      setTimeout(()=>{setIsLoading(false)},1000)
    }
  }, [popMovies]);
  


  return (
    <div>
       {!isLoading?(
         <MovieHero movie={movie} />
       ):(<MovieHeroSkeleton/>)}
      <div className="bg-[#0f0f0f] px-6 md:px-16 lg:px-36 py-10">
        <MoviesSection title="Latest Movies" movies={holMovies} type="movies"/>
        <MoviesSection title="Hollywood Movies" movies={holMovies} type="holy" />
        <MoviesSection title="Bollywood Movies" movies={bolMovies} type="boly" />
        <MoviesSection title="Tv Shows / Series" movies={serMovies} type="tv" />
      </div>
    </div>
  );
}

export default Home;
