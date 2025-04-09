import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";
const UserCard = ({ user }) => {
  const { theme } = useContext(ThemeContext);
  const { firstName, lastName, about, photoURL, age, gender, skills } = user;
  return (
    <div
      className={`card  w-75 shrink-0 sm:w-85  shadow-lg ${
        theme === "light" ? "bg-white  " : "bg-dark-400  "
      } `}
    >
      <figure className="w-full h-56 overflow-hidden">
        <img src={photoURL} alt="user" className="w-full h-full object-cover" />
      </figure>
      <div className="card-body">
        <div className="card-title ">{firstName + " " + lastName}</div>
        <div className="flex gap-2 w-fit">
          <div>{age} years old</div>
          <p>-</p>
          <p>{gender?.charAt(0).toUpperCase() + gender?.slice(1)}</p>
        </div>
        
          <span className="mr-2"> Skills:  {skills?.length > 28 ? `${skills.substring(0, 28) }...` : skills }</span>
       

        <p className="mb-4 overflow-hidden text-[0.8rem]">
          {about?.length > 100 ? `${about.substring(0, 100)}...` : about}
        </p>

        <div className="card-actions justify-end">
          <button className="btn  font-medium text-[0.8rem] bg-gradient-to-b from-[#8c75e3] to-[#6f51ee] text-white py-2 rounded-lg shadow-md">
            Ignore
          </button>
          <button className="btn   font-medium text-[0.8rem] bg-gradient-to-b from-[#8c75e3] to-[#6f51ee] text-white py-2 rounded-lg shadow-md">
            Request Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
