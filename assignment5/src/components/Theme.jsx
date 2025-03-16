import React, { useContext } from "react";
import { Context } from "./AppContext";
import darkMode from "../assets/dark.svg";
import lightMode from "../assets/light.svg";

function Theme() {
  const { state, dispatch } = useContext(Context);
  const { dark } = state;
  // console.log(dark);
  return (
    <div className="w-7 cursor-pointer">
      {dark ? (
        <img
          src={lightMode}
          alt=""
          className="w-5 m-auto"
          onClick={() => dispatch({ type: "setLight" })}
        />
      ) : (
        <img
          src={darkMode}
          alt=""
          className="w-4 m-auto"
          onClick={() => dispatch({ type: "setDark" })}
        />
      )}
    </div>
  );
}

export default Theme;
