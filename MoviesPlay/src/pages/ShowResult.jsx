import { useSelector } from "react-redux"
import MovieCard from "../components/MovieCard"
import MovieCardSkeleton from "../components/MovieCardSkeleton"
import { useEffect, useState } from "react"


function ShowResult() {

    const data = useSelector((state) => state.data.ShowResult)

    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setMovies(data)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [data])

    return (
        <div className="bg-[#0f0f0f] px-6 md:px-16 lg:px-36 pt-25 pb-20 flex flex-col justify-center ">
            <h2 className="text-white mb-5 text-2xl">Search Results :</h2>
            <div className="flex flex-wrap gap-5 justify-center ">
                {!isLoading ?
                    movies.map((movie, index) => (
                        <MovieCard key={index} movie={movie} type={movie?.media_type} />
                    ))
                    : (
                        Array(10).fill(0).map((_, index) => (
                            <MovieCardSkeleton key={index} />
                        ))
                    )}
            </div>

        </div>
    )
}

export default ShowResult