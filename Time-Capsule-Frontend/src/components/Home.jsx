import PostCard from "./PostCard";
import { useEffect, useState } from "react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const date = new Date();
  const isoDateString = date.toISOString();

  async function fetchPost() {
    const response = await fetch(`http://localhost:5000/api/posts`); // Update URL to your backend endpoint
    const userResponse = await fetch(`http://localhost:5000/api/users`); // Update URL to your backend endpoint
    const data = await response.json();
    const userData = await userResponse.json();
    console.log(data);
    if(data){
      setPosts(data);
    }
    if(userData){
      setUsers(userData);
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);

  const getUserById = (id) => users.find(user => user._id === id);

  return (
    <>
      <div className="bg-gray-900 h-screen overflow-auto overscroll-none no-scrollbar">
        <div className="flex flex-col justify-center items-center gap-10 w-full mt-20 mb-20">
          {posts.map(post => { 
            console.log(isoDateString < post.revealAt);
            isoDateString >= post.revealAt ? post.username = post.username : post.username = "timecapsuleuser";
            return <PostCard key={post._id} username={post.username} body={post.content}/>
            ;
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
