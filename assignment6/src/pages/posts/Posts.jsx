import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/posts/?_page=${currentPage}&_per_page=9&_embed=author`
        );
        setData(res.data);
        // console.log(data);
        setSuccess(true);
      } catch (err) {
        console.error(err);
        setSuccess(false);
      }
    };

    getData();
  }, [currentPage]);

  const handleNext = () => {
    // const next = parseInt(currentPage) + 1;
    setCurrentPage((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentPage >= 2) {
      // const back = parseInt(currentPage) - 1;
      setCurrentPage((prev) => prev - 1);
    }
  };
  // console.log(data);
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold my-5 border-b border-t-gray-700 py-3">
        All Posts
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
        {success &&
          data.data.map((post) => (
            <div
              key={post.id}
              id={post.id}
              className="border border-gray-300 shadow-md flex flex-col cursor-pointer"
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              <img src={post.img} alt="" className="object-cover h-52" />
              {/* set width also if not working as you imagine */}
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
      </div>
      <div className="flex justify-center items-center w-full ">
        <button
          className="px-4 py-1 text-blue-500 text-lg outline outline-gray-300 cursor-pointer"
          onClick={() => handleBack()}
        >
          Back
        </button>
        <span className=" inline-block px-4 text-blue-500 text-lg ">
          {currentPage}
        </span>
        <button
          className="px-4 py-1 text-blue-500 text-lg outline outline-gray-300 cursor-pointer"
          onClick={() => handleNext()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Posts;
