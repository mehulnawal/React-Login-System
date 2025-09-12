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

export const UserDashboard = () => {
    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow dark:bg-gray-800">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                User Dashboard
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
                Welcome to your dashboard! Here you can see your personalized content.
            </p>
        </div>
    );
};