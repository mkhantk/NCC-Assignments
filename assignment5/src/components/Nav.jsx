import React, { useContext } from "react";
import Theme from "./Theme";
import { Context } from "./AppContext";
import todoImg from "../assets/todo.svg";
import tempImg from "../assets/temperature.svg";
import tododark from "../assets/tododark.svg";
import tempdark from "../assets/temperaturedark.svg";
import formlight from "../assets/form-light.svg";
import formdark from "../assets/form-dark.svg";

function Nav() {
  const { state, dispatch } = useContext(Context);
  const { dark, currentPage } = state;

  const handleClick = (e) => {
    // console.log(e.currentTarget.id);
    dispatch({ type: "changePage", payload: e.currentTarget.id });
  };

  // const currentTheme = JSON.parse(localStorage.getItem("react_app_login"))
  return (
    <div className="mb-auto flex justify-end items-center gap-5 w-full p-5 border-b border-black dark:border-gray-200 text-gray-900 dark:text-gray-200 absolute top-0">
      <div
        id="todo"
        className={`flex justify-center items-center gap-2 cursor-pointer px-2 ${
          currentPage === "todo" && "shadow-xs shadow-blue-500 rounded-md "
        }`}
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
        id="register"
        className={`flex justify-center items-center gap-2 cursor-pointer px-2 ${
          currentPage === "register" && "shadow-xs shadow-blue-500 rounded-md "
        }`}
        onClick={(e) => handleClick(e)}
      >
        <span className="hidden md:block">Register</span>
        {dark ? (
          <img src={formdark} alt="" className="w-6" />
        ) : (
          <img src={formlight} alt="" className="w-6" />
        )}
      </div>
      <div
        id="temp"
        className={`flex justify-center items-center gap-2 cursor-pointer px-2 ${
          currentPage === "temp" && "shadow-xs shadow-blue-500 rounded-md "
        }`}
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
    </div>
  );
}

export default Nav;
