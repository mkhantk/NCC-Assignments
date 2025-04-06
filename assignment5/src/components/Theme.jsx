import React, { useContext } from "react";
import { Context } from "./AppContext";
import darkMode from "../assets/dark.svg";
import lightMode from "../assets/light.svg";

function Theme() {
  const { state, dispatch } = useContext(Context);
  const { dark } = state;
  // console.log(dark);
  // const currentTheme = JSON.parse(localStorage.getItem("react_app_login"));
  return (
    <label
      htmlFor="switch"
      className={`relative w-14 h-7 rounded-full bg-gray-700 dark:bg-gray-300 transition-all duration-500`}
    >
      <input
        type="checkbox"
        name="switch"
        id="switch"
        className="sr-only peer"
        onChange={() => {
          dispatch({ type: "setDark" });
          dispatch({ type: "setRadioChecked" });
        }}
      />
      {dark && (
        <img src={darkMode} alt="" className="absolute right-1 top-0.5  w-6" />
      )}
      {!dark && (
        <img src={lightMode} alt="" className="absolute left-1 top-0.5  w-6" />
      )}
      <span className="w-2/5 h-4/5 shadow-md right-0.5 top-0.5 transition-all duration-300 rounded-full bg-blue-500 absolute peer-checked:left-0.5 cursor-pointer "></span>
    </label>
  );
}

export default Theme;
