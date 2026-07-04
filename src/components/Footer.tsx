import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-slate-900">
            <div className="mx-auto max-w-7xl px-6 py-8">

                {/* Top Row */}
                <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

                    {/* Navigation */}
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                        <a href="#home" className="hover:text-blue-600 transition">
                            Home
                        </a>
                        <a href="#about" className="hover:text-blue-600 transition">
                            About Us
                        </a>
                        <a href="#policies" className="hover:text-blue-600 transition">
                            Club Policies
                        </a>
                        <a href="#hosting" className="hover:text-blue-600 transition">
                            Hosting
                        </a>
                        <Link to="/members" className="hover:text-blue-600 transition-colors duration-200">
                            Members
                        </Link>

                        <Link to="/bookrummytable" className="hover:text-blue-600 transition-colors duration-200">
                            Book Rummy Table
                        </Link>

                        <Link to="/contact" className="hover:text-blue-600 transition-colors duration-200">
                            Contact
                        </Link>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-blue-600 p-3 text-white transition hover:scale-110 hover:bg-blue-700"
                            aria-label="Facebook"
                        >
                            {/* <Facebook size={18} /> */}
                        </a>

                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-pink-600 p-3 text-white transition hover:scale-110 hover:bg-pink-700"
                            aria-label="Instagram"
                        >
                            {/* <Instagram size={18} /> */}
                        </a>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 border-t border-gray-200 pt-5 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    © {new Date().getFullYear()} Lotus Club, Brisbane • Designed with ❤️ by <span className="font-semibold">Vinod Mathew</span>
                </div>

            </div>
        </footer>
    );
}