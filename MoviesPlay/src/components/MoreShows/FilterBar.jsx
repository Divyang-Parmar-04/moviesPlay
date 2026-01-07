import {SearchIcon } from "lucide-react";
import { useState } from "react";
import {Link} from 'react-router'


const filters = [
  // "Dual Audio (Hindi) 720P",
  // "Hollywood Movies 1080P",
  // "Telugu",
  "Action",
  "Adventure",
  "Animation",
  // "Cartoon",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Mystery",
  "Romance",
  "Thriller",
  "War",
  // "Web Series",
  // "Tamil 720P",
  // "Punjabi Movies 720P",
];

const FilterBar = ({ activeFilter, setActiveFilter ,onSearch}) => {

  const [genre, setGenre] = useState()

  return (
    <div className=" px-6 py-6 mb-5 ">

      {/* Top Buttons */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <button className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold text-sm cursor-pointer">
          <Link to="/more/boly">Bollywood Movies</Link>
        </button>
        <button className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold text-sm cursor-pointer">
          <Link to="/more/movies">Latest Movies</Link>
        </button>
        <button className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold text-sm cursor-pointer">
          <Link to="/more/holy">Hollywood Movies</Link>
        </button>
        {/* <button className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold text-sm cursor-pointer">
          Join Our Telegram
        </button> */}
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-3 justify-center">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition cursor-pointer  
              ${activeFilter === filter
                ? "bg-red-600 text-white"
                : "bg-[#2a2a2a] text-gray-300 hover:bg-red-600 hover:text-white"
              }
            `}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Find Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => onSearch(activeFilter)}
          className="bg-white text-black px-6 py-2 rounded text-sm cursor-pointer gap-2 flex font-bold">
          <SearchIcon className="w-5" />
          Search
        </button>

      </div>
    </div>
  );
};

export default FilterBar;
