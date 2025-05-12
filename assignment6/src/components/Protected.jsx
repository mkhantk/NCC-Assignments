import React from "react";
import useAppContext from "./useAppContext";
import { Navigate, useParams } from "react-router-dom";
import Signup from "../pages/auth/Signup";

function Protected({ children }) {
  const { state } = useAppContext();
  const { isLogin } = state;

  // console.log(isLogin);
  if (isLogin || localStorage.getItem("react_router_app")) {
    return children;
  } else return <Navigate to="/signup" />;

  //for unknown psot parameters
}

export default Protected;
