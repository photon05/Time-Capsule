import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  // This is not the actual search logic 
  const handleSearch = (username) => {
    if(username){
      searchUser(username);
    }
  }

  const searchUser = async (usernameToFind) => {
    const userResponse = await fetch(`http://localhost:5000/api/users`);
    const userData = await userResponse.json();
    if(userData){
      console.log("User List Fetched", userData);
      setUsers(userData);
      const user = users.find(user => user.username === usernameToFind);
      console.log(user);
    }
  };

  useEffect(() => {
    handleSearch("photon");
  },[]);

  return (
    <div className="overscroll-none">
      <div className="text-2xl text-white font-inter">
        This is the place to search your friends
      </div>
      <div>
        <input 
        type="text" 
        value={search}
        onChange={(event) => setSearch(event.target.value)} 
        />

        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Search;
