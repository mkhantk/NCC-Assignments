import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Author() {
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState([]);
  const userEmail = localStorage.getItem("react_router_app");
  const navigate = useNavigate();
  // console.log(userEmail);s

  const url = `http://localhost:3000/authors/?email=${userEmail}&_embed=posts`;
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
        setSuccess(true);
      } catch (err) {
        console.error(err);
        setSuccess(false);
      }
    };

    getData();
  }, []);

  // console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    let profileData = {};
    if (form.img.value === "") {
      profileData.img = `https://picsum.photos/200?random=${data[0].id}`;
    } else {
      profileData.img = form.img.value;
    }
    profileData.name = form.name.value;
    profileData.uname = form.uname.value;
    profileData.description = form.description.value;

    axios
      .patch(`http://localhost:3000/authors/${data[0].id}`, profileData)
      .then((res) => {
        console.log(res.data);
        form.reset();
      })
      .catch((err) => console.error(err));

    setEdit(true);
  };

  console.log(data);

  console.log(data[0]);
  return (
    <div className="w-full mt-20 p-5">
      {(success && data[0].description === "") || edit ? (
        <div className="max-w-3xl m-auto shadow-md p-8">
          <h1 className="text-4xl font-bold my-10 text-center">
            {edit ? "Edit" : "SetUp"} Profile
          </h1>
          <form
            action=""
            id={data[0].id}
            className="flex flex-col justify-center items-center gap-5 m-auto w-full min-w-3xs"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="w-full grid grid-cols-1 sm:grid-cols-3">
              <label htmlFor="img" className="w-20">
                Image Url:
              </label>
              <input
                id="img"
                type="text"
                placeholder="if not entered, random image url will be used instead"
                className="w-full bg-gray-300 border border-gray-400 sm:col-span-2 px-2 py-1 placeholder:text-red-500 focus:outline-blue-500"
                defaultValue={data[0].img}
              />
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 ">
              <label htmlFor="name" className="w-20">
                Name:{" "}
              </label>
              <input
                type="text"
                id="name"
                defaultValue={data[0].name}
                className="w-full bg-gray-300 border border-gray-400 sm:col-span-2 px-2 py-1 focus:outline-blue-500"
                required
              />
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 ">
              <label htmlFor="uname" className="w-20">
                Username:
              </label>
              <input
                type="text"
                id="uname"
                defaultValue={data[0].uname}
                className="w-full bg-gray-300 border border-gray-400 sm:col-span-2 px-2 py-1 focus:outline-blue-500"
                required
              />
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 ">
              <label htmlFor="description" className="w-20">
                Description:
              </label>
              <textarea
                name="description"
                id="description"
                rows="10"
                defaultValue={data[0].description}
                className="w-full bg-gray-300 border border-gray-400 sm:col-span-2 px-2 py-1 focus:outline-blue-500"
                required
              ></textarea>
            </div>
            <div className="flex justify-around w-full">
              <button
                type="reset"
                className="px-8 py-2 my-5 text-red-500 bg-gray-200"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="text-white bg-blue-500 px-8 py-2 my-5"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      ) : (
        success && (
          <div className=" divide-y divide-gray-500">
            <div className="flex flex-col sm:flex-row gap-5 py-5">
              <div className="size-52 overflow-hidden">
                <img
                  src={data[0].img}
                  alt=""
                  className="ring ring-gray-300 bg-cover p-1 shadow-md"
                />
              </div>
              <div className=" flex flex-col justify-end items-start gap-2">
                <h1 className="text-4xl font-bold ">{data[0].name}</h1>
                <h2 className="text-gray-600 mb-auto">@{data[0].uname}</h2>
                <h2 className="text-gray-700 font-bold">
                  email: {data[0].email}
                </h2>
                <h2 className="text-gray-700 font-bold">
                  phone: {data[0].phone}
                </h2>
                <h2 className="text-gray-700 font-bold">
                  Joined Since:{" "}
                  {new Date(data[0].date_since).toLocaleDateString()}
                </h2>
              </div>
              <button
                className="px-4 py-1 bg-gray-300 text-gray-800 cursor-pointer rounded-full mb-auto  sm:ml-auto text-nowrap"
                onClick={() => setEdit(true)}
              >
                Edit Profile
              </button>
            </div>
            <div className="py-5">
              <h2 className="text-3xl font-bold mb-5">Description</h2>
              <p className="px-5 py-2 text-lg">{data[0].description}</p>
            </div>

            <div className="py-5">
              <h2 className="text-3xl font-bold mb-5">Posts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {data[0].posts.length > 0 ? (
                  data[0].posts.map((post) => (
                    <div
                      key={post.id}
                      id={post.id}
                      className="border border-gray-300 shadow-md flex flex-col cursor-pointer "
                      onClick={() => navigate(`/posts/${post.id}`)}
                    >
                      <img
                        src={post.img}
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
                            src={data[0].img}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                          <span>{data[0].uname}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No Posts</div>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Author;
