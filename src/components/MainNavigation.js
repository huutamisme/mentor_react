import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function MainNavigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="w-full bg-background shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center bg-background text-customBlue">
                <div className="text-2xl md:text-4xl font-bold">MENTOR</div>

                {/* Desktop menu */}
                <ul className="font-semibold hidden lg:flex space-x-6">
                    {["Home", "About", "Services", "Help & Support"].map((item) => (
                        <li key={item}>
                            <NavLink
                                to={
                                    item === "Home"
                                        ? '/'
                                        : item === "Help & Support"
                                            ? '/support'
                                            : `/${item.toLowerCase()}`
                                }
                                className={({ isActive }) =>
                                    `btn btn-ghost text-2xl ${isActive ? 'underline' : ''}`
                                }
                            >
                                {item}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Search input */}
                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-bordered rounded-3xl pl-3 pr-10 w-40 md:w-auto"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <FaSearch className="text-gray-400" />
                    </span>
                </div>

                {/* Login-Signup buttons */}
                <div className="hidden lg:flex space-x-2">
                    <NavLink to='/login' className="btn text-customBlue rounded-2xl">Log in</NavLink>
                    <NavLink to='/signup' className="btn text-white bg-secondary rounded-2xl">Sign up</NavLink>
                </div>

                {/* Hamburger button */}
                <div className="lg:hidden">
                    <button
                        className="btn btn-ghost"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-16 left-0 w-full bg-base-100 shadow-lg z-50">
                    <ul className="space-y-2 font-semibold flex flex-col p-4">
                        {["Home", "About", "Services", "Help & Support", "Login", "Signup"].map((item) => (
                            <li key={item}>
                                <NavLink
                                    to={
                                        item === "Home"
                                            ? '/'
                                            : item === "Help & Support"
                                                ? '/support'
                                                : `/${item.toLowerCase()}`
                                    }
                                    className={({ isActive }) =>
                                        `text-2xl btn btn-ghost ${isActive ? 'underline' : ''}`
                                    }
                                    onClick={handleLinkClick}
                                >
                                    {item}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}
