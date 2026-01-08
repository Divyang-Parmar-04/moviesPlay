import { useEffect, useState } from "react";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

const VideoPlayer = ({ movieId, type = "movie" }) => {

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWatchProviders = async (type, id, region = "IN") => {
    let ctype = "movie"
    if (type == "tv") ctype = "tv"
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/tmdb/providers/${ctype}/${id}?region=IN`
    );

    if (!res.ok) throw new Error("Failed to fetch providers");

    return res.json();
  };

  useEffect(() => {
    setLoading(true);

    fetchWatchProviders(type, movieId)
      .then((data) => {
        setProviders(Array.isArray(data.providers) ? data.providers : []);
      })
      .catch((err) => {setProviders([]),console.log(err)})
      .finally(() => setLoading(false));
  }, [movieId, type]);


  if (loading) {
    return (
      <p className="text-gray-400 mt-4">
        Checking official streaming platforms...
      </p>
    );
  }

  if (!providers || providers.length === 0) {
    return (
      <p className="text-gray-400 mt-4">
        No official streaming providers available in your region.
      </p>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-white mb-4">
        Where to Watch
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {providers.map((p,i) => (
          <div
            key={p.provider_id}
            className="bg-[#0f0f0f] border border-white/10 rounded-lg p-4 flex flex-col items-center hover:bg-[#1a1a1a] transition"
          >
            <img
              src={`${IMAGE_BASE}${p.logo_path}`}
              alt={p.provider_name}
              className="w-20 h-20 object-contain"
            />
            <p className="mt-2 text-sm text-gray-300 text-center">
              {p.provider_name}
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Streaming availability provided by TMDB. MoviesPlay does not host or
        stream content.
      </p>
    </div>
  );
};

export default VideoPlayer;
