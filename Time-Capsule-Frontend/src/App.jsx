import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate
} from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Home from "./components/Home";
import Search from "./components/Search";
import AddPost from "./components/AddPost";
import Discover from "./components/Discover";
import UserProfile from "./components/UserProfile";
import "./components/Navbar";
import Navbar from "./components/Navbar";
import UserRegistration from "./components/UserRegistration";
import UserLogin from "./components/UserLogin";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  console.log("Username is : "+ username);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuth(true);
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate('/home');
    setIsAuth(false);
  };

  return (
    <>
      <div className="bg-gray-900 h-screen overflow-auto overscroll-none no-scrollbar">
        <div className="flex ">
          <Header logout={handleLogout} />
        </div>
        <div>
        {/* <button onClick={handleLogout} className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-300">Logout</button> */}

        </div>

       
          <div className="mt-16">
            <Navbar />
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<PrivateRoute element={<Search />} />} />
            <Route path="/addpost" element={<PrivateRoute element={<AddPost />} />} />
            <Route path="/discover" element={<PrivateRoute element={<Discover />} />} />
            {/* <Route path="/profile/:username" element={<PrivateRoute element={<UserProfile />} />} /> */}
            <Route path={`/profile/${username}`} element={<PrivateRoute element={<UserProfile />} />} />
            <Route path="/register" element={!isAuth ? <UserRegistration onRegister={handleLogin} /> : <Navigate to='/home'/>} />
            <Route path="/login" element={!isAuth ? <UserLogin onLogin={handleLogin} /> : <Navigate to='/home'/>} />
            </Routes>
          </div>
       
      </div>
    </>
  );
}

export default App;
