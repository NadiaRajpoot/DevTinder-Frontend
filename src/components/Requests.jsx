import React, { useEffect, useContext } from "react";
import { BASE_URL } from "../../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../../utils/requestsSlice";
import ListCard from "./ListCard";
import { LoadingContext } from "../LoadingContext";
const Requests = () => {
  const dispatch = useDispatch();
  const { setIsLoading } = useContext(LoadingContext);
  const requests = useSelector((store) => store.requests);
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
  return (
    <>
      <ListCard list={requests} />
    </>
  );
};

export default Requests;
