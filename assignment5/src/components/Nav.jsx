import React, { useContext } from "react";
import Theme from "./Theme";
import { Context } from "./AppContext";
import todoImg from "../assets/todo.svg";
import tempImg from "../assets/temperature.svg";
import tododark from "../assets/tododark.svg";
import tempdark from "../assets/temperaturedark.svg";

function Nav() {
  const { state, dispatch } = useContext(Context);
  const { login, dark, currentPage } = state;

  const handleClick = (e) => {
    // console.log(e.currentTarget.id);
    dispatch({ type: "changePage", payload: e.currentTarget.id });
  };
  return (
    <div className="mb-auto flex justify-end items-center gap-5 w-full p-5 border-b border-black dark:border-gray-200 text-gray-900 dark:text-gray-200 absolute top-0">
      <div
        id="todo"
        className="flex justify-center items-center gap-2 cursor-pointer"
        onClick={(e) => handleClick(e)}
      >
        <span className="hidden md:block">Todo List</span>
        {dark ? (
          <img src={tododark} alt="" className="w-6" />
        ) : (
          <img src={todoImg} alt="" className="w-6" />
        )}
      </div>
      <div
        id="temp"
        className="flex justify-center items-center gap-2 cursor-pointer"
        onClick={(e) => handleClick(e)}
      >
        <span className="hidden md:block">Temperature</span>
        {dark ? (
          <img src={tempdark} alt="" className="w-6" />
        ) : (
          <img src={tempImg} alt="" className="w-6" />
        )}
      </div>
      <Theme />
      <div>
        {login || localStorage.getItem("react_app_login") ? (
          <button
            className="px-3 py-1 rounded-md shadow-md bg-red-500 text-white"
            onClick={() => {
              localStorage.removeItem("react_app_login");
              localStorage.removeItem("react_app_todo_list");
              dispatch({ type: "setLogin" });
              dispatch({ type: "setLight" });
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="px-3  py-1 rounded-md shadow-md bg-blue-500 text-white"
            onClick={() => {
              dispatch({ type: "setFalseLogin" });
            }}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Nav;
