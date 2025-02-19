import { BrowserRouter, Routes, Route } from "react-router";

import Body from "./components/Body";
import "./index.css";
import Login from "./components/Login";

import Profile from "./components/Profile";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
