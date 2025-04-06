import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constant";
import { addFeed } from "../../utils/feedSlice";
import UserCard from "./userCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const getFeed = async () => {

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
     

      dispatch(addFeed(res?.data?.data));
      
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    !feed && getFeed();
    
  }, [feed]);

  return (
    feed && (
      <div className="flex justify-center my-5">
        <UserCard user={feed[2]} />
      </div>
    )
  );
};

export default Feed;
