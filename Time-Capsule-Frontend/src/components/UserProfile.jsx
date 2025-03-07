import React, { useEffect, useState } from "react";
import profilepic from '../assets/gokuPFP.webp';

const UserProfile = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    try {
      const userdataResponse = await fetch(`http://localhost:5000/api/users/profile/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await userdataResponse.json();
      
      if (user) {
        setUserData(user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={profilepic}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h1>
              <p className="text-sm text-gray-400">{userData.username}</p>
            </div>
          </div>
          <div className="text-right">
            <button className="bg-blue-500 px-4 py-2 rounded-lg">
              Edit profile
            </button>
          </div>
        </div>
        <div className="mb-6">
          <p>{userData.about}</p>
        </div>
        <div className="flex items-center space-x-2 mb-6">
          <div className="flex -space-x-2">
            <img
              src="https://via.placeholder.com/24"
              alt="Follower 1"
              className="w-6 h-6 rounded-full border-2 border-gray-900"
            />
            <img
              src="https://via.placeholder.com/24"
              alt="Follower 2"
              className="w-6 h-6 rounded-full border-2 border-gray-900"
            />
            <img
              src="https://via.placeholder.com/24"
              alt="Follower 3"
              className="w-6 h-6 rounded-full border-2 border-gray-900"
            />
          </div>
          <span className="text-gray-400 text-sm">
            112 followers · instagram.com/{userData.username}
          </span>
        </div>
        <div className="flex justify-around text-gray-400 text-sm mb-4">
          <button className="hover:text-white transition ease-in-out duration-300">
            Threads
          </button>
          <button className="hover:text-white transition ease-in-out duration-300">
            Replies
          </button>
          <button className="hover:text-white transition ease-in-out duration-300">
            Reposts
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
