import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constant";
import { addFeed } from "../../utils/feedSlice";
import UserCard from "./UserCard";
import { LoadingContext } from "../LoadingContext";
import { ThemeContext } from "../ThemeContext";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const {theme} = useContext(ThemeContext);

  const getFeed = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!feed || feed.length === 0) {
      getFeed();
    }
  }, [feed]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-purple-500 mb-4"></div>
        <p className="text-lg font-medium text-gray-600">
          Loading, please wait...
        </p>
      </div>
    );
  }
  return (
    <div className="flex-1 h-full flex flex-col items-center justify-center overflow-hidden relative py-10 mx-3">
      {feed?.length === 0 ? (
        <div className="text-center">
          <h2 className={`sm:text-3xl text-2xl font-bold ${!theme? "text-neutral-content": "text-black" }`}>
            No New Users Found!
          </h2>
          <img
           
            src="public/assets/empty-feed.svg"
            alt="user-not-found"
            className="block mx-auto w-96"
          />
        </div>
      ) : (
        <div className="relative w-full max-w-sm h-[550px]">
          {feed?.map((user, index) => (
            <div
              key={user._id}
              className="absolute inset-0 transition-transform duration-300 ease-in-out"
              style={{
                zIndex: feed.length - index,
                transform: `translateY(${index * 10}px) scale(${
                  1 - index * 0.03
                })`,
              }}
            >
              <UserCard user={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
