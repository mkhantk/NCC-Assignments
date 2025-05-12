import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
// import useAppContext from "../../components/useAppContext";
import axios from "axios";
import useAppContext from "../../components/useAppContext";

function Signup() {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { isLogin } = state;

  const nameReg = /^[A-Z]/;
  const emailReg = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const phoneReg = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;

  const [name, setName] = useState(true);
  const [uname, setUname] = useState(true);
  const [email, setEmail] = useState(true);
  const [phone, setPhone] = useState(true);
  const [pwd1, setPwd1] = useState(true);
  const [pwd2, setPwd2] = useState(true);

  const url = "http://localhost:3000/authors";

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    let data = {};
    //test name
    if (nameReg.test(form.name.value)) {
      data.name = form.name.value;
      setName(true);
    } else {
      setName(false);
    }
    // test username

    if (form.uname.value.length >= 4) {
      data.uname = form.uname.value;
      setUname(true);
    } else {
      setUname(false);
    }
    // test email
    if (emailReg.test(form.email.value)) {
      data.email = form.email.value;
      console.log(form.email.value);
      setEmail(true);
    } else {
      console.log(emailReg.test(form.email.value));
      setEmail(false);
    }
    // test phone numberr
    if (phoneReg.test(form.phone.value)) {
      data.phone = form.phone.value;
      setPhone(true);
    } else {
      setPhone(false);
    }
    // test password
    if (form.pwd1.value.length >= 6) {
      setPwd1(true);
      if (form.pwd2.value === form.pwd1.value) {
        data.pwd = form.pwd2.value;
        setPwd2(true);
      } else setPwd2(false);
    } else setPwd1(false);

    if (Object.keys(data).length === 5) {
      console.log(data);
      data.description = "";
      data.date_since = new Date().toISOString();
      data.img = "";
      axios
        .post(url, data)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));

      form.reset();

      navigate("/login");
      // console.log(isSignup);
    } else {
      console.log(data);
    }
    // check data

    // form.reset();
    // navigate("/login");
  };

  return (
    <>
      {isLogin || localStorage.getItem("react_router_app") ? (
        <Navigate to="/" />
      ) : (
        <div className="mt-20 flex flex-col justify-center items-center m-auto  p-5 md:p-0 max-w-xl w-full">
          <h1 className="text-4xl text-blue-500 font-bold mb-5">
            Sign Up Form
          </h1>
          <form
            action=""
            className="w-full flex flex-col"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="w-full flex flex-col gap-1 relative">
              <label htmlFor="name" className="font-bold text-blue-500">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="p-2 bg-gray-200 border border-gray-400 mb-5"
                autoComplete="off"
              />
              {!name && (
                <p className="text-red-500 text-sm absolute bottom-0 ">
                  Name must begin with capital letter!
                </p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1 relative">
              <label htmlFor="uname" className="font-bold text-blue-500">
                Username
              </label>
              <input
                type="text"
                id="uname"
                placeholder="Enter Your Username"
                className="p-2 bg-gray-200 border border-gray-400 mb-5"
                autoComplete="off"
              />
              {!uname && (
                <p className="text-red-500 text-sm absolute bottom-0 ">
                  Invalid Username! Try something else.
                </p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1 relative">
              <label htmlFor="email" className="font-bold text-blue-500">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email Address"
                className="p-2 bg-gray-200 border border-gray-400 mb-5"
                autoComplete="off"
              />
              {!email && (
                <p className="text-red-500 text-sm absolute bottom-0 ">
                  Invalid Email
                </p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1 relative">
              <label htmlFor="phone" className="font-bold text-blue-500">
                Phone Number
              </label>
              <input
                type="text"
                inputMode="tel"
                id="phone"
                placeholder="Enter Your Phone Number"
                className="p-2 bg-gray-200 border border-gray-400 mb-5"
                autoComplete="off"
              />
              {!phone && (
                <p className="text-red-500 text-sm absolute bottom-0 ">
                  Invalid Phone Number!
                </p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1 relative">
              <label htmlFor="pwd1" className="font-bold text-blue-500">
                Password
              </label>
              <input
                type="password"
                id="pwd1"
                placeholder="Enter Your Password"
                className="p-2 bg-gray-200 border border-gray-400 mb-5"
              />
              {!pwd1 && (
                <p className="text-red-500 text-sm absolute bottom-0 ">
                  Invalid Password! Password must have at least 6 characters.
                </p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1 relative">
              <label htmlFor="pwd2" className="font-bold text-blue-500">
                Confirm Password
              </label>
              <input
                type="password"
                id="pwd2"
                placeholder="Re-Enter The Password"
                className="p-2 bg-gray-200 border border-gray-400 mb-5"
              />
              {!pwd2 && (
                <p className="text-red-500 text-sm absolute bottom-0 ">
                  Passwords do not match!
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white text-lg py-2 my-2"
            >
              Sign Up
            </button>
          </form>
          <div className=" text-sm my-5">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
