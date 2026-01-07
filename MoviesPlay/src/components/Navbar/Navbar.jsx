import { Search, User, Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import SearchBox from "./SearchBox";
import MobileSearchBox from "./MobileSearchBox";

const Navbar = () => {

  const navigate = useNavigate()

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 770);
  const [isSearch, setIsSearch] = useState(false);
  const [isDesktopSearch, setIsDesktopSearch] = useState(false);


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 770);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 z-50 w-full ${scrolled ? "bg-black" : "bg-black/60"
          } transition-colors duration-500`}
      >
        <div className="flex items-center justify-between px-6 py-4 md:px-16 lg:px-36">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-red-600 text-2xl font-extrabold">M</span>
            <span className="text-white text-xl font-bold tracking-wide cursor-pointer" onClick={() => navigate("/")}>
              moviesPlay
            </span>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8 text-[16px] font-semibold text-gray-300">
            {["/", "/more/movies", "/more/tv"].map((path, i) => (
              <li key={i}>
                <NavLink
                  to={path}
                  onClick={scrollTop}
                  className={({ isActive }) =>
                    isActive ? "text-red-500" : "hover:text-white"
                  }
                >
                  {path === "/"
                    ? "Home"
                    : path.includes("movies")
                      ? "Movies"
                      : "TV Shows"}
                </NavLink>
              </li>
            ))}
            <li><NavLink to="/about" onClick={scrollTop}
              className={({ isActive }) =>
                isActive ? "text-red-500" : "hover:text-white"
              }>About</NavLink></li>
          </ul>

          {/* Right Icons */}
          <div className="flex items-center gap-4 text-white">
            {isMobile ? (
              <button onClick={() => setIsSearch(!isSearch)}>
                {!isSearch ? (
                  <Search className="w-5 h-5 cursor-pointer hover:text-red-500" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            ) : (
              <>
                <SearchBox />
              </>
            )}
            {/* Mobile Menu Button */}
            <Menu
              onClick={() => setOpen(true)}
              className="w-6 h-6 cursor-pointer md:hidden"
            />

            {/* Profile */}
            <div className="hidden md:flex w-9 h-9 items-center justify-center rounded-full bg-red-600">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Serach BOX for mobile screen */}
        {isSearch && (
          <MobileSearchBox />
        )}


      </nav>



      {/* ================= MOBILE SIDEBAR ================= */}
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-white text-lg font-bold">moviesPlay</span>
          <X
            className="text-white cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        {/* Links */}
        <ul className="flex flex-col gap-5 px-6 py-6 text-gray-300 text-base font-medium">
          <NavLink to="/" onClick={scrollTop} className="hover:text-red-500">
            Home
          </NavLink>
          <NavLink to="/more/movies" onClick={scrollTop} className="hover:text-red-500">
            Movies
          </NavLink>
          <NavLink to="/more/series" onClick={scrollTop} className="hover:text-red-500">
            TV Shows
          </NavLink>
          <NavLink to="/about" onClick={scrollTop}
              className={({ isActive }) =>
                isActive ? "text-red-500" : "hover:text-white"
              }>About</NavLink>
          {/* <li className="hover:text-red-500 cursor-pointer">Blog</li>
          <li className="hover:text-red-500 cursor-pointer">Pages</li> */}
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
