import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constant";
import { addFeed } from "../../utils/feedSlice";
import UserCard from "./UserCard";
import { LoadingContext } from "../LoadingContext";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();

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
    feed && (
      <div className="flex justify-center my-5 ">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
