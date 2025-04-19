import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import "./index.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Feed from "./components/Feed";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import ConnectionProfile from "./components/ConnectionProfile";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests/>} />
              <Route path="/profile/:userId" element={<ConnectionProfile/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
