import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { ThemeContext } from "../ThemeContext";
import { LoadingContext } from "../LoadingContext";
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
  const [isLoading , setIsLoading]  = useState(false);
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

    <LoadingContext.Provider value = {{isLoading , setIsLoading}} >
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
    </LoadingContext.Provider>
  );
}

export default Body;
