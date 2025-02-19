import React from 'react'

import { Outlet } from 'react-router';
import Navbar from './Navbar';
function Body() {
  return (
    <div>
      <Navbar/>
        <Outlet/>
      
    </div>
  )
}

export default Body
