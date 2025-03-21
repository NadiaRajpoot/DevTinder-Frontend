import axios from "axios";
import React, { useState, useContext } from "react";
import { FaLock } from "react-icons/fa6";
import { ThemeContext } from "../ThemeContext";
import emailIcon from "../assets/Form-icons/email.png";
import passwordIcon from "../assets/Form-icons/password.png";
import { MdEmail } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const { theme } = useContext(ThemeContext);
  console.log(theme);
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4444/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="flex items-center justify-center rounded-2xl my-10 bg-dark-100 "
      data-theme={`${theme ? "light" : "dark"}`}
    >
      <div
        className={`card  w-75 shrink-0 sm:w-85  shadow-lg ${
          theme === "light" ? "bg-white  " : "bg-dark-300  "
        } `}
      >
        <div className="card-body rounded-xl  bg-gradient-to-b from-[#6f51ee]/10 to-transparent/90 p-6 text-center">
          <div className="flex items-center justify-center  ">
            <div className="bg-white shadow-2xl w-10 h-10 flex items-center rounded-lg justify-center ">
              <TfiWorld size={24} color="#6f51ee" />
            </div>
          </div>
          <h2 className="card-title m-auto text-xl">Sign In with email</h2>
          <p className="text-center font-light text-[12px]">
            Please enter your details to sign in. For free.
          </p>
          <fieldset className="fieldset">
            <div
              className={` my-2 bg-gray-100 shadow-sm rounded-xl h-10 flex items-center`}
            >
              <img src={emailIcon} alt="email" className=" w-4  ml-4 mr-3 " />

              <input
                type="text"
                className=" outline-none w-56 border-none text-black  placeholder:text-gray-400"
                placeholder="Email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            <div
              className={` my-2  bg-gray-100 shadow-sm rounded-xl h-10 flex items-center`}
            >
              <img
                src={passwordIcon}
                alt="email"
                className=" w-[14px] ml-4 mr-3 "
              />
              <input
                type="text"
                className={`outline-none w-56 border-none text-black  placeholder:text-gray-400`}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="flex items-center justify-between ">
              <label className="flex items-center text-[0.7rem] text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="mr-2 rounded border-gray-400 "
                />
                Remember for 30 days
              </label>
              <a
                href="#"
                className="text-[0.7rem] text-purple-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </fieldset>

          <div className="card-actions justify-center my-4">
            <button
              className="btn  w-full font-medium text-[0.8rem] bg-gradient-to-b from-[#8c75e3] to-[#6f51ee] text-white py-2 rounded-lg shadow-md"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </div>
          <p className="text-center text-[0.7rem] text-gray-500 ">
            Don’t have an account?{" "}
            <a href="#" className="text-purple-600 hover:underline">
              Create account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
