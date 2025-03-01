import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("hamza77@gmail.com");
  const [password, setPassword] = useState("Hamza@1234");
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
    <div className="flex items-center justify-center my-10">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title m-auto text-2xl">Log In</h2>
          <fieldset className="fieldset">
            <div className="my-2 ">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter email Id"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />{" "}
            </div>

            <div className="my-2">
              <legend className="fieldset-legend ">Password</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </fieldset>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary w-24 " onClick={handleLogin}>
              logIn
            </button>
          </div>

          <p className="fieldset-label py-4">New User ? SignUp</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
