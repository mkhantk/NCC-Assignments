import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import useAppContext from "../../components/useAppContext";

function PostDetail() {
  const { dispatch } = useAppContext();
  const navigage = useNavigate();
  const user = localStorage.getItem("react_router_app");
  const param = useParams();
  const [post, setPost] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [success, setSuccess] = useState(false);
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState("");
  const url = `http://localhost:3000/posts/?id=${param.pId}&_embed=author&_embed=comments`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, authorRes] = await Promise.all([
          axios.get(url),
          axios.get("http://localhost:3000/authors"),
        ]);
        setPost(postRes.data);
        setAuthors(authorRes.data);
        setSuccess(true);
      } catch (error) {
        console.error(error);
        setSuccess(false);
        // navigage("postNotFound");
      }
    };

    fetchData();
    // if (fetchData().success) {
    //   // console.log("it is success");
    //   navigage("/postNotFound");
    // }
    // return !success && navigage("/postNotFound");
  }, []);

  // console.log(param);
  // console.log(authors);
  const handleEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    let updateData = {};
    if (form.img.value === "") {
      updateData.img = `https://picsum.photos/200/?random=${post[0].id}`;
    } else if (form.img.defaultValue !== form.img.value) {
      updateData.img = form.img.value;
    }
    if (form.title.defaultValue !== form.title.value) {
      updateData.title = form.title.value;
    }

    if (form.content.defaultValue !== form.content.value) {
      updateData.content = form.content.value;
    }

    if (Object.keys(updateData).length > 0) {
      // console.log("something change");
      axios
        .patch(`http://localhost:3000/posts/${post[0].id}`, updateData)
        .then((res) => console.log(res.data))

        .catch((error) => console.error(error));
    }
    form.reset();
    setEdit(false);
  };

  const handleComment = (e) => {
    //comment
    e.preventDefault();
    let data = {};
    data.postId = param.pId;
    data.authorId = authors.find((author) => author.email === user).id;
    data.content = comment;
    axios
      .post("http://localhost:3000/comments/", data)
      .then((res) => console.log(res.data))
      .then(e.target.reset())
      .catch((err) => console.error(err));
    // console.log(data);
  };
  return success && !edit ? (
    <div className="mt-20 text-black flex flex-col justify-start items-start gap-5 p-5 relative">
      <h1 className="text-5xl font-bold mb-5">{post[0].title}</h1>
      <div className="flex justify-start items-center gap-4 border-b border-gray-300 w-full pb-5">
        <img
          src={post[0].author.img}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div className="flex justify-between items-center w-full">
          <span className="text-xl text-gray-700">{post[0].author.uname}</span>
          {post[0].author.email === user && (
            <div className="flex justify-center items-center gap-5">
              <button
                className="px-3 py-1 cursor-pointer rounded-md border border-gray-200 text-blue-500"
                onClick={() => setEdit(true)}
              >
                edit
              </button>
              <button
                className="px-3 py-1 cursor-pointer rounded-md border border-gray-200 text-red-500"
                onClick={() => {
                  dispatch({ type: "setDelete" });
                  dispatch({
                    type: "toDelete",
                    payload: { category: "posts", id: post[0].id },
                  });
                }}
              >
                delete
              </button>
            </div>
          )}
        </div>
      </div>
      <img
        src={post[0].img}
        alt=""
        className="w-full h-auto md:h-[32rem] object-cover"
      />
      <div className="text-xl font-serif sm:text-2xl">{post[0].content}</div>

      <h1 className="text-2xl font-bold py-5 border-t border-gray-300 w-full">
        Comments
      </h1>
      <div className="w-full border border-gray-300 shadow-md p-5">
        <div className="border-b border-gray-300 py-5">
          <h2 className="text-xl mb-5">Comments({post[0].comments.length})</h2>
          <form
            action=""
            className="w-full flex flex-col justify-center items-start"
            onSubmit={(e) => handleComment(e)}
          >
            <textarea
              name="comment"
              id="comment"
              placeholder="share your thoughts ..."
              rows="10"
              className="w-full p-5 border border-gray-300 bg-gray-100 mb-5 resize-none focus:outline-blue-500"
              value={comment}
              onChange={(e) => {
                // console.log(e.target.value);s
                setComment(e.target.value);
              }}
            ></textarea>
            <button
              type="submit"
              className="text-white px-4 py-1 bg-blue-500 cursor-pointer  ml-auto"
            >
              Post Comment
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center gap-8 my-5">
          {post[0].comments.length > 0 &&
            post[0].comments.map((comment) => (
              <div
                key={comment.id}
                className="border border-gray-300 p-5 shadow-md w-full"
              >
                <div className="flex gap-5 justify-start items-center mb-5">
                  <img
                    src={
                      authors.find((author) => author.id === comment.authorId)
                        .img
                    }
                    alt=""
                    className="size-10 rounded-full"
                  />
                  <h2 className="text-lg font-bold">
                    {
                      authors.find((author) => author.id === comment.authorId)
                        .name
                    }
                  </h2>
                </div>
                <p className="px-2 text-gray-700">{comment.content}</p>
                {authors.find((author) => author.id === comment.authorId)
                  .email === user && (
                  <div className="flex justify-end items-center gap-5">
                    <button
                      className="px-3 py-1 cursor-pointer rounded-md border border-gray-200 text-red-500"
                      onClick={() => {
                        dispatch({ type: "setDelete" });
                        dispatch({
                          type: "toDelete",
                          payload: { category: "comments", id: comment.id },
                        });
                      }}
                    >
                      delete
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  ) : (
    success && (
      <div className="mt-20 max-w-3xl m-auto p-5 md:p-0">
        <h1 className="text-4xl font-bold my-8">Edit Post</h1>
        <form
          action=""
          className="flex flex-col gap-5"
          onSubmit={(e) => handleEdit(e)}
        >
          <input
            type="text"
            id="title"
            placeholder="Title"
            className="border border-gray-300 p-3 bg-gray-200 text-2xl focus:outline-blue-500"
            defaultValue={post[0].title}
            required
          />
          <input
            type="text"
            id="img"
            placeholder="image url: if not entered, random image url will be used instead"
            className="border border-gray-300 p-3 bg-gray-200 text-2xl focus:outline-blue-500 placeholder:text-red-500 placeholder:text-lg"
            defaultValue={post[0].img}
          />
          <textarea
            name="content"
            id="content"
            placeholder="Contents"
            rows="15"
            className="border border-gray-300 p-3 bg-gray-200 text-xl focus:outline-blue-500"
            defaultValue={post[0].content}
            required
          ></textarea>
          <div className="flex justify-around items-center my-2">
            <button
              type="reset"
              className="px-4 py-1 border border-gray-300 text-lg rounded-md shadow-sm text-red-500 cursor-pointer"
              onClick={() => {
                setEdit(false);
                navigage(`/posts/${post[0].id}`);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 border border-gray-300 text-lg rounded-md shadow-sm text-blue-500 cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  );
}

export default PostDetail;
