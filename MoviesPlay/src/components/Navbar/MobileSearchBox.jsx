import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setShowResult } from "../../store/dataslice";
import QueryBox from "./QueryBox";

function MobileSearchBox({ }) {

    const dispatch = useDispatch()

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allResult, setAllResult] = useState([])

    const navigate = useNavigate();

    const BASE_URL = "https://api.themoviedb.org/3";
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

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
        <div className="md:hidden fixed top-16 left-0 w-full z-50 bg-black px-4 py-3">
            <div className="flex items-center gap-3">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search movies, series..."
                    className="flex-1 bg-[#111] text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                />

                <button className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition">
                    <Search className="w-5 h-5 text-white" />
                </button>
            </div>

            {query && (
                <QueryBox results={results} loading={loading} handleViewAll={handleViewAll} scrollTop={scrollTop} setQuery={setQuery} GENRE_MAP={GENRE_MAP} />
            )}

        </div>
    )
}

export default MobileSearchBox