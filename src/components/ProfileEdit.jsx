import React, { useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import UserCard from "./UserCard";
import { BASE_URL } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import axios from "axios";
import ConnectionProfile from "../components/ConnectionProfile";
import { useLocation } from "react-router-dom";

const ProfileEdit = ({ user }) => {
  const [age, setAge] = useState(user?.data?.age);
  const [firstName, setFirstName] = useState(user?.data?.firstName);
  const [email, setEmail] = useState(user?.data?.emailId);
  const [lastName, setLastName] = useState(user?.data?.lastName);
  const [gender, setGender] = useState(user?.data?.gender);
  const [skills, setSkills] = useState(user?.data?.skills);
  const [photoURL, setPhotoURL] = useState(user?.data?.photoURL);
  const [city, setCity] = useState(user?.data?.city);
  const [country, setCountry] = useState(user?.data?.country);
  const [mobileNumber, setmobileNumber] = useState(user?.data?.mobileNumber);
  const [headline, setHeadline] = useState(user?.data?.headline);
  const [about, setAbout] = useState(user?.data?.about);
  const [coverPhotoURL, setCoverPhotoURL] = useState(user?.data?.coverPhotoURL);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
const location= useLocation();
  const handleSaveProfile = async () => {
    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          photoURL,
          age,
          gender,
          skills,
          about,
          city,
          gender,
          country,
          coverPhotoURL,
          mobileNumber,
          headline
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      const errorMessage = err?.response?.data?.error;
      if (errorMessage) {
        setError(errorMessage);
      }
    }
  };



  return (
    <>
      <div
        className={`${location.pathname === "/profile" && "flex-1 " 
        } flex flex-col md:flex-row gap-8 md:items-start items-center justify-center p-6 mx-5`}
        data-theme={`${theme ? "light" : "dark"}`}
      >
        {/* Profile Edit Form */}
        <div
          className={`w-full md:flex-1 rounded-2xl shadow-lg ${
            theme === "light" ? "bg-white" : "bg-base-300"
          }`}
        >
          <div className="card-body bg-base-200 p-6 rounded-lg">
            <h2 className="card-title text-xl text-center">Edit Profile</h2>

            <fieldset className="mt-4">
              {/* First & Last Name */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 mb-2">
                <div className="mb-4 sm:mb-0 flex-1">
                  <label className="text-sm font-medium mb-1 block text-left text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full h-12 outline-[1px] outline-gray-200 cursor-not-allowed"
                    placeholder="First name"
                    value={firstName}
                    disabled
                  />
                </div>
                <div className="flex-1 mb-4">
                  <label className="text-sm font-medium mb-1 block text-left text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full h-12 focus:outline-0 outline-[1px] outline-gray-200 cursor-not-allowed"
                    placeholder="Last name"
                    value={lastName}
                    disabled
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-1 block text-left text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="input w-full h-12 bg-base-200 text-gray-500 border outline-[1px] outline-gray-200 cursor-not-allowed"
                  placeholder="yourname@example.com"
                  value={email}
                  disabled
                />
              </div>

              {/* Headline */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-1 block text-left text-gray-700">
                  Headline
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full h-12 focus:outline-0"
                  placeholder="e.g. Full Stack Developer"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </div>

              {/* Profile Photo URL */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-1 block text-left text-gray-700">
                  Profile Photo URL
                </label>
                <div className="flex items-center gap-3">
                  {photoURL && (
                    <img
                      src={photoURL}
                      alt="Preview"
                      className="w-12 h-12 rounded-full object-cover border border-gray-300"
                    />
                  )}
                  <input
                    type="text"
                    className="input input-bordered w-full h-12 focus:outline-0"
                    placeholder="Photo URL"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />
                </div>
              </div>

              {/* Cover Photo URL */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-1 block text-left text-gray-700">
                  Cover Photo URL
                </label>
                <div className="flex items-center gap-3">
                  {coverPhotoURL && (
                    <img
                      src={coverPhotoURL}
                      alt="Preview"
                      className="w-12 h-12 rounded-full object-cover border border-gray-300"
                    />
                  )}
                  <input
                    type="text"
                    className="input input-bordered w-full h-12 focus:outline-0"
                    placeholder="Cover Photo URL"
                    value={coverPhotoURL}
                    onChange={(e) => setCoverPhotoURL(e.target.value)}
                  />
                </div>
              </div>

              {/* Gender & Age */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0">
                  <label className="text-sm font-medium mb-1 block text-left text-gray-700">
                    Gender
                  </label>
                  <select
                    className="input input-bordered w-full h-12 focus:outline-0"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">
                      {gender ? gender : "Select Gender"}
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex-1 mb-4">
                  <label className="text-sm font-medium mb-1 block text-left text-gray-700">
                    Age
                  </label>
                  <select
                    className="input input-bordered w-full h-12 focus:outline-0"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  >
                    <option value="">Select Age</option>
                    {Array.from({ length: 83 }, (_, i) => (
                      <option key={i + 18} value={i + 18}>
                        {i + 18}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Country & City */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
                <div className="flex-1 mb-4 sm:mb-0">
                  <label className="text-sm font-medium mb-1 block text-left text-gray-700">
                    Country
                  </label>
                  <select
                    className="input input-bordered w-full h-12 focus:outline-0"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="India">India</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                </div>
                <div className="flex-1 mb-4">
                  <label className="text-sm font-medium mb-1 block text-left text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full h-12 focus:outline-0"
                    placeholder="e.g. Lahore"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              {/* Mobile */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-1 block text-left text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  className={`input input-bordered w-full h-12 focus:outline-0 ${
                    mobileNumber && !/^\d{10,15}$/.test(mobileNumber)
                      ? "border-red-500"
                      : ""
                  }`}
                  placeholder="e.g. 03001234567"
                  value={mobileNumber}
                  onChange={(e) => setmobileNumber(e.target.value)}
                />
                {mobileNumber && !/^\d{10,15}$/.test(mobileNumber) && (
                  <p className="text-red-500 text-sm mt-1">
                    Mobile number must be 10–15 digits only.
                  </p>
                )}
              </div>

              {/* Skills */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-1 block text-left text-gray-700">
                  Skills (separated by commas)
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full h-12 focus:outline-0"
                  placeholder="e.g. JavaScript, React, Node.js"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>

              {/* About */}
              <div className="mb-4">
                <label className="text-sm font-medium mb-1 block text-left text-gray-700">
                  About
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-28 resize-none focus:outline-0"
                  placeholder="Tell something about yourself..."
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
            </fieldset>

            {error && (
              <p className="text-red-500 text-left ml-2 mb-2 text-xs">
                {error}
              </p>
            )}

            <div className="card-actions">
              <button
                className="btn font-medium text-sm bg-gradient-to-b from-[#8c75e3] to-[#6f51ee] text-white py-2 rounded-lg shadow-md"
                onClick={handleSaveProfile}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview Card */}
        <div className={`${location.pathname === "/profile" ? "flex md:w-[500px] w-full" : "md:w-[350px] w-full"}`}>
          {/* <UserCard user={...} /> */}
          <ConnectionProfile user = {{ photoURL , firstName , lastName , age ,gender, skills , coverPhotoURL , city, country , headline , about,email, mobileNumber}}/>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileEdit;
