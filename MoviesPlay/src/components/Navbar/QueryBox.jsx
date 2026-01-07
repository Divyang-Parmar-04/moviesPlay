import React from 'react'
import { useNavigate } from 'react-router'

function QueryBox({loading,results,scrollTop,setQuery,handleViewAll,GENRE_MAP}) {
     
    const navigate = useNavigate()
    
    return (
        <div className="absolute md:top-12 top-15 right-5 md:right-0 w-80 bg-[#0f0f0f] rounded-md shadow-xl overflow-hidden z-50 border-black border">
            {loading && (
                <p className="p-3 text-sm text-white ">Searching...</p>
            )}

            {results.map((item) => (
                <div
                    key={item.id}
                    onClick={() => {
                        setTimeout(() => {
                            navigate(`/show/media/type/${item?.media_type}/${item.id}`),
                            setQuery("")
                            scrollTop()
                        }, 500)
                    }
                    }
                    className="flex gap-3 p-3 hover:bg-black cursor-pointer "
                >
                    <img
                        src={
                            item.poster_path
                                ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                                : "/no-poster.png"
                        }
                        className="w-12 h-16 object-cover rounded"
                    />

                    <div className="flex flex-col">
                        <h4 className="text-sm font-semibold text-white">
                            {item.title || item.name}
                        </h4>

                        <p className="text-xs text-gray-200">
                            {(item.release_date || item.first_air_date)?.slice(0, 4)}
                        </p>

                        <p className="text-xs text-red-600 line-clamp-2">
                            {item.genre_ids
                                ?.slice(0, 3)
                                .map((id) => GENRE_MAP[id])
                                .join(", ")}
                        </p>
                    </div>
                </div>
            ))}

            {/* View All */}
            <button
                onClick={handleViewAll}
                className="w-full bg-red-600 cursor-pointer text-white py-2 text-sm font-semibold hover:bg-black"
            >
                View all
            </button>
        </div>
    )
}

export default QueryBox