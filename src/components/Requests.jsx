import React, { useEffect, useContext } from "react";
import { BASE_URL } from "../../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../../utils/requestsSlice";
import ListCard from "./ListCard";
import { LoadingContext } from "../LoadingContext";
import { ThemeContext } from "../ThemeContext";
const Requests = () => {
  const dispatch = useDispatch();
  const {theme} = useContext(ThemeContext);
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
  if (!requests) return null;

    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center overflow-hidden relative py-10 mx-3">
      {requests?.length === 0 ? (
        <div className="text-center">
          <h2 className={`sm:text-2xl text-xl font-bold ${!theme? "text-neutral-content": "text-black" }`}>
            No connection Requests Recieved!
          </h2>
          <img
           
            src="public/assets/empty-requests.svg"
            alt="user-not-found"
            className="block mx-auto w-96"
          />
        </div>
      ) :(<ListCard list={requests} />)}
   </div> );
 
};

export default Requests;
