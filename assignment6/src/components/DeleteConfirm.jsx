import React, { useEffect } from "react";
import useAppContext from "./useAppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeleteConfirm() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { isDelete, toDeleteId } = state;
  useEffect(() => {
    if (isDelete) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isDelete]);

  const handleDelete = (toDeleteId) => {
    const url = `http://localhost:3000/${toDeleteId.category}/${toDeleteId.id}`;
    axios
      .delete(url)
      .then((res) => console.log(res.data))
      .then(() => {
        if (toDeleteId.category === "posts") {
          navigate(-1);
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="w-full bg-black/50 fixed top-0 bottom-0  z-50 flex flex-col justify-center items-center">
      <div className=" bg-white w-80 p-8 m-auto rounded-md">
        <h1 className="text-center text-2xl mb-8">Are You Sure?</h1>
        <div className="flex justify-around items-center">
          <button
            className="text-lg px-3 py-1 border border-gray-300 shadow-md rounded-sm cursor-pointer"
            onClick={() => dispatch({ type: "setNotDelete" })}
          >
            cancel
          </button>
          <button
            className="text-lg px-3 py-1 border border-gray-300 text-red-500 shadow-md rounded-sm cursor-pointer"
            onClick={() => {
              handleDelete(toDeleteId);
              dispatch({ type: "setNotDelete" });
            }}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
