import { ThemeContext } from "../ThemeContext";
import React, { useContext } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addRequests } from "../../utils/requestsSlice";
import { removeFromFeed } from "../../utils/feedSlice";
import { BASE_URL } from "../../utils/constant";

const UserCard = ({ user }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const { _id, firstName, lastName, about, age, gender, skills, photoURL } = user;

  const handleSwipe = (direction) => {
    sendRequest(_id, direction === "left" ? "ignored" : "interested");
  };

  const sendRequest = async (userId, status) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFromFeed(userId));
      dispatch(addRequests(res.data));
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  return (
    <TinderCard
      onSwipe={handleSwipe}
      className={`${
        location.pathname === "/" ? "w-[320px] h-[500px] " : "w-[400px] h-auto"
      } max-w-full cursor-grab active:cursor-grabbing`}
      swipeRequirementType="position"
      swipeThreshold={100}
      preventSwipe={["up", "down"]}
    >
      <div
        className={`w-full h-full rounded-xl  overflow-hidden shadow-lg flex flex-col ${
          theme === "light" ? "bg-white" : "bg-dark-400"
        }`}
      >
        <img
          src={photoURL || ""}
          draggable="false"
          loading="lazy"
          alt="user"
          className="h-[60%] w-full object-cover"
        />
        <div className="flex flex-col justify-between p-4 bg-base-200 flex-grow">
          <div className="font-semibold text-lg">
            {firstName} {lastName}
          </div>
          <div className="flex gap-2 text-sm text-gray-600">
            {age && <span>{age} years old</span>}
            {age && <span>-</span>}
            <span>{gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : ""}</span>
          </div>
          <div className="text-sm mt-2 text-gray-700">
            <span className="font-medium">Skills: </span>
            {skills.length > 100  ? `${skills.substring(0, 28)}...` : skills}
          </div>
          <p className="text-sm mt-2 text-gray-700">
            {about?.length > 100 ? `${about.substring(0, 100)}...` : about}
          </p>

          {location.pathname === "/" && (
            <div className="flex justify-end gap-2 mt-auto pt-4">
              <button
                className="btn text-xs bg-gradient-to-b from-[#8c75e3] to-[#6f51ee] text-white py-2 px-4 rounded-md"
                onClick={() => sendRequest(_id, "ignored")}
              >
                Ignore
              </button>
              <button
                className="btn text-xs bg-gradient-to-b from-[#8c75e3] to-[#6f51ee] text-white py-2 px-4 rounded-md"
                onClick={() => sendRequest(_id, "interested")}
              >
                Request Now
              </button>
            </div>
          )}
        </div>
      </div>
    </TinderCard>
  );
};

export default UserCard;
