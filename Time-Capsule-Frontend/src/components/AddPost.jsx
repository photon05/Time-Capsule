import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const [postData, setPostData] = useState("");
  const [dateData, setDateData] = useState("");
  const navigate = useNavigate();

  // Function to set the date data
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);

    // Get the date in ISO format and append the time zone offset
    const formattedDate = selectedDate.toISOString(); // "2024-12-18T00:00:00.000Z"

    // Adjust the Z (UTC) to the correct offset, if needed
    const dateWithOffset = formattedDate.replace("Z", "+00:00"); // Replace 'Z' with '+00:00'

    setDateData(dateWithOffset); // Set the formatted date in state
    console.log(dateWithOffset); // Log to check the format
  };

  // Function to resize the textarea
  const autoResize = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Reset height to auto to recalculate
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
  };

  // Function to handle post submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");

    const data = await fetch("http://localhost:5000/api/posts/addpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username:username, content:postData, revealAt:dateData}),
    });
    const response = await data.json();
    if(data.ok){
      console.log("Posted successfully");
    }
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center m-4 bg-gray-900 overscroll-none no-scrollbar">
      <div className="w-96 bg-gray-800 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl text-white mb-6 text-center">New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-1">
              Write your thoughts...
            </label>
            <textarea
              value={postData}
              onChange={(e) => {
                setPostData(e.target.value);
              }}
              onInput={autoResize}
              placeholder="What's on your mind?"
              className="w-full p-4 text-white bg-gray-700 rounded-lg focus:outline-none resize-none"
              rows="1" // Initial row count
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Set Time Capsule</label>
            <input
              type="date"
              onChange={handleDateChange}
              className="w-full p-2 text-white bg-gray-700 rounded-lg focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
