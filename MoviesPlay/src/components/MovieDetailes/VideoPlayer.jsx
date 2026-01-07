import { useEffect, useState } from "react";
import { ServerIcon, ChevronDown } from "lucide-react";

const VideoPlayer = ({ movieId, type, tvData }) => {
  if (!movieId) return null;

  /* ------------------ SERVER STATE ------------------ */
  const [server, setServer] = useState(0);
  const [episode, setEpisode] = useState(1);

  /* ------------------ SERIES STATE ------------------ */
  const validSeasons =
    tvData?.seasons?.filter((s) => s.season_number !== 0) || [];

  const [season, setSeason] = useState(
    validSeasons[0]?.season_number || 1
  );

  /* Reset episode when season changes */
  useEffect(() => {
    setEpisode(1);
  }, [season]);


  /* ------------------ PLAYERS ------------------ */
  const tvShowPlayers = [
    {
      name: "movies-Tv",
      url: `https://moviesapi.pro/tv/${movieId}/${season}/${episode}`,
    },
    {
      name: "CinemaOS-Tv",
      url: `https://cinemaos.tech/player/${movieId}/${season}/${episode}`,
    },
  ];

  const moviePlayer = [
    { name: "moviesApi", url: `https://moviesapi.pro/movie/${movieId}` },
    { name: "VidPlayer", url: `https://vidapi.xyz/embed/movie/${movieId}` },
    { name: "CinemaOS", url: `https://cinemaos.tech/player/${movieId}` },

  ];

  const currentSrc =
    type === "tv"
      ? tvShowPlayers[server]?.url
      : moviePlayer[server]?.url;

  /* ------------------ CURRENT SEASON DATA ------------------ */
  const currentSeason = validSeasons.find(
    (s) => s.season_number === season
  );

  const totalEpisodes = currentSeason?.episode_count || 1;

  return (
    <div className="mt-10 flex flex-col items-center">

      {/* ================= PLAYER ================= */}
      <div className="w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden border border-white/10">
        <iframe
          key={`${season}-${episode}-${server}`}
          src={currentSrc}
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* ================= CONTROLS ================= */}
      <div className="bg-black mt-4 w-full max-w-5xl rounded border border-white/10 p-3">

        {/* -------- SERVERS -------- */}
        <div className="flex flex-wrap  md:flex-row flex-col gap-2">
          <span className="flex items-center gap-2 text">
            <ServerIcon size={18} /> Servers
          </span>

          {(type === "tv" ? tvShowPlayers : moviePlayer).map(
            (play, index) => (
              <button
                key={index}
                onClick={() => setServer(index)}
                className={`px-3 py-1 w-50 rounded transition ${server === index
                  ? "bg-red-600"
                  : "bg-[#0f0f0f] hover:bg-red-500"
                  }`}
              >
                {play.name}
              </button>
            )
          )}
        </div>

        {/* -------- SEASON & EPISODE (SERIES ONLY) -------- */}
        {type === "tv" && (
          <div className="mt-4 grid grid-cols-2 gap-3">

            {/* Season Select */}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Season
              </label>
              <div className="relative">
                <select
                  value={season}
                  onChange={(e) => setSeason(Number(e.target.value))}
                  className="w-full bg-[#0f0f0f] text-sm px-3 py-2 rounded appearance-none"
                >
                  {validSeasons.map((s) => (
                    <option
                      key={s.id}
                      value={s.season_number}
                    >
                      {s.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {/* Episode Select */}
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Episode
              </label>
              <div className="relative">
                <select
                  value={episode}
                  onChange={(e) => setEpisode(Number(e.target.value))}
                  className="w-full bg-[#0f0f0f] text-sm px-3 py-2 rounded appearance-none"
                >
                  {Array.from({ length: totalEpisodes }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Episode {i + 1}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
