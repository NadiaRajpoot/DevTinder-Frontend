import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../ThemeContext";
import emailIcon from "../../public/assets/Form-icons/email.png";
import passwordIcon from "../../public/assets/Form-icons/password.png";
import personIcon from "../../public/assets/Form-icons/person.png";
import { TfiWorld } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constant";
import toast from "react-hot-toast";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { AuthFormContext } from "../LoginFormContext";

const Login = () => {
  const [emailId, setEmailId] = useState("mark77@gmail.com");
  const [password, setPassword] = useState("Mark@1234");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [remember, setRemember] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const { isLoginForm, setisLoginForm } = useContext(AuthFormContext);
  const { theme } = useContext(ThemeContext);
  const userData = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
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

      toast.success(`${res.data.message}`, {
        duration: 1000,
        style: {
          background: "#ffffff",
          color: "#1f2937",
          border: "1px solid #e5e7eb",
          padding: "12px 16px",
          fontSize: "15px",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)",
          borderRadius: "10px",
        },
        icon: <FaCircleCheck color="green" size={25} />,
      });

      setisLoginForm(true);
    } catch (err) {
      toast.error(err.response?.data?.slice(6) || "Signup failed!", {
        duration: 5000,
        style: {
          background: "#ffffff",
          color: "red",
          padding: "12px 16px",
          fontSize: "15px",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)",
          borderRadius: "5px",
        },
        icon: <RxCrossCircled color="red" size={28} />,
      });
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
      navigate("/profile");
      toast.success(`${res.data.message}`, {
        duration: 4000,
        style: {
          background: "#ffffff",
          color: "#1f2937",
          border: "1px solid #e5e7eb",
          padding: "12px 16px",
          fontSize: "15px",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)",
          borderRadius: "10px",
        },
        icon: <FaCircleCheck color="green" size={25} />,
      });
    } catch (err) {
      setLoginError(err.response?.data || "Login failed!");
      toast.error(err.response?.data.slice(6) || "Login failed!", {
        duration: 5000,
        style: {
          background: "#ffffff",
          color: "red",
          padding: "12px 16px",
          fontSize: "15px",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)",
          borderRadius: "5px",
        },
        icon: <RxCrossCircled color="red" size={25} />,
      });
    }
  };

  useEffect(() => {
    if (userData) {
      if (userData && Object.keys(userData).length > 0) {
        navigate("/feed", { replace: true });
      }

      console.log(isLoginForm);
      return;
    }

    // Push dummy state to history to trap back button
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // Only allow going back to "/" (homepage)
      const allowedBackRoutes = ["/"];
      const previousUrl = document.referrer; // works if user came from another page
      const isAllowed = allowedBackRoutes.some((route) =>
        previousUrl.endsWith(route)
      );

      if (!isAllowed) {
        navigate("/", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <div
      className={`flex items-center justify-center rounded-2xl ${
        isLoginForm ? "my-10" : "my-5"
      } bg-dark-100`}
      data-theme={`${theme ? "light" : "dark"}`}
    >
      <div
        className={`card  w-75 shrink-0 sm:w-85  shadow-lg ${
          theme === "light" ? "bg-white " : "bg-dark-300  "
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
                {isLoginForm ? loginError.slice(6) : signupError.slice(6)}
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
                Remember me
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
              onClick={(e) => {
                e.preventDefault();
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
