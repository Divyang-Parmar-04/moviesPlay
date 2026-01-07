import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setShowResult } from "../../store/dataslice";
import QueryBox from "./QueryBox";

const SearchBox = () => {

    const dispatch = useDispatch()

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allResult, setAllResult] = useState([])

    const [isDesktopSearch, setIsDesktopSearch] = useState(false);

    const navigate = useNavigate();


    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const searchTMDB = async (query) => {
        if (!query) return [];

        try {
            if (!query) return [];

            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/search?q=${query}`
            );

            return res.data; // ✅ THIS works
        } catch (err) {
            alert("Something went wrong");
            return [];
        }

    };

    const GENRE_MAP = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        18: "Drama",
        10749: "Romance",
        27: "Horror",
        53: "Thriller",
        99: "Documentary",
    };


    useEffect(() => {
        const delay = setTimeout(async () => {
            if (!query) {
                setResults([]);
                return;
            }
            setLoading(true);
            const data = await searchTMDB(query);
            setResults(data.slice(0, 5));
            setAllResult(data)
            setLoading(false);
        }, 400);

        return () => clearTimeout(delay);
    }, [query]);

    function handleViewAll() {
        if (allResult.length != 0) {
            dispatch(setShowResult(allResult))
            setTimeout(() => {
                navigate("/search/results")
                setQuery("")
            }, 500)
            scrollTop()
        }
    }

    return (
        <div className="relative">
            {/* Search Input */}
            <div className="hidden md:flex items-center relative">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search movies, series..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus={isDesktopSearch}
                    className={`
                    absolute right-10
                    bg-black text-white
                    border border-gray-600
                    px-4 py-1.5
                    rounded-md
                    outline-none
                    transition-all duration-300 ease-in-out
                    origin-right
                    ${isDesktopSearch
                            ? "w-64 scale-x-100 opacity-100"
                            : "w-0 scale-x-0 opacity-0 pointer-events-none"
                        }
                    `}
                />

                {/* Search Button */}
                <button onClick={() => setIsDesktopSearch(!isDesktopSearch)}>
                    <Search className="w-5 h-5 cursor-pointer hover:text-red-500" />
                </button>
            </div>


            {/* Dropdown */}
            {query && (
                <QueryBox results={results} loading={loading} handleViewAll={handleViewAll} scrollTop={scrollTop} setQuery={setQuery} GENRE_MAP={GENRE_MAP} />
            )}
        </div>
    );
};

export default SearchBox;
