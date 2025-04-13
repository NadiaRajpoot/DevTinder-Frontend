import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ConnectionProfile = () => {
  const { userId } = useParams();
  const users = useSelector((store) => store.requests);
  const profile = users.filter((r) => r.fromUserId._id === userId);

  const { photoURL, firstName, lastName, about, skills, gender, age } =
    profile?.[0]?.fromUserId || {};

  return (
    <div className="my-10 p-6 border-2 border-gray-200 rounded-lg shadow-lg mx-auto w-[70%]">
      <div className="relative bg-gradient-to-b from-[#8c75e3] to-[#6f51ee] p-6 rounded-lg text-white">
        {/* Profile Image */}
        <img
          className="w-32 h-32 object-cover rounded-full border-4 border-white absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4"
          src={photoURL}
          alt="profileImage"
        />
        
        {/* Profile Name and About */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-semibold">
            {firstName} {lastName}
          </h3>
          <p className="mt-2 text-sm text-gray-200">{about}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills Section */}
          <div>
            <h4 className="text-xl font-semibold text-gray-700">Skills</h4>
            <ul className="mt-2 list-disc list-inside">
              {skills?.map((skill, index) => (
                <li key={index} className="text-sm text-gray-600">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Personal Details Section */}
          <div>
            <h4 className="text-xl font-semibold text-gray-700">Personal Info</h4>
            <p className="mt-2 text-sm text-gray-600">Gender: {gender}</p>
            <p className="mt-2 text-sm text-gray-600">Age: {age}</p>
          </div>
        </div>
      </div>

      {/* Connection Count Section */}
      <div className="mt-6 text-center">
        <p className="text-lg font-medium text-gray-700">500+ Connections</p>
      </div>
    </div>
  );
};

export default ConnectionProfile;
