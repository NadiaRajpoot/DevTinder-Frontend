import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../content/nav-items";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { removeUser } from "../../utils/userSlice";
import { toast } from "react-hot-toast";
import { FaCircleCheck } from "react-icons/fa6";
import { AuthFormContext } from "../LoginFormContext";
const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setisLoginForm } = useContext(AuthFormContext);
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );
      setisLoginForm(true);

      dispatch(removeUser());

      toast.success(res.data, {
        duration: 3000,
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
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div
      className={`navbar ${isLoginPage ? "" : "shadow-sm"}`}
      data-theme={`${theme ? "light" : "dark"}`}
    >
      <div className="flex-1">
        <img
          className="btn btn-ghost object-cover"
          src={`${
            theme
              ? "src/assets/LightThemeLogo.png"
              : "src/assets/DarkThemeLogo.png"
          }`}
          alt="logo"
        />
      </div>

      {user && (
        <>
          {/* navigation links */}
          <div className="hidden md:flex gap-2 items-center mx-4">
            <ul className="flex gap-10 mr-4">
              {navItems.map((item) => (
                <Link key={item.id} to={item.path}>
                  {" "}
                  <li className="flex flex-col items-center">
                    {item.icon}
                    <span className="text-[0.8rem]">{item.title}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          <div className="flex gap-2 mx-2">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user?.data?.photoURL
                        ? user?.data?.photoURL
                        : "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
                    }
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu  menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li className="md:hidden">
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link className="justify-between" to="/profile">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li className="md:hidden">
                  <Link to="/connections">Connections</Link>
                </li>
                <li className="md:hidden">
                  <Link to="/requests">Requests</Link>
                </li>
                <li className="md:visible">
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
      {theme ? (
        <svg
          onClick={() => setTheme(!theme)}
          className="swap-on h-8 w-8 fill-current mx-2 "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path>
        </svg>
      ) : (
        <svg
          onClick={() => setTheme(!theme)}
          className="swap-off h-8 w-8 fill-current  mx-2  "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"></path>
        </svg>
      )}
    </div>
  );
};

export default Navbar;
