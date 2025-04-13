import axios from "axios";
import React, { useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import emailIcon from "../assets/Form-icons/email.png";
import passwordIcon from "../assets/Form-icons/password.png";
import personIcon from "../assets/Form-icons/person.png";
import { TfiWorld } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";


const Login = () => {
  const [emailId, setEmailId] = useState("elon77@gmail.com");
  const [password, setPassword] = useState("Elon@1234");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoginForm, setisLoginForm] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");

  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );

      toast.success(response.data.message);
      setisLoginForm(true); //  switch to login form after signup
    } catch (err) {
    
      setSignupError(err.response?.data || "Signup failed!");
    }
  
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setLoginError(err.response?.data || "Login failed!");
    }
  };

  return (
    <div
      className={`flex items-center justify-center rounded-2xl ${
        isLoginForm ? "my-10" : "my-5"
      } bg-dark-100`}
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
          <h2 className="card-title m-auto text-xl"></h2>
          {`${isLoginForm ? "Sign In with email" : "Create an account"}`}
          <p className="text-center font-light text-[12px]">
            {`  Please enter your details to ${
              isLoginForm ? "sign in" : "sign up"
            }. For free.`}
          </p>

          <fieldset className="fieldset ">
            {!isLoginForm && (
              <>
                <div
                  className={`  bg-gray-100 shadow-sm rounded-xl h-10 flex items-center`}
                >
                  <img
                    src={personIcon}
                    alt="email"
                    className=" w-4  ml-4 mr-3 "
                  />

                  <input
                    type="text"
                    className=" outline-none w-56 border-none text-black  placeholder:text-gray-400"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    req
                  />
                </div>
                <div
                  className={` my-2 bg-gray-100 shadow-sm rounded-xl h-10 flex items-center`}
                >
                  <img
                    src={personIcon}
                    alt="email"
                    className=" w-4  ml-4 mr-3 "
                  />

                  <input
                    type="text"
                    className=" outline-none w-56 border-none text-black  placeholder:text-gray-400"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}

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

            {(isLoginForm && loginError) || (!isLoginForm && signupError) ? (
              <p className="text-red-500 text-left ml-5 mb-2 text-xs">
                {isLoginForm ? loginError : signupError}
              </p>
            ) : null}

            <div className="flex items-center justify-between ">
              <label className="flex items-center text-[0.7rem] text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="mr-2 rounded border-gray-400  "
                />
                Remember for 7 days
              </label>
              {isLoginForm && (
                <a
                  href="#"
                  className="text-[0.7rem] text-purple-600 hover:underline"
                >
                  Forgot password?
                </a>
              )}
            </div>
          </fieldset>

          <div
            className={`card-actions justify-center {${
              isLoginForm ? "my-4" : "my-2"
            }}`}
          >
            <button
              className="btn  w-full font-medium text-[0.8rem] bg-gradient-to-b from-[#8c75e3] to-[#6f51ee] text-white py-2 rounded-lg shadow-md"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {`${isLoginForm ? "Sign in" : "Sign up"}`}
            </button>
          </div>
          <p className="text-center text-[0.7rem] text-gray-500 ">
            {`${
              isLoginForm ? "Don’t have an account?" : "Already on devTinder?"
            }`}
            <a
              href="#"
              onClick={() => {
                setisLoginForm(!isLoginForm);
              }}
              className="text-purple-600 hover:underline"
            >
              {`${isLoginForm ? " Create account" : " Sign In"}`}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
