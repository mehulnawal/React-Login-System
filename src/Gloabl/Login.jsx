import {
    Sun,
    Moon,
    Lock,
    Eye,
    EyeOff,
    Mail,
    Chrome,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { firebase } from "./Firebase";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./Theme";

export const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState({
        email: '',
        password: ''
    })

    const [check, setCheck] = useState({
        email: false,
        password: false
    })

    const { theme, setTheme } = useContext(ThemeContext)
    const navigate = useNavigate()


    // handle Form Data
    function handleFormData(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        // email validation
        const emailIDRegex = /^[a-zA-Z0-9-+._]+@[a-zA-Z0-9+-]+\.[a-zA-Z]{2,}$/;
        if (name == 'email') {
            if (value.trim() == '') {
                setError((prev) => ({ ...prev, email: "Enter Email id" }));
                setCheck((prev) => ({ ...prev, email: false }));
            }
            else if (!emailIDRegex.test(value.trim())) {
                setError((prev) => ({ ...prev, email: "Invalid Email id" }));
                setCheck((prev) => ({ ...prev, email: false }));
            }
            else {
                setError((prev) => ({ ...prev, email: "" }));
                setCheck((prev) => ({ ...prev, email: true }));
            }
        }

        // password validation
        if (name == 'password') {
            if (value.trim() == '') {
                setError((prev) => ({ ...prev, password: "Enter password" }));
                setCheck((prev) => ({ ...prev, password: false }));
            }
            else if (value.length < 6) {
                setError((prev) => ({ ...prev, password: "Password must be at least 6  characters" }));
                setCheck((prev) => ({ ...prev, password: false }));
            }
            else {
                setError((prev) => ({ ...prev, password: "" }));
                setCheck((prev) => ({ ...prev, password: true }));
            }
        }
    }

    // Google Sign In
    function handleGoogleSignIn() {
        setIsLoading(true);
        const auth = getAuth(firebase);
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((res) => {
                setUser(res.user)
                navigate('/user')
            })
            .catch((error) => {
                if (error.code === 'auth/popup-closed-by-user') {
                    setIsLoading(false);
                }
                else console.log(error)
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        const allValid = Object.entries(check).every((v) => v[1] == true)
        if (!allValid) {
            Object.entries(check).forEach((v) => {
                if (v[1] == false) {
                    const inputName = v[0];
                    setError((prev) => ({ ...prev, [inputName]: `Enter your ${inputName}` }));
                    setCheck((prev) => ({ ...prev, [inputName]: false }));
                }
            })
            return;
        }
        else {
            setIsLoading(true);
            const auth = getAuth(firebase)
            signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then((userdata) => {
                    setUser(userdata.user);
                    navigate('/user')
                })
                .catch((error) => {
                    console.log("Firebase Error:", error.code, error.message);

                    if (error.code === "auth/user-not-found") {
                        setError((prev) => ({ ...prev, email: "No account found with this email." }));
                    }
                    else if (error.code === "auth/wrong-password") {
                        setError((prev) => ({ ...prev, password: "Incorrect password." }));
                    }
                    else if (error.code === "auth/invalid-email") {
                        setError((prev) => ({ ...prev, email: "Invalid email format." }));
                    }
                    else {
                        alert("Something went wrong: " + error.message);
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
    }

    useEffect(() => {
        localStorage.setItem('UserData', JSON.stringify(user))
    }, [user])

    return (
        <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
            <div className={`relative max-w-md w-full space-y-8 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl border shadow-xl`}>

                {/* Header */}
                <div className="text-center">
                    <div className={`mx-auto h-16 w-16 flex items-center justify-center rounded-full ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-100'}`}>
                        <div>
                            <Lock className={`h-8 w-8 ${theme === 'dark' ? 'text-white' : 'text-blue-600'}`} />
                        </div>
                    </div>

                    <div className="theme cursor-pointer absolute top-10 right-10" onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
                        {theme == 'dark' ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-black" />}
                    </div>

                    <h2 className={`mt-6 text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Welcome Back
                    </h2>
                    <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Sign in to your account
                    </p>
                </div>

                {/* Google Sign In */}
                <div
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                        ${theme === 'dark'
                            ? 'bg-gray-700 text-white hover:bg-gray-600 border-gray-600'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300 shadow-sm'
                        } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
                >
                    <Chrome className="w-5 h-5 mr-3" />
                    {isLoading ? 'Signing in...' : 'Continue with Google'}
                </div>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className={`px-2 ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                            Or continue with email
                        </span>
                    </div>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>

                    {/* Email Input */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                            </div>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleFormData}
                                placeholder="Enter your email"
                                className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                                    ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    } ${error.email ? 'border-red-500' : ''}`}
                            />
                        </div>
                        {error.email && (
                            <p className="mt-1 text-sm text-red-500 flex items-center">
                                {error.email}
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                value={formData.password}
                                onChange={handleFormData}
                                placeholder="Enter your password"
                                className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                                    ${theme === 'dark'
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                                    } ${error.password ? 'border-red-500' : ''}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? (
                                    <EyeOff className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`} />
                                ) : (
                                    <Eye className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`} />
                                )}
                            </button>
                        </div>
                        {error.password && (
                            <p className="mt-1 text-sm text-red-500 flex items-center">
                                {error.password}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-200
                            ${isLoading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:shadow-lg transform hover:-translate-y-0.5'
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="text-center">
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors hover:underline"
                        >
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};