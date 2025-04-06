import React, { useContext } from "react";
import { Context } from "./AppContext";
import user from "../assets/user.svg";
import userLight from "../assets/user-light.svg";

function RegisterResult() {
  const { state, dispatch } = useContext(Context);
  const { result, dark } = state;
  return (
    result && (
      <div
        className={`bg-${result.bgColor}-500 rounded-lg shadow-md p-10 flex flex-col justify-center items-center gap-5 max-w-96 m-auto`}
      >
        <img
          src={dark ? userLight : user}
          alt=""
          className="bg-transparent ring p-8 rounded-md"
        />
        <div className="flex flex-col justify-center items-start gap-5 w-full ">
          <h1>Name: {result.name}</h1>
          <p>Email: {result.email}</p>
          <p>Phone: {result.number}</p>
        </div>
      </div>
    )
  );
}

export default RegisterResult;
