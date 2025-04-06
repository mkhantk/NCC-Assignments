import React, { useContext, useState } from "react";
import { Context } from "./AppContext";
import RegisterResult from "./RegisterResult";

const Register = () => {
  const { state, dispatch } = useContext(Context);
  const { result } = state;

  const numReg = /^\d+$/;
  const [isNumber, setIsNumber] = useState(true);

  const [isName, setIsName] = useState(true);
  const nameReg = /^[A-Z]/;

  const emailReg = /^[^@]+@[^@]+\.[^@]+$/;
  const [isEmail, setIsEmail] = useState(true);

  const [isPwd, setIsPwd] = useState(true);
  const [isConfirm, setIsConfirm] = useState(true);

  const [isBg, setIsBg] = useState(true);

  // const [radioChecked, setRadioChecked] = useState("white");

  // const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {};

    if (nameReg.test(e.target[0].value)) {
      // console.log("name confirmed");
      data.name = e.target[0].value;
      setIsName(true);
    } else {
      //error
      setIsName(false);
    }

    if (emailReg.test(e.target[1].value)) {
      // console.log("email confirmed");
      data.email = e.target[1].value;
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }

    if (numReg.test(e.target[2].value)) {
      // console.log("number confirmed");
      data.number = e.target[2].value;
      setIsNumber(true);
    } else {
      setIsNumber(false);
    }

    if (e.target[3].value.length >= 6) {
      if (e.target[3].value === e.target[4].value) {
        data.password = e.target[4].value;
        setIsPwd(true);
        setIsConfirm(true);
      } else {
        setIsConfirm(false);
      }
    } else {
      setIsPwd(false);
    }

    if (e.target[5].options[e.target[5].selectedIndex].value !== "default") {
      data.bgColor = e.target[5].options[e.target[5].selectedIndex].value;
      setIsBg(true);
    } else {
      setIsBg(false);
    }

    if (Object.keys(data).length === 5) {
      dispatch({ type: "displayResult", payload: data });
      e.target.reset();
    } else {
      console.log("not enough data");
      // e.target.reset();
    }
  };

  return (
    <div className="w-full min-h-screen m-auto flex justify-center items-center md:max-w-5xl md:text-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full p-10 ">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-500 my-8">
            Register
          </h1>
          <form
            action=""
            method="post"
            className="flex flex-col gap-5"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <label htmlFor="uname">Name</label>
              <input
                type="text"
                id="uname"
                className="border border-gray-900 dark:border-blue-500 rounded-md px-2 py-2 text-xl w-full"
                required
              />

              {!isName && (
                <div className="text-red-500">
                  *Name must start with uppercase letter*
                </div>
              )}
            </div>
            <div>
              <label htmlFor="uemail">Email</label>
              <input
                id="uemail"
                type="email"
                className="border border-gray-900 dark:border-blue-500 rounded-md px-2 py-2 text-xl w-full"
                required
              />
              {!isEmail && (
                <div className="text-red-500">*Incorrect Email!*</div>
              )}
            </div>
            <div>
              <label htmlFor="uphone">Phone Number</label>
              <input
                id="uphone"
                type="tel"
                className="border border-gray-900 dark:border-blue-500 rounded-md px-2 py-2 text-xl w-full"
                inputMode="numeric"
                required
              />
              {!isNumber && (
                <div className="text-red-500">*Invalid phone number*</div>
              )}
            </div>
            <div>
              <label htmlFor="pwd">Password</label>
              <input
                type="password"
                id="pwd"
                className="border border-gray-900 dark:border-blue-500 rounded-md px-2 py-2 text-xl w-full"
                required
              />
              {!isPwd && (
                <div className="text-red-500">
                  *Password must have at least 6 characters*
                </div>
              )}
            </div>
            <div>
              <label htmlFor="confpwd">Confirm Password</label>
              <input
                type="password"
                id="confpwd"
                className="border border-gray-900 dark:border-blue-500 rounded-md px-2 py-2 text-xl w-full"
                required
              />
              {!isConfirm && (
                <div className="text-red-500">*Password do not match*</div>
              )}
            </div>
            <div>
              {/* <label htmlFor="color">Color:</label> */}
              <select
                name="color"
                id="color"
                required
                defaultValue={0}
                className="w-full bg-gray-200 dark:bg-gray-900 border border-gray-900 dark:border-blue-500 rounded-md px-2 py-2 dark:placeholder-gray-300 "
              >
                <option value="default" className=" text-center ">
                  -- choose a backgroind color --
                </option>

                <option value="red">🟥 Red</option>
                <option value="purple">🟪 Purple</option>
                <option value="blue">🟦 Blue</option>
                <option value="lime">🟩 Green</option>
                <option value="yellow">🟨 Yellow</option>
                <option value="orange">🟧 Orange</option>
              </select>
              {!isBg && (
                <div className="text-red-500">*Choose a background color*</div>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md "
            >
              Register
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-start items-center ">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-500 my-8">
            Output
          </h1>
          <RegisterResult />
        </div>
      </div>
    </div>
  );
};

export default Register;
