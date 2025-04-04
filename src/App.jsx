import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./components/Body";
import "./index.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
