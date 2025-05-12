import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const user = localStorage.getItem("react_router_app");
  const url = "http://localhost:3000/posts/";
  const userUrl = `http://localhost:3000/authors?email=${user}`;
  const [success, setSuccess] = useState(false);
  const [author, setAuthor] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(userUrl);
        setAuthor(response.data);
        setSuccess(true);
      } catch (err) {
        console.error(err);
        setSuccess(false);
      }
    };
    fetchAuthor();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    let data = {};
    if (form.img.value === "") {
      data.img = `https://picsum.photos/200/?random=${
        Math.floor(Math.random() * 100) + 1
      }`;
    } else {
      data.img = form.img.value;
    }
    data.title = form.title.value;
    data.content = form.content.value;
    data.authorId = author[0].id;

    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => {
        form.reset();
        navigate("/posts");
      })
      .catch((err) => console.error(err));

    console.log(data);
  };
  return (
    <div className="mt-20 max-w-3xl m-auto p-5 md:p-0">
      <h1 className="text-4xl font-bold my-8">Create A Post</h1>
      <form
        action=""
        className="flex flex-col gap-5"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          id="title"
          placeholder="Title"
          className="border border-gray-300 p-3 bg-gray-200 text-2xl focus:outline-blue-500"
          required
        />
        <input
          type="text"
          id="img"
          placeholder="image url: if not entered, random image url will be used instead"
          className="border border-gray-300 p-3 bg-gray-200 text-2xl focus:outline-blue-500 placeholder:text-red-500 placeholder:text-lg"
        />
        <textarea
          name="content"
          id="content"
          placeholder="Contents"
          rows="15"
          className="border border-gray-300 p-3 bg-gray-200 text-xl focus:outline-blue-500"
          required
        ></textarea>
        <div className="flex justify-around items-center my-2">
          <button
            type="reset"
            className="px-4 py-1 border border-gray-300 text-lg rounded-md shadow-sm text-red-500"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-1 border border-gray-300 text-lg rounded-md shadow-sm text-blue-500"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
