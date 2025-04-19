import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import { BASE_URL } from "../../utils/constant";

const ConnectionProfile = (user) => {
  const location = useLocation();
  const { userId } = useParams();
  const { theme } = useContext(ThemeContext);
  const [copied, setCopied] = useState(false);

  const requests = useSelector((store) => store.requests);
  const connections = useSelector((store) => store.connections);

  const requestProfile = requests?.filter((r) => r.fromUserId._id === userId);
  const connectionProfile = connections?.filter((r) => r?.user?._id === userId);

  const {
    _id,
    photoURL,
    firstName,
    lastName,
    about,
    skills,
    gender,
    age,
    emailId,
    headline,
    city,
    country,
    mobileNumber,
    coverPhotoURL,
  } = requestProfile?.[0]?.fromUserId || {};

  const handleCopyLink = () => {
    const profileURL = `${BASE_URL}/profile/${
      _id
        ? _id
        : connectionProfile[0]?.user?._id
        ? connectionProfile[0]?.user?._id
        : user.user._id
    }`;
    navigator.clipboard.writeText(profileURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={`${
        location.pathname === "/profile" ? "w-full pb-10" : "pb-10"
      }`}
    >
      <div
        className={`${
          location.pathname === "/profile"
            ? "lg:w-[100%] xl:w-[100%]"
            : "w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[70%]"
        }  mx-auto my-10 rounded shadow-xl bg-base-300 relative `}
      >
        {/* Cover Image */}
        <div className="relative">
          <img
            src={
              location.pathname === "/profile"
                ? user.user.coverPhotoURL
                : location.pathname.startsWith("/profile/connections/")
                ? connectionProfile[0]?.user?.coverPhotoURL
                : coverPhotoURL
            }
            className="w-full h-40 sm:h-52 md:h-64 object-cover"
            alt="cover"
          />

          {/* Profile Image */}
          <img
            src={
              location.pathname === "/profile"
                ? user.user.photoURL
                : location.pathname.startsWith("/profile/connections/")
                ? connectionProfile[0]?.user?.photoURL
                : photoURL
            }
            alt="Profile"
            className={`absolute w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full object-cover border-4 ${
              theme ? "border-white" : "border-black"
            } -bottom-10 sm:-bottom-14 left-4 sm:left-8 md:left-12`}
          />
        </div>

        {/* Text Content */}
        <div className="pt-14 sm:pt-20 md:pt-18 px-4 sm:px-6 md:px-10">
          <h4 className="text-lg sm:text-xl md:text-2xl font-semibold">
            {location.pathname === "/profile"
              ? user.user.firstName
              : location.pathname.startsWith("/profile/connections/")
              ? connectionProfile[0]?.user?.firstName
              : firstName}{" "}
            {location.pathname === "/profile"
              ? user.user.lastName
              : location.pathname.startsWith("/profile/connections/")
              ? connectionProfile[0]?.user?.lastName
              : lastName}
          </h4>
          <p className="text-[12px] sm:text-sm text-gray-600">
            {location.pathname === "/profile"
              ? user.user.headline
              : location.pathname.startsWith("/profile/connections/")
              ? connectionProfile[0]?.user?.headline
              : headline}
          </p>

          <div className="mt-2">
            <p className="text-xs sm:text-sm text-gray-500">
              {location.pathname === "/profile"
                ? user.user.city
                : location.pathname.startsWith("/profile/connections/")
                ? connectionProfile[0]?.user?.city
                : city}
              ,{" "}
              {location.pathname === "/profile"
                ? user.user.country
                : location.pathname.startsWith("/profile/connections/")
                ? connectionProfile[0]?.user?.country
                : country}
            </p>
            <p className="text-[0.3rem] sm:text-sm text-blue-600 font-medium">
              {connections.length === 0
                ? "No connections yet. Be the first to connect!"
                : `${connections.length} connection${
                    connections.length > 1 ? "s" : ""
                  }`}
            </p>
          </div>

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

          <hr className="text-gray-400" />
          <div className="py-4">
            <span className="font-semibold">About</span>
            <p className="text-sm font-light">
              {location.pathname === "/profile"
                ? user.user.about
                : location.pathname.startsWith("/profile/connections/")
                ? connectionProfile[0]?.user?.about
                : about}
            </p>
          </div>

          <hr className="text-gray-400" />
          <div className="py-4">
            <span className="font-semibold">Skills & More</span>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-base-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">
                {location.pathname === "/profile"
                  ? user.user.skills
                  : location.pathname.startsWith("/profile/connections/")
                  ? connectionProfile[0]?.user?.skills
                  : skills}
              </span>

              {
                <span className="bg-base-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">
                  Gender:{" "}
                  {location.pathname === "/profile"
                    ? user.user.gender
                    : location.pathname.startsWith("/profile/connections/")
                    ? connectionProfile[0]?.user?.gender
                    : gender}
                </span>
              }

              {
                <span className="bg-base-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">
                  Age:{" "}
                  {location.pathname === "/profile"
                    ? user.user.age
                    : location.pathname.startsWith("/profile/connections/")
                    ? connectionProfile[0]?.user?.age
                    : age}
                </span>
              }
            </div>
          </div>

          <hr className="text-gray-400" />
          <div className="py-4">
            <span className="font-semibold">Contact Information</span>
            <p className="text-sm font-light text-gray-500">
              Phone:{" "}
              {location.pathname === "/profile"
                ? user.user.mobileNumber
                : location.pathname.startsWith("/profile/connections/")
                ? connectionProfile[0]?.user?.mobileNumber
                : mobileNumber}
            </p>
            <p className="text-sm font-light text-gray-500">
              EmailId:{" "}
              {location.pathname === "/profile"
                ? user.user.email
                : location.pathname.startsWith("/profile/connections/")
                ? connectionProfile[0]?.user?.emailId
                : emailId}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionProfile;
