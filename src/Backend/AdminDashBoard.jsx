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

export const AdminPanel = () => {
    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow dark:bg-gray-800">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Admin Panel
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
                This is the admin panel. Manage content and users from here.
            </p>
        </div>
    );
};