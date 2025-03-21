import React, { useState , useContext } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { ThemeContext } from "../ThemeContext";
import Footer from "./Footer";

function Body() {
  const location = useLocation();
  const [theme, setTheme] = useState(false);
  const isLoginPage = location.pathname === "/login";
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="min-h-screen w-full " data-theme={`${theme ? "light" : "dark"}`}>
        <Navbar />
        <Outlet />
        {!isLoginPage && <Footer />}
      </div>
    </ThemeContext.Provider>
  );
}

export default Body;
