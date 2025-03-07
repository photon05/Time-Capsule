import React from "react";
import { Link, NavLink, useParams } from 'react-router-dom';

const Header = ({logout}) => {
  const username = localStorage.getItem("username");
  return (
    <div className="w-full h-16 bg-gray-900 fixed top-0 left-0 flex items-center justify-between px-4 z-10">
      <h1 className="text-white text-4xl font-montserrat">Time Capsule</h1>
      {username ? (
        <button onClick={logout} className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-300">
          Logout
        </button>
      ) : (
        <NavLink to='/register' className='flex justify-center items-center text-white text-xl w-24 h-12 border rounded-lg transform transition duration-200 ease-in-out hover:text-gray-900 hover:bg-gray-300'>Sign Up</NavLink>
      )}
      {/* <button onClick={logout} className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-300">
          Logout
        </button> */}
    </div>
  );
};

export default Header;
