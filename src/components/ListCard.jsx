import React, { useContext, useState, useEffect } from "react";
import { BASE_URL } from "../../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../ThemeContext";
import { removeRequests } from "../../utils/requestsSlice";
import { removeConnections } from "../../utils/connectionsSlice";
import { Link } from "react-router-dom";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

// Extracted getAboutText function
const getAboutText = (about, screenWidth) => {
  if (!about) return "";

  if (screenWidth < 640) {
    return about.slice(0, 50) + " ..."; // mobile
  } else if (screenWidth < 768) {
    return about.slice(0, 70) + " ..."; // small tablets
  } else {
    return about.slice(0, 100) + " ..."; // desktops
  }
};

const ListCard = ({ list, isConnectionPage }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle accepting or rejecting requests
  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(requestId));
    } catch (err) {
      console.log(err);
    }
  };

  // Handle removing connections
  const removeConnection = async (requestId) => {
    try {
      const res = await axios.delete(
        `${BASE_URL}/request/remove/${requestId}`,
        {
          withCredentials: true,
        }
      );
      dispatch(removeConnections(requestId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col sm:items-center sm:justify-center my-5 sm:my-10 sm:px-8">
      {/* Page Title */}
      <h1 className="font-bold sm:text-xl text-center px-2 py-4">
        {isConnectionPage ? "Connections" : "Requests"}
      </h1>

      {/* Loop through connections/requests */}
      {list &&
        list.map((connection) => {
          const user = isConnectionPage ? connection?.user : connection?.fromUserId;
          return (
            <div
              key={connection?._id}
              className="p-2 border-b border-gray-700 dark:border-gray-600 flex justify-between md:w-[70%] w-full"
            >
              {/* Profile Info & Actions Wrapper */}
              <div className="flex gap-4 flex-1">
                {/* Profile Link */}
                <Link
                  to={`/profile/${isConnectionPage ? "connections" : "request"}/${
                    isConnectionPage ? connection?.user?._id : connection?.fromUserId?._id
                  }`}
                  className="flex gap-4 md:gap-4 w-full"
                >
                  {/* Profile Image */}
                  <img
                    className="h-16 w-16 object-cover rounded-full sm:border-2 sm:border-gray-100"
                    src={user?.photoURL}
                    alt="user"
                  />
                  {/* Name & About Section */}
                  <div className="flex flex-col pr-2 gap-[1px] pt-1">
                    <div className="text-center flex items-center text-[0.8rem]">
                      {user?.firstName && (
                        <>
                          {user?.firstName.charAt(0).toUpperCase()}
                          {user?.firstName.slice(1)}{" "}
                          {user?.lastName?.charAt(0).toUpperCase()}
                          {user?.lastName?.slice(1)}
                        </>
                      )}
                    </div>
                    {/* User About */}
                    <div className=" text-[0.7rem] sm:text-[12px] text-gray-[#38434F]">
                      {getAboutText(user?.about, screenWidth)}
                    </div>
                  </div>
                </Link>

                {/* Buttons for sm and up */}
                <div className="hidden sm:flex gap-2 items-center">
                  {/* Accept / Unfriend Button */}
                  <button
                    className="text-sm rounded-full border border-gray-300 px-4 py-2 
                    text-white bg-gradient-to-b from-[#8c75e3] to-[#6f51ee] w-fit h-8 flex justify-center items-center ml-auto"
                    onClick={() => {
                      if (!isConnectionPage) {
                        reviewRequest("accepted", connection._id);
                      } else {
                        removeConnection(connection._id);
                      }
                    }}
                  >
                    {!isConnectionPage ? "Accept" : "Unfriend"}
                  </button>

                  {/* Reject Button (only on Requests page) */}
                  {!isConnectionPage && (
                    <button
                      className={`text-sm rounded-full border border-gray-300 px-4 py-2 
                      ${theme ? "text-black" : "text-white"} w-fit h-8 flex justify-end items-center ml-auto`}
                      onClick={() => reviewRequest("rejected", connection._id)}
                    >
                      Reject
                    </button>
                  )}
                </div>

                {/* Icons for mobile only */}
                <div className="flex gap-2 font-light items-center text-gray-400 sm:hidden">
                  <RxCrossCircled
                    size={32}
                    className="stroke-[0] cursor-pointer z-10"
                    role="button"
                    tabIndex={0}
                    onClick={() => reviewRequest("rejected", connection._id)}
                  />
                  {!isConnectionPage && (
                    <IoIosCheckmarkCircleOutline
                      size={32}
                      className="text-blue-500 stroke-[0] cursor-pointer z-10"
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        if (!isConnectionPage) {
                          reviewRequest("accepted", connection._id);
                        } else {
                          removeConnection(connection._id);
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ListCard;
