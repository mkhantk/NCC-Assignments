import React, { useEffect, useState } from "react";
import useAppContext from "../../components/useAppContext";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [isEmail, setIsEmail] = useState(true);

  const { state } = useAppContext();
  const { isLogin } = state;

  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const [Error, setError] = useState([false, ""]);

  const [author, setAuthor] = useState([]);

  const url = "http://localhost:3000/authors";

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get(url);
        setAuthor(response.data);
        // console.log(author);
      } catch (error) {
        console.error(error);
      }
    };

    fetchedData();
  }, [author.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    // console.log(form.emailOrPhone.value, form.pwd.value);
    let data = [];

    if (form[0].id === "email") {
      data.email = form.email.value;
    }

    if (form[0].id === "phone") {
      data.phone = form.phone.value;
    }

    data.pwd = form.pwd.value;
    const selected = checkWithServer(form[0].id, data);

    //
    //  // console.log(data);
    form.reset();
    selected[0].description === "" ? navigate("/author") : navigate("/");
    dispatch({ type: "setLogin" });
  };
  // console.log(autho);
  // console.log(author);

  const checkWithServer = (eOrP, data) => {
    if (author.some((item) => item[eOrP] === data[eOrP])) {
      const selectedAuthor = author.filter((item) => item[eOrP] === data[eOrP]);

      setError([false, ""]);

      if (selectedAuthor[0].pwd === data.pwd) {
        setError([false, ""]);

        localStorage.setItem("react_router_app", selectedAuthor[0].email);
        return selectedAuthor;
      } else {
        setError([true, eOrP]);
      }
    } else {
      setError([true, eOrP]);
    }

    // author.map((item) => {
    //   console.log(item[eOrP]);
    //   console.log(data[eOrP]);
    //   console.log(item[eOrP] === data[eOrP]);
    // });
  };
  const displayError = (error) => {
    return (
      <div className=" text-red-700 px-6 py-4 border border-red-400 bg-red-200 absolute -top-18">
        {error} or password is incorrect or invalid.
      </div>
    );
  };

  return (
    <>
      {isLogin || localStorage.getItem("react_router_app") ? (
        <Navigate to="/" />
      ) : (
        <div className="mt-20 flex flex-col justify-center items-center gap-5 p-5 md:p-10 max-w-lg m-auto ring ring-gray-300 relative">
          <h1 className="text-4xl text-blue-500 font-bold">Log in</h1>
          <form
            action=""
            className="flex flex-col justify-center items-center gap-5 w-full p-5"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              id={isEmail ? "email" : "phone"}
              type={isEmail ? "email" : "text"}
              placeholder={isEmail ? "email address" : "phone number"}
              inputMode={isEmail ? "email" : "tel"}
              className={`w-full border border-gray-400 p-2 bg-gray-200 `}
              required
            />
            <input
              id="pwd"
              type="password"
              placeholder="password"
              className="w-full border border-gray-400 p-2 bg-gray-200"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white text-lg w-full py-2 font-bold"
            >
              Log In
            </button>
            <div
              className="text-sm text-blue-500 cursor-pointer"
              onClick={(e) => {
                e.target.parentElement.reset();
                setIsEmail((prev) => !prev);
              }}
            >
              {isEmail ? "Login with phone number" : "Login with email address"}
            </div>
          </form>
          <div className="text-sm">
            Don't have account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </span>
          </div>
          {Error[0] && displayError(Error[1])}
        </div>
      )}
    </>
  );
}

export default Login;
