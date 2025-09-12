import {
    Sun,
    Moon,
    Lock,
} from "lucide-react";
import { Link } from "react-router-dom";

export const Login = () => {

    return (
        <>
            {/* <div className="flex items-center justify-center "> */}
            <div className="max-w-md mx-auto mt-16 p-6 border border-gray-300 shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg">
                <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                    Login
                </h2>

                <form>
                    <label className="block mb-4">
                        <span className="text-gray-700 dark:text-gray-300">Username</span>
                        <input
                            type="text"
                            placeholder="Enter username"
                            className="px-3 py-2 mt-1 block w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        />
                    </label>
                    <label className="block mb-6">
                        <span className="text-gray-700 dark:text-gray-300">Password</span>
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="px-3 py-2 mt-1 block w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                        />
                    </label>
                    <button
                        type="button"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Log In
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
            {/* </div> */}
        </>
    );
};