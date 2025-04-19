import React, { useEffect, useContext } from "react";
import { BASE_URL } from "../../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../../utils/requestsSlice";
import ListCard from "./ListCard";
import { LoadingContext } from "../LoadingContext";
import Loader from "./Loader";

const Requests = () => {
  const dispatch = useDispatch();
  const { setIsLoading } = useContext(LoadingContext);
  const requests = useSelector((store) => store.requests);
  const { isLoading } = useContext(LoadingContext);

  //fetching Requests
  const getRequests = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });

      setIsLoading(false);
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!requests) return null;
  if (requests.length === 0)
    return (
      <div>
        <div className="font-bold text-2xl text-center my-10">
          No Connection Requests Recieved!
        </div>
        <img
          src="/assets/empty-requests.svg"
          alt="user-not-found"
          className="block mx-auto w-96"
        />
      </div>
    );

  return <ListCard list={requests} />;
};

export default Requests;
