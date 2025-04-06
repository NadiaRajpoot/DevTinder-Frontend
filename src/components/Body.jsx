import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { ThemeContext } from "../ThemeContext";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/constant";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
function Body() {
  const location = useLocation();
  const [theme, setTheme] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res?.data));
    } catch (err) {
      if (err.status === 401) {
        return navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className="min-h-screen w-full "
        data-theme={`${theme ? "light" : "dark"}`}
      >
        <Navbar />
        <Outlet />
        {!isLoginPage && <Footer />}
      </div>
    </ThemeContext.Provider>
  );
}

export default Body;
