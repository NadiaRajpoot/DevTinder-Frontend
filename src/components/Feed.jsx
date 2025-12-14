import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constant";
import { addFeed } from "../../utils/feedSlice";
import UserCard from "./UserCard";
import { LoadingContext } from "../LoadingContext";
import { ThemeContext } from "../ThemeContext";
import Loader from "./Loader";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  //getting feed data
  const getFeed = async () => {
    setIsLoading(false);
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
      setIsLoading(false);
      if (err.status === 401) {
        return navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  if(feed=== null){
    getFeed();
  }

  if(location.pathname === "/"){
    navigate("/feed")
  }
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex-1 h-full flex flex-col items-center justify-center overflow-hidden relative py-10 mx-3">
      {feed?.length === 0 ? (
        <div className="text-center">
          <h2
            className={`sm:text-3xl text-2xl font-bold ${
              !theme ? "text-neutral-content" : "text-black"
            }`}
          >
            No New Users Found!
          </h2>
          <img
            src="/assets/empty-feed.svg"
            alt="user-not-found"
            className="block mx-auto w-96"
          />
        </div>
      ) : (
        <div className="relative w-[320px] h-[500px]">
          {feed &&
            feed?.map((user, index) => (
              <div
                key={user._id}
                className="absolute inset-0 transition-transform duration-300 ease-in-out"
                style={{
                  zIndex: feed.length - index,
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
