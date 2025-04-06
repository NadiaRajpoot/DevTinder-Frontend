import React, { useState, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import UserCard from "./userCard";
import { BASE_URL } from "../../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import axios from "axios";
const ProfileEdit = ({ user }) => {
  const [age, setAge] = useState(user?.data?.age);
  const [firstName, setFirstName] = useState(user?.data?.firstName);
  const [lastName, setLastName] = useState(user?.data?.lastName);
  const [gender, setGender] = useState(user?.data?.gender);
  const [skills, setSkills] = useState(user?.data?.skills);
  const [photoURL, setPhotoURL] = useState(user?.data?.photoURL);
  const [about, setAbout] = useState(user?.data?.about);
  const [error, setError] = useState("");
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const handleSaveProfile = async () => {
    try {
        const res = await axios.patch(BASE_URL + "/profile/edit",
        { photoURL, age, gender, skills, about ,firstName, lastName },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      console.log(res.data.data)
    } catch (err) {
      setError(error);
    }
  };

  return (
    <div className="flex gap-8">
      <div
        className={`flex items-center justify-center rounded-2xl 
          "my-10"
         bg-dark-100`}
        data-theme={`${theme ? "light" : "dark"}`}
      >
        <div
          className={`card  w-75 shrink-0 sm:w-85  shadow-lg ${
            theme === "light" ? "bg-white  " : "bg-dark-300  "
          } `}
        >
          <div className="card-body rounded-xl  bg-gradient-to-b from-[#6f51ee]/10 to-transparent/90 p-6 text-center">
            <div className="flex items-center justify-center  "></div>
            <h2 className="card-title m-auto text-xl">Edit Profile</h2>

            <fieldset className="fieldset">
              <div className="bg-gray-100 shadow-sm rounded-xl h-10 flex items-center">
                <input
                  type="text"
                  className="ml-4 outline-none w-56 border-none text-black placeholder:text-gray-400"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="my-2 bg-gray-100 shadow-sm rounded-xl h-10 flex items-center">
                <input
                  type="text"
                  className="ml-4 outline-none w-56 border-none text-black placeholder:text-gray-400"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="flex space-x-4">
                {/* Gender Dropdown */}
                <div className="bg-gray-100 shadow-sm rounded-xl h-10 flex items-center flex-grow">
                  <select
                    className="ml-4 outline-none border-none text-black bg-gray-100 placeholder:text-gray-400"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">{gender? gender : "Select Gender"}</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Age Dropdown */}
                <div className="bg-gray-100 shadow-sm rounded-xl h-10 flex items-center flex-grow">
                  <select
                    className="ml-4 outline-none border-none text-black bg-gray-100 placeholder:text-gray-400"
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

              <div className="my-2 bg-gray-100 shadow-sm rounded-xl h-10 flex items-center">
                <input
                  type="text"
                  className="ml-4 outline-none w-56 border-none text-black placeholder:text-gray-400"
                  placeholder="Skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>

              <div className="my-2 bg-gray-100 shadow-sm rounded-xl h-10 flex items-center">
                <input
                  type="text"
                  className="ml-4 outline-none w-56 border-none text-black placeholder:text-gray-400"
                  placeholder="Photo URL"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
              </div>

              <div className="my-2 bg-gray-100 shadow-sm rounded-xl flex items-center">
                <textarea
                  className="ml-4 outline-none w-full border-none text-black placeholder:text-gray-400 resize-none py-2"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
            </fieldset>

            <p className="text-red-500 text-left ml-5 mb-2 text-xs">{error}</p>

            <div className={`card-actions justify-center `}>
              <button
                className="btn  w-full font-medium text-[0.8rem] bg-gradient-to-b from-[#8c75e3] to-[#6f51ee] text-white py-2 rounded-lg shadow-md"
                onClick={handleSaveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Card */}
      <div className="flex flex-col items-center justify-between max-w-md w-full my-8">
        <UserCard
          user={{ firstName, lastName, photoURL, age, gender, skills, about }}
        />
      </div>
    </div>
  );
};

export default ProfileEdit;
