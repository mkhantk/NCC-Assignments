import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAppContext from "./useAppContext";

function NavBar() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { isLogin, isDelete } = state;
  const location = useLocation();
  const isSignup = location.pathname.includes("signup");

  const loginout = () => {
    if (!isLogin && !localStorage.getItem("react_router_app")) {
      return (
        <NavLink
          to="login"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-bold w-16 text-center"
              : " w-16 text-center"
          }
        >
          Log In
        </NavLink>
      );
    } else
      return (
        <NavLink
          to="login"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-bold w-16 text-center"
              : " w-16 text-center"
          }
          onClick={() => {
            dispatch({ type: "setLogout" });
            localStorage.removeItem("react_router_app");
          }}
        >
          Log out
        </NavLink>
      );
  };
  return (
    <div
      className={`w-full  border-b border-gray-200 sticky top-0 z-50 px-2 ${
        isDelete ? "opacity-0" : "bg-white"
      }`}
    >
      <nav className="md:max-w-6xl flex justify-end items-center gap-8 py-5 m-auto">
        <h1
          className="mr-auto font-bold text-lg md:text-2xl cursor-pointer "
          onClick={() => navigate("/")}
        >
          Post&Comment
        </h1>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-bold w-16 text-center"
              : " w-16 text-center"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="posts"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-bold w-16 text-center"
              : " w-16 text-center"
          }
        >
          Posts
        </NavLink>
        <NavLink
          to="author"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500 font-bold w-16 text-center"
              : " w-16 text-center"
          }
        >
          Author
        </NavLink>
        {isLogin || localStorage.getItem("react_router_app") ? (
          <NavLink
            to="create"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-bold w-16 text-center"
                : " w-16 text-center"
            }
          >
            Create
          </NavLink>
        ) : (
          ""
        )}
        {isSignup ? (
          <NavLink
            to="signup"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-bold w-16 text-center"
                : " w-16 text-center"
            }
          >
            Sign Up
          </NavLink>
        ) : (
          loginout()
        )}
        {/* {!isSignup && loginout()} */}
      </nav>
    </div>
  );
}

export default NavBar;
