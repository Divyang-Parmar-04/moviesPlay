import MoviesSection from "../components/Home/MoviesSection"
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/MoreShows/FilterBar";
import MovieCardSkeleton from "../components/MovieCardSkeleton";

import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from 'axios'


function MoreShow() {

    const parms = useParams('type').type
    const popMovies = useSelector((state) => state.data.popularMovies);
    const holMovies = useSelector((state) => state.data.hollywoodMovies);
    const bolMovies = useSelector((state) => state.data.bollywoodMovies);
    const serMovies = useSelector((state) => state.data.series);

    const [movies, setMovie] = useState([])

    function handleGetMovies() {
        if (parms == 'movies') {
            setMovie(popMovies)
        }
        else if (parms == 'holy') {
            setMovie(holMovies)
        }
        else if (parms == 'boly') {
            setMovie(bolMovies)
        }
        else {
            setMovie(serMovies)
        }
    }

    const [isLoading, setIsLoading] = useState(false)
    const [activeFilter, setActiveFilter] = useState("");
    const [noMovie, setNoMovies] = useState(false)

    const handleSearch = async (filter) => {
        // decide movie or tv
        setIsLoading(true)
        setNoMovies(false)
        const type = filter.includes("Series") ? "tv" : "movie";

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/search/genre`, { genreName: filter, type: type })
            .then((res) => {
                setMovie(res.data.data)
                setTimeout(() => {
                    setIsLoading(false)
                    if (res.data.data.length == 0) {
                        setNoMovies(true)
                    }
                }, 1000)

            })
            .catch((err) => {
                console.log(err)
                alert("somthing went wrong")
            })

    }

    useEffect(() => {
        setIsLoading(true)
        setNoMovies(false)
        handleGetMovies()
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)

    }, [parms, popMovies])

    return (
        <div className="bg-[#0f0f0f] px-6 md:px-16 lg:px-36 pt-20 pb-20 flex flex-col justify-center ">

            {/*Filter Bar  */}
            <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} onSearch={handleSearch} />

            <div className="flex flex-wrap gap-5 justify-center ">
                {!isLoading ?
                    movies?.map((movie, index) => (
                        <MovieCard key={index} movie={movie} type={parms} />
                    ))
                    : (
                        Array(10).fill(0).map((_, index) => (
                            <MovieCardSkeleton key={index} />
                        ))
                    )}
                {noMovie && (<h1 className="text-2xl text-white">No Movies Found</h1>)}
            </div>


        </div>
    )
}

export default MoreShow