import { Link } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import lotuslogo from "../assets/lotuslogo.png"
import UserProfileChip from "./UserProfile";


export default function Navbar() {

    const {
        theme,
        toggleTheme
    } = useTheme();


    const [menuOpen, setMenuOpen] = useState(false);

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user") || "null")
    );

    useEffect(() => {

        const updateUser = () => {
            setUser(
                JSON.parse(
                    localStorage.getItem("user") || "null"
                )
            );
        };

        window.addEventListener(
            "storage",
            updateUser
        );

        return () => {
            window.removeEventListener(
                "storage",
                updateUser
            );
        };

    }, []);

    const handleLogout = () => {

        localStorage.removeItem("user");

        setUser(null);

        window.location.href = "/login";

    };


    return (

        <nav
            className="
            bg-white
            dark:bg-slate-900
            shadow-md
            transition
            "
        >

            <div
                className="
                max-w-7xl
                mx-auto
                px-6
                py-4
                flex
                justify-between
                items-center
                "
            >

                {/* Logo */}

                {/* <h1
                    className="
                    text-2xl
                    font-bold
                    text-blue-600
                    "
                >
                    Lotus Club
                </h1> */}
                {/* Logo */}

                <Link
                    to="/"
                    className="
    flex
    items-center
    gap-3
    "
                >

                    <img
                        src={lotuslogo}
                        alt="Lotus Club"
                        className="
        w-14
        h-14
        rounded-full
        object-cover
        border-2
        border-blue-500
        shadow-lg
        transition-transform
        duration-300
        hover:scale-110
        "
                    />

                    <div>

                        <h1
                            className="
            text-2xl
            font-bold
            text-blue-600
            dark:text-blue-400
            leading-none
            "
                        >
                            Lotus Club
                        </h1>

                        <p
                            className="
            text-xs
            text-gray-500
            dark:text-gray-400
            "
                        >
                            Friendship • Fun • Memories
                        </p>

                    </div>

                </Link>



                {/* Desktop Menu */}

                <div
                    className="
                    hidden
                    md:flex
                    items-center
                    gap-8
                    text-gray-700
                    dark:text-white
                    "
                >

                    <Link to="/" className="hover:text-blue-600 transition-colors duration-200">
                        Home
                    </Link>


                    <a href="/#about" className="hover:text-blue-600 transition-colors duration-200">
                        About Us
                    </a>

                    <a href="/#policies" className="hover:text-blue-600 transition-colors duration-200">
                        Club Policies
                    </a>

                    <a href="/#hosting" className="hover:text-blue-600 transition-colors duration-200">
                        Hosting
                    </a>

                    <Link to="/members" className="hover:text-blue-600 transition-colors duration-200">
                        Members
                    </Link>

                    <Link to="/contact" className="hover:text-blue-600 transition-colors duration-200">
                        Contact
                    </Link>

                    {user ? (
                        <>
                            <Link to="/bookrummytable" className="hover:text-blue-600 transition-colors duration-200">
                                Book a Rummy Seat
                            </Link>
                            <UserProfileChip
                                name={user.name}
                                membershipNo={user.membershipNo}
                                role={user.role}
                                onLogout={handleLogout}
                            />
                        </>
                    ) : (
                        <Link to="/login" className="hover:text-blue-600 transition-colors duration-200">
                            Login
                        </Link>
                    )}

                    <button
                        onClick={toggleTheme}
                        className="
                        p-2
                        rounded-full
                        bg-gray-200
                        dark:bg-slate-700
                        hover:scale-110
                        transition
                        "
                    >

                        {
                            theme === "light"
                                ?
                                <Moon size={22} />
                                :
                                <Sun size={22} />
                        }

                    </button>


                </div>




                {/* Mobile Right Icons */}

                <div className="flex md:hidden items-center gap-3">


                    {/* Theme Button */}

                    <button
                        onClick={toggleTheme}
                        className="
                        p-2
                        rounded-full
                        bg-gray-200
                        dark:bg-slate-700
                        "
                    >

                        {
                            theme === "light"
                                ?
                                <Moon size={20} />
                                :
                                <Sun size={20} />
                        }

                    </button>



                    {/* Burger Button */}

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="
                        text-gray-700
                        dark:text-white
                        "
                    >

                        {
                            menuOpen
                                ?
                                <X size={28} />
                                :
                                <Menu size={28} />
                        }

                    </button>


                </div>


            </div>




            {/* Mobile Menu */}

            {
                menuOpen && (

                    <div
                        className="
                        md:hidden
                        px-6
                        pb-5
                        flex
                        flex-col
                        gap-5
                        text-gray-700
                        dark:text-white
                        "
                    >

                        <Link
                            to="/"
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </Link>


                        <a
                            href="/#about"
                            onClick={() => setMenuOpen(false)}
                        >
                            About Us
                        </a>

                        <a href="/#policies"
                            onClick={() => setMenuOpen(false)}
                        >
                            Club Policies
                        </a>

                        <a href="/#hosting"
                            onClick={() => setMenuOpen(false)}
                        >
                            Hosting
                        </a>

                        <Link to="/members"
                            onClick={() => setMenuOpen(false)}
                        >
                            Members
                        </Link>


                        <Link
                            to="/contact"
                            onClick={() => setMenuOpen(false)}
                        >
                            Contact
                        </Link>

                        {user ? (
                            <>
                                <Link to="/bookrummytable" className="hover:text-blue-600 transition-colors duration-200">
                                    Book a Rummy Seat
                                </Link>
                                <UserProfileChip
                                    name={user.name}
                                    membershipNo={user.membershipNo}
                                    role={user.role}
                                    onLogout={handleLogout}
                                />
                            </>
                        ) : (
                            <Link to="/login" className="hover:text-blue-600 transition-colors duration-200">
                                Login
                            </Link>
                        )}


                    </div>

                )
            }


        </nav>

    );
}