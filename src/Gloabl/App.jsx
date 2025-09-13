// 

import {
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";

import { ThemeProvider } from "./Theme";
import { Navbar } from "./Navbar";
import { Registration } from "./Registration";
import { Login } from "./Login";
import { UserDashboard } from "../Frontend/UserDashboard";
import { AdminPanel } from "../Backend/AdminDashBoard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebase } from "./Firebase";
import { useEffect, useState } from "react";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(firebase);
    const check = onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res)
        console.log(res);
      }
      else {
        console.log(res);
      }
    })

    return () => check();
  }, [])

  return (

    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* login and registration */}
            {
              !user && <Route path="/" element={<Login />} />
            }

            <Route>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Registration />} />
            </Route>

            {
              user ?
                <Route Route element={<Navbar />}>
                  {/* user */}
                  <Route path="/user" element={<UserDashboard />} />

                  {/* admin */}
                  <Route path="/admin" element={
                    user.email === "mehulnawal2904@gmail.com" ? (
                      <AdminPanel />
                    ) : (
                      <div className="p-8 text-center text-red-500 text-xl font-semibold">
                        🚫 You cannot access this page
                      </div>
                    )
                  } />
                </Route>
                : <Route path="/" element={<Login />} />
            }
          </Routes>
        </BrowserRouter>
      </ThemeProvider >
    </>
  );
}

export default App
