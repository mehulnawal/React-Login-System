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
    Shield,
    ChevronDown,
    Bell,
    Search,
    Menu,
    X
} from "lucide-react";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebase } from "./Firebase";

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useContext(ThemeContext)
    const [user, setUser] = useState([]);
    const [userProfilePhoto, setUserProfilePhoto] = useState("");

    const auth = getAuth(firebase);
    onAuthStateChanged(auth, (res) => {
        setUser(res);
        setUserProfilePhoto(res.photoURL)
    })

    const navigate = useNavigate()
    function onSignOut() {
        const auth = getAuth(firebase);
        signOut(auth).then((res) => {
            console.log(res);
            navigate('/')
        }).catch((error) => { console.log(error) });
    }

    return (
        <>
            <nav className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm sticky top-0 z-50`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Left section */}
                        <div className="flex items-center space-x-8">
                            {/* Logo */}
                            <Link
                                to="/"
                                className="flex items-center space-x-2 group"
                            >
                                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-600'} group-hover:bg-blue-700 transition-colors`}>
                                    <Home size={20} className="text-white" />
                                </div>
                                <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} hidden sm:block`}>
                                    Login App
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center space-x-1">
                                <Link
                                    to="/user"
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/admin"
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
                                        ${user.email == 'mehulnawal2904@gmail.com' ? 'block' : 'hidden'}
                                        `}
                                >
                                    Admin Panel
                                </Link>
                            </div>
                        </div>

                        {/* Right section */}
                        <div className="flex items-center space-x-4">
                            {/* Theme Toggle */}
                            <button
                                onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
                                className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            {/* User Menu */}
                            <div className="relative">
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center`}>
                                        {<img className="rounded-full" src={userProfilePhoto || <User size={16} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />} />}
                                    </div>
                                    <span className={`hidden sm:block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {user.displayName}
                                    </span>
                                    <ChevronDown size={16} className={`hidden sm:block transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* User Dropdown */}
                                {menuOpen && (
                                    <div className={`absolute right-0 mt-2 w-56 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg border z-20`}>
                                        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                                {user.displayName}
                                            </p>
                                            <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {user.email}
                                            </p>
                                        </div>

                                        <div className="border-t border-gray-200 dark:border-gray-700 py-2">
                                            <button
                                                onClick={() => {
                                                    setMenuOpen(false);
                                                    onSignOut();
                                                }}
                                                className={`flex items-center space-x-3 px-4 py-2 text-sm w-full text-left transition-colors ${theme === 'dark' ? 'text-red-400 hover:text-red-300 hover:bg-gray-700' : 'text-red-600 hover:text-red-500 hover:bg-gray-100'}`}
                                            >
                                                <LogOut size={16} />
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <div className="md:hidden">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                                >
                                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className={`md:hidden ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
                        <div className="px-4 pt-2 pb-4 space-y-2">

                            {/* Mobile Navigation Links */}
                            <Link
                                to="/dashboard"
                                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/admin"
                                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
                                ${user.email == 'mehulnawal2904@gmail.com' ? 'block' : 'hidden'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Admin Panel
                            </Link>

                            {/* Mobile User Section */}
                            <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                                <div className="flex items-center space-x-3 px-3 py-2">
                                    <div className={`w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'} flex items-center justify-center`}>
                                        <User size={20} className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} />
                                    </div>
                                    <div>
                                        <p className={`text-base font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                            {user.displayName}
                                        </p>
                                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    {user?.role === 'admin' && (
                                        <Link
                                            to="/admin"
                                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
                                            ${user.email == 'mehulnawal2904@gmail.com' ? 'block' : 'hidden'}`}
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <Shield size={18} />
                                            <span>Admin Panel</span>
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            onSignOut();
                                        }}
                                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium w-full text-left transition-colors ${theme === 'dark' ? 'text-red-400 hover:text-red-300 hover:bg-gray-700' : 'text-red-600 hover:text-red-500 hover:bg-gray-100'}`}
                                    >
                                        <LogOut size={18} />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Overlay for dropdowns */}
            {(menuOpen || mobileMenuOpen) && (
                <div
                    className="fixed inset-0 z-10 bg-opacity-25"
                    onClick={() => {
                        setMenuOpen(false);
                        setMobileMenuOpen(false);
                    }}
                />
            )}

            <Outlet />
        </>
    );
};
