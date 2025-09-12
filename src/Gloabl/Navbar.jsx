import { useContext, useState } from "react";
import { ThemeContext } from "./Theme";

import {
    User,
    LogOut,
    Sun,
    Moon,
    Home,
    Settings,
    UserCheck,
    Lock,
} from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = ({ user, onSignOut }) => {
    const { theme, setTheme } = useContext(ThemeContext);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-100 dark:bg-gray-800 shadow p-4 flex justify-between items-center">
            <div className="flex space-x-4 items-center">
                <Link
                    to="/"
                    className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 font-semibold text-lg"
                >
                    <Home size={20} />
                    <span>MyApp</span>
                </Link>
                <Link
                    to="/dashboard"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                >
                    Dashboard
                </Link>
                <Link
                    to="/admin"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                >
                    Admin Panel
                </Link>
                <Link
                    to="/theme-toggle"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                >
                    Theme Toggle
                </Link>
            </div>
            <div className="relative">
                <button
                    onClick={() => setMenuOpen((o) => !o)}
                    className="flex items-center space-x-1 text-gray-800 dark:text-gray-200 focus:outline-none"
                    aria-label="User menu"
                    aria-haspopup="true"
                >
                    <User size={20} />
                    <span>{user ? user.username : "Guest"}</span>
                </button>
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-700 rounded shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-20">
                        <button
                            onClick={setTheme}
                            className="flex items-center px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                            {theme === "light" ? (
                                <>
                                    <Moon size={16} className="mr-2" /> Dark Mode
                                </>
                            ) : (
                                <>
                                    <Sun size={16} className="mr-2" /> Light Mode
                                </>
                            )}
                        </button>
                        {user && (
                            <button
                                onClick={onSignOut}
                                className="flex items-center px-4 py-2 text-sm w-full text-left text-red-600 hover:bg-red-100 dark:hover:bg-red-700"
                            >
                                <LogOut size={16} className="mr-2" /> Sign Out
                            </button>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};