import {
    User,
    Settings,
    Bell,
} from "lucide-react";
import { ThemeContext } from "../Gloabl/Theme";
import { useContext } from "react";

export const UserDashboard = ({ user }) => {

    const { theme } = useContext(ThemeContext)

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl border shadow-sm p-6 mb-8`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                Welcome back, {user?.displayName || 'User'}! 👋
                            </h1>
                            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                Here's what's happening with your projects today.
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}>
                                <Bell size={20} />
                            </button>
                            <button className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}>
                                <Settings size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};