import React, { useContext, useState } from "react";
import { Context } from "./AppContext";

const Login = () => {
  const { state, dispatch } = useContext(Context);
  const { dark, login } = state;

  const numReg = /^\+\d+$/;
  const [isNumber, setIsNumber] = useState(true);

  const [isName, setIsName] = useState(true);
  const nameReg = /^[A-Z]/;

  const emailReg = /^[^@]+@[^@]+\.[^@]+$/;
  const [isEmail, setIsEmail] = useState(true);

  const [radioChecked, setRadioChecked] = useState("white");

  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target[3].value);
    let result = {};

    if (nameReg.test(e.target[0].value)) {
      setIsName(true);
      result.name = e.target[0].value;
    } else {
      setIsName(false);
    }

    if (emailReg.test(e.target[1].value)) {
      setIsEmail(true);
      result.email = e.target[1].value;
    } else {
      setIsEmail(false);
    }

    if (numReg.test(e.target[2].value)) {
      setIsNumber(true);
      result.number = e.target[2].value;
    } else {
      setIsNumber(false);
    }

    result.theme = radioChecked;
    let keys = Object.keys(result);
    // console.log(keys);

    if (keys.length === 4) {
      localStorage.setItem("react_app_login", JSON.stringify(result));

      dispatch({ type: "setLogin" });
      setError(false);
    } else {
      setError((prev) => !prev);
    }
    // console.log(radioChecked);
  };

  return (
    <div className="w-full min-h-screen m-auto flex justify-center items-center">
      <form
        action="post"
        className="w-[350px] md:w-1/2 md:max-w-lg m-auto flex flex-col justify-center items-center gap-5 p-5 md:p-10 ring-2 ring-blue-500 rounded-md"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 className="text-4xl font-bold text-blue-500">Login</h1>
        <div className="flex flex-col justify-center items-start w-full">
          <label htmlFor="uname">Name</label>
          <input
            type="text"
            id="uname"
            name="uname"
            className="w-full outline outline-gray-500 rounded-sm mt-2 px-2 py-2"
            placeholder="eg. John Doe"
            required
          />
          {!isName && (
            <div className="text-red-500">Must begin with capital letter</div>
          )}
        </div>
        <div className="flex flex-col justify-center items-start w-full">
          <label htmlFor="uemail">Email</label>
          <input
            type="email"
            id="uemail"
            name="uname"
            className="w-full outline outline-gray-500 rounded-sm mt-2 px-2 py-2"
            placeholder="eg. example@gmail.com"
            required
          />
          {!isEmail && <div className="text-red-500">Incorrect Email!</div>}
        </div>
        <div className="flex flex-col justify-center items-start w-full">
          <label htmlFor="uphone">Phone Number</label>
          <input
            type="text"
            id="uphone"
            name="uphone"
            className={`${
              isNumber ? "outline-gray-500" : "outline-red-500"
            } w-full outline rounded-sm mt-2 px-2 py-2 `}
            placeholder="eg. +959999999999"
            required
          />
          {!isNumber && <div className="text-red-500">Incorrect Number!</div>}
        </div>
        <div className="flex flex-col justify-center items-start gap-5 w-full">
          <label htmlFor="ucolor">Choose a theme:</label>
          <div className="flex justify-around items-center w-full">
            <div>
              <label htmlFor="ucolorDark" className="pr-5">
                Dark
              </label>
              <input
                type="radio"
                id="ucolorDark"
                name="ucolor"
                value="dark"
                onChange={() => {
                  setRadioChecked("dark");
                  dispatch({ type: "setDark" });
                }}
              />
            </div>
            <div>
              <label htmlFor="ucolorWhite" className="pr-5">
                White
              </label>
              <input
                type="radio"
                id="ucolorWhite"
                name="ucolor"
                value="white"
                checked={radioChecked === "white"}
                onChange={() => {
                  setRadioChecked("white");
                  dispatch({ type: "setLight" });
                }}
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="py-2 px-5 bg-blue-500 text-white w-full rounded-sm"
        >
          Login
        </button>
        {error && (
          <div className="text-red-500">
            Something wrong. Please check and try again.
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
