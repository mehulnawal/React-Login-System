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
import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export const Registration = () => {

    const [user, setUser] = useState('')

    function handleSuccess() { }
    function handleError() { }

    return (
        <>
            <div className="max-w-md mx-auto mt-16 p-6 border border-gray-300  rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700">

                <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                    Register
                </h2>

                <form>

                    <GoogleOAuthProvider clientId="">
                        <GoogleLogin
                            onSuccess={handleSuccess}
                            onError={handleError}
                        />
                    </GoogleOAuthProvider>

                    {/* username */}
                    <label className="block mb-4">
                        <span className="text-gray-700 dark:text-gray-300">Username</span>
                        <input
                            type="text"
                            placeholder="Choose a username"
                            className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        />
                    </label>

                    {/* email */}
                    <label className="block mb-4">
                        <span className="text-gray-700 dark:text-gray-300">Email</span>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        />
                    </label>

                    {/* password */}
                    <label className="block mb-6">
                        <span className="text-gray-700 dark:text-gray-300">Password</span>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="mt-1 block w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        />
                    </label>
                    <button
                        type="button"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link to="/" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </>
    );
};