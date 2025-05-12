import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const url = "http://localhost:3000/posts/?_embed=author";
  useEffect(() => {
    axios
      .get(url)
      .then((res) => setData(res.data))
      .then(() => setSuccess(true))
      .catch((error) => {
        console.error(error);
      });
  }, [data.length]);

  return (
    <div className="min-h-screen m-auto pt-24 p-5">
      <h1 className="text-3xl font-bold mb-5">Post and Comment System</h1>
      <div className="mb-10">
        <h2 className="text-2xl font-bold border-b border-gray-400 py-2 mb-5">
          Latest Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {success &&
            data.slice(-4).map((post) => (
              <div
                key={post.id}
                id={post.id}
                className="border border-gray-300 shadow-md flex flex-col sm:flex-row cursor-pointer "
                onClick={() => navigate(`/posts/${post.id}`)}
              >
                <div className="sm:h-72 h-52 sm:w-2/5 w-full">
                  <img
                    src={post.img}
                    alt=""
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="p-2 flex flex-col justify-start items-start gap-3 w-full">
                  <h1 className="text-lg font-bold py-2">{post.title}</h1>
                  <div className="pl-2 text-gray-400">
                    {post.content.split(" ").splice(0, 30).join(" ")} ...
                  </div>
                  <div className="flex justify-start items-center gap-2 ml-auto mt-auto">
                    <img
                      src={post.author.img}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{post.author.uname}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-5 border-b border-gray-400 py-2 ">
          All Posts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 relative">
          {success &&
            data.slice(0, 6).map((post) => (
              <div
                key={post.id}
                id={post.id}
                className="border border-gray-300 shadow-md flex flex-col cursor-pointer "
                onClick={() => navigate(`/posts/${post.id}`)}
              >
                <img
                  src={`https://picsum.photos/200/?random=${post.id}`}
                  alt=""
                  className="object-cover h-52"
                />
                <div className="p-2 flex flex-col justify-start items-start gap-3 h-full">
                  <h1 className="text-lg font-bold py-2">{post.title}</h1>
                  <div className="pl-2 text-gray-400">
                    {post.content.split(" ").splice(0, 30).join(" ")} ...
                  </div>
                  <div className="flex gap-2 justify-center items-center ml-auto mt-auto">
                    <img
                      src={post.author.img}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{post.author.uname}</span>
                  </div>
                </div>
              </div>
            ))}
          <div className="absolute bg-gradient-to-b from-gray-300/0 to-white -bottom-1 w-full h-48 sm:col-span-2 md:col-span-3"></div>
        </div>
        <div className="w-full flex justify-center items-center mt-5">
          <button
            onClick={() => navigate("posts")}
            className="text-xl text-blue-500 bg-white ring ring-blue-500 rounded-md shadow-md px-4 py-1 cursor-pointer "
          >
            To Posts
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
