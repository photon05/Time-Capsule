import React from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { FiHome } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { FiCompass } from "react-icons/fi";
import { FiUser } from "react-icons/fi";


const Navbar = () => {
  const username = localStorage.getItem("username");
  return (
    <div>
        <div className='flex'>
        <div className='flex justify-center gap-14 fixed w-full p-4 bottom-0 bg-gray-900'>
            <NavLink to='/home' className='flex justify-center items-center text-white text-4xl w-14 h-12 rounded-lg transform transition duration-200 ease-in-out hover:bg-gray-800'><FiHome/></NavLink>
            <NavLink to='/search' className='flex justify-center items-center text-white text-4xl w-14 h-12 rounded-lg transform transition duration-200 ease-in-out hover:bg-gray-800'><FiSearch/></NavLink>
            <NavLink to='/addpost' className='flex justify-center items-center text-white text-4xl w-14 h-12 rounded-lg transform transition duration-200 ease-in-out hover:bg-gray-800'><FiPlus/></NavLink>
            <NavLink to='/discover' className='flex justify-center items-center text-white text-4xl w-14 h-12 rounded-lg transform transition duration-200 ease-in-out hover:bg-gray-800'><FiCompass/></NavLink>
            <NavLink to={`/profile/${username}`} className='flex justify-center items-center text-white text-4xl w-14 h-12 rounded-lg transform transition duration-200 ease-in-out hover:bg-gray-800'><FiUser/></NavLink>
        </div>
        </div>

    </div>
  )
}

export default Navbar