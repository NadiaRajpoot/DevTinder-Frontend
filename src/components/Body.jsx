import React, { useState } from "react";

import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ThemeContext } from "../ThemeContext";
function Body() {
  const [theme , setTheme] = useState(false);
  return (
   <ThemeContext.Provider value={{theme,setTheme}}>
     <div>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
   </ThemeContext.Provider>
  );
}

export default Body;
