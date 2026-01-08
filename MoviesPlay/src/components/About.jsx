function About() {
  return (
    <div className="min-h-screen bg-black text-gray-300 px-6 pb-16 md:pt-25 pt-30">
      <div className="max-w-4xl mx-auto">

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-red-500 mb-8 text-center">
          About MoviesPlay
        </h1>

        {/* About Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-3">
            🎬 What is MoviesPlay?
          </h2>
          <p className="leading-relaxed">
            MoviesPlay is a movie discovery and streaming aggregation platform
            built <span className="text-white font-medium">strictly for entertainment and educational purposes</span>.
            It helps users explore movies, view details, trailers, and access
            publicly available streaming sources from the internet.
          </p>
        </section>

        {/* Disclaimer Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-3">
            ⚠️ Disclaimer
          </h2>
          <p className="leading-relaxed mb-3">
            MoviesPlay does <span className="text-red-400 font-medium">not host, upload, store, or distribute</span>
            any movies, videos, or copyrighted content on its own servers.
          </p>
          <p className="leading-relaxed mb-3">
            All movie-related information, trailers, and streaming links are
            fetched from <span className="text-white font-medium">publicly available third-party APIs</span>.
            MoviesPlay does not control, own, or modify the content provided
            by these sources.
          </p>
          <p className="leading-relaxed">
            MoviesPlay does <span className="text-red-400 font-medium">not support or promote piracy</span> in any form.
            Any concerns regarding copyrighted material should be directed to
            the respective third-party content providers.
          </p>
        </section>

        {/* Fair Use Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-white mb-3">
            ⚖️ Fair Use & API Usage
          </h2>
          <p className="leading-relaxed mb-3">
            MoviesPlay uses movie metadata, posters, and related information
            under the principles of <span className="text-white font-medium">fair use </span>
            for purposes such as discovery, commentary, education, and
            non-commercial demonstration.
          </p>
          <p className="leading-relaxed mb-3">
            All data displayed on MoviesPlay is obtained via official or
            publicly available APIs and is subject to the respective
            providers’ terms of service.
          </p>
          <p className="leading-relaxed">
            Users are encouraged to review the policies of each API provider
            for more information regarding content rights and usage.
          </p>
        </section>

        {/* Credits Section */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-3">
            🤝 Credits & Attribution
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <span className="text-white font-medium">TMDB API</span> – Movie metadata, posters, and information
            </li>
            {/* <li>
              <span className="text-white font-medium">VidAPI</span> – Streaming source aggregation
            </li>
            <li>
              <span className="text-white font-medium">CinemaOS</span> – Streaming data provider
            </li>
            <li>
              <span className="text-white font-medium">MoviesAPI</span> – Additional movie data services
            </li> */}
          </ul>

          <p className="mt-4 text-sm text-gray-500">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </section>

      </div>
    </div>
  );
}

export default About;
