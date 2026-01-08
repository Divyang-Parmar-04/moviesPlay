import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400">
      <div className="px-6 py-12 md:px-16 lg:px-36">

        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-red-600 text-2xl font-extrabold">M</span>
              <span className="text-white text-xl font-bold">
                moviesPlay
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              moviesPlay is your ultimate destination to discover, explore,
              and enjoy movies & TV shows anytime, anywhere.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-5">
              <Facebook className="w-5 h-5 hover:text-red-500 cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-red-500 cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-red-500 cursor-pointer" />
              <Youtube className="w-5 h-5 hover:text-red-500 cursor-pointer" />
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Movies</li>
              <li className="hover:text-white cursor-pointer">TV Shows</li>
              <li className="hover:text-white cursor-pointer">Trending</li>
              <li className="hover:text-white cursor-pointer">Top Rated</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">About Us</li>
              {/* <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Careers</li> */}
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Help Center</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Terms of Service</li>
              <li className="hover:text-white cursor-pointer">FAQs</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-10"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">moviesPlay</span>. All
            rights reserved.
          </p>
          <p className="mt-3 md:mt-0 text-center">
            Movie data & streams powered by{" "}
            <span className="text-white font-medium">TMDB</span>,{" "}
            {/* <span className="text-white font-medium">VidAPI</span>,{" "}
            <span className="text-white font-medium">CinemaOS</span> &{" "}
            <span className="text-white font-medium">MoviesAPI</span> */}
          </p>
            <p className="mt-3 md:mt-0">
            Built with ❤️ for movie lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
