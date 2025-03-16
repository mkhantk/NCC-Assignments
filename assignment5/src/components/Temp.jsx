import React, { useContext } from "react";
import { Context } from "./AppContext";
import tempDark from "../assets/changeDark.svg";
import tempLight from "../assets/changeLight.svg";
import clight from "../assets/clight.svg";
import cdark from "../assets/cdark.svg";
import flight from "../assets/flight.svg";
import fdark from "../assets/fdark.svg";

const Temp = () => {
  const { state, dispatch } = useContext(Context);
  const { dark, cel, fer } = state;

  function celToFer(degree) {
    return Number(degree) * (9 / 5) + 32;
  }

  function ferToCel(degree) {
    return (degree - 32) * (5 / 9);
  }

  const handleInput = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    // console.log(cel);
    // console.log(fer);
    const id = e.target.id;

    if (e.target.value) {
      // let resultTemp = "";
      if (id === "celsius") {
        dispatch({ type: "changeCel", payload: e.target.value });
        dispatch({ type: "changeFer", payload: celToFer(e.target.value) });
      } else if (id === "fahrenheit") {
        dispatch({ type: "changeCel", payload: ferToCel(e.target.value) });
        dispatch({ type: "changeFer", payload: e.target.value });
      }
    } else {
      dispatch({ type: "changeCel", payload: "" });
      dispatch({ type: "changeFer", payload: "" });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-5">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-500 mt-28 text-center">
        Temperature Converter
      </h1>
      <div
        id="tempContainer"
        className="flex flex-col justify-center items-center gap-10 m-auto"
      >
        <div className="flex justify-center items-center gap-5">
          <input
            id="celsius"
            type="number"
            placeholder="Celsius"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-3 py-3 outline outline-gray-900 rounded-md   md:text-xl dark:outline-blue-500"
            onChange={(e) => handleInput(e)}
            value={cel}
          />
          {dark ? (
            <img src={cdark} alt="" className="w-8 md:w-10" />
          ) : (
            <img src={clight} alt="" className="w-8 md:w-10" />
          )}
        </div>
        {dark ? (
          <img src={tempDark} alt="" className="w-8 md:w-10" />
        ) : (
          <img src={tempLight} alt="" className="w-8 md:w-10" />
        )}
        <div className="flex justify-center items-center gap-5">
          <input
            id="fahrenheit"
            type="number"
            placeholder="Fahrenheit"
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-3 py-3 outline outline-gray-900 rounded-md   md:text-xl dark:outline-blue-500"
            onChange={(e) => handleInput(e)}
            value={fer}
          />
          {dark ? (
            <img src={fdark} alt="" className="w-8 md:w-10" />
          ) : (
            <img src={flight} alt="" className="w-8 md:w-10" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Temp;
