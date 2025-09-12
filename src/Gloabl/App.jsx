import { useContext, useState } from "react";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";

import { ThemeContext, ThemeProvider } from "./Theme";
import { Navbar } from "./Navbar";
import { Registration } from "./Registration";
import { Login } from "./Login";
import { UserDashboard } from "../Frontend/UserDashboard";
import { AdminPanel } from "../Backend/AdminDashBoard";

const mockUser = {
  id: 1,
  username: "johndoe",
  role: "user", // "user" or "admin"
};

// Main App component with routing
function App() {
  // const [user, setUser] = useState(null);

  return (
    // <ThemeProvider>
    //   <Router>
    //     <Navbar user={user} onSignOut={signOutUser} />
    //     <main className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
    //       <Routes>
    //         <Route
    //           path="/"
    //           element={
    //             user ? <Navigate to="/dashboard" replace /> : <Login />
    //           }
    //         />
    //         <Route
    //           path="/register"
    //           element={
    //             user ? <Navigate to="/dashboard" replace /> : <Registration />
    //           }
    //         />
    //         <Route
    //           path="/dashboard"
    //           element={
    //             !user ? <Navigate to="/" replace /> : <UserDashboard />
    //           }
    //         />
    //         <Route
    //           path="/admin"
    //           element={
    //             !user || user.role !== "admin" ? (
    //               <Navigate to="/" replace />
    //             ) : (
    //               <AdminPanel />
    //             )
    //           }
    //         />
    //         <Route path="/theme-toggle" element={<ThemeTogglePage />} />
    //         <Route path="*" element={<Navigate to="/" replace />} />
    //       </Routes>

    //       {!user && (
    //         <div className="max-w-md mx-auto mt-6 text-center">
    //           <button
    //             onClick={signInUser}
    //             className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
    //             aria-label="Simulate login"
    //           >
    //             Simulate Login (Use Demo User)
    //           </button>
    //         </div>
    //       )}
    //     </main>
    //   </Router>
    // </ThemeProvider>

    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* login and registration */}
            <Route>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Registration />} />
            </Route>

            {/* user */}
            <Route element={<Navbar />}>
              <Route path="/user" element={<UserDashboard />} />
            </Route>

            {/* admin */}
            <Route element={<Navbar />}>
              <Route path="/user" element={<AdminPanel />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </ThemeProvider>

    </>
  );
}

export default App
