import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import { BASE_URL } from "../../utils/constant";

const ConnectionProfile = ({ user }) => {
  const location = useLocation();
  const { userId } = useParams();
  const { theme } = useContext(ThemeContext);
  const [copied, setCopied] = useState(false);

  const requests = useSelector((store) => store.requests);
  const connections = useSelector((store) => store.connections);

  const requestProfile = requests?.find((r) => r.fromUserId._id === userId);
  const connectionProfile = connections?.find((r) => r?.user?._id === userId);

  const currentUser =
    location.pathname === "/profile"
      ? user
      : location.pathname.startsWith("/profile/connections/")
      ? connectionProfile?.user
      : requestProfile?.fromUserId;

  const {
    _id,
    photoURL,
    coverPhotoURL,
    firstName,
    lastName,
    about,
    skills,
    gender,
    age,
    emailId,
    email,
    headline,
    city,
    country,
    mobileNumber,
  } = currentUser || {};

  const profileId = _id || user?._id;
  const profileURL = `${BASE_URL}/profile/${profileId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`${location.pathname === "/profile" ? "w-full pb-10" : "pb-10"}`}>
      <div
        className={`${
          location.pathname === "/profile"
            ? "lg:w-[100%] xl:w-[100%]"
            : "w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%]"
        } mx-auto my-10 rounded shadow-xl bg-base-300 relative`}
      >
        {/* Cover Image */}
        <div className="relative">
          <img
            src={coverPhotoURL}
            className="w-full h-40 sm:h-52 md:h-64 object-cover"
            alt="cover"
          />

          {/* Profile Image */}
          <img
            src={photoURL}
            alt="Profile"
            className={`absolute w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full object-cover border-4 ${
              theme ? "border-white" : "border-black"
            } -bottom-10 sm:-bottom-14 left-4 sm:left-8 md:left-12`}
          />
        </div>

        {/* Profile Info */}
        <div className="pt-14 sm:pt-20 md:pt-18 px-4 sm:px-6 md:px-10">
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold">
            {firstName} {lastName}
          </h4>
          <p className="text-[12px] sm:text-sm text-gray-600">{headline}</p>

          <div className="mt-2">
            <p className="text-xs sm:text-sm text-gray-500">
              {city}, {country}
            </p>
            <p className="text-[0.3rem] sm:text-sm text-blue-600 font-medium">
              {connections.length === 0
                ? "No connections yet. Be the first to connect!"
                : `${connections.length} connection${
                    connections.length > 1 ? "s" : ""
                  }`}
            </p>
          </div>

          {/* Buttons */}
          <div className="my-4 flex gap-2">
            <button className="bg-gradient-to-b text-sm from-[#8c75e3] to-[#6f51ee] text-white py-2 rounded-full shadow-lg w-full">
              Message
            </button>

            <button
              onClick={handleCopyLink}
              className={`bg-transparent text-sm ${
                !theme ? "text-white border-white" : "text-black border-black"
              } py-2 rounded-full shadow-lg px-6 border w-full`}
            >
              {copied ? "Link Copied!" : "Copy Profile Link"}
            </button>
          </div>

          {/* About */}
          <hr className="text-gray-400" />
          <div className="py-4">
            <span className="font-semibold">About</span>
            <p className="text-sm font-light">{about}</p>
          </div>

          {/* Skills & More */}
          <hr className="text-gray-400" />
          <div className="py-4">
            <span className="font-semibold">Skills & More</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-base-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">
                {skills}
              </span>
              <span className="bg-base-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">
                Gender: {gender}
              </span>
              <span className="bg-base-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">
                Age: {age}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <hr className="text-gray-400" />
          <div className="py-4">
            <span className="font-semibold">Contact Information</span>
            <p className="text-sm font-light text-gray-500">
              Phone: {mobileNumber}
            </p>
            <p className="text-sm font-light text-gray-500">
              EmailId: {emailId || email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionProfile;
