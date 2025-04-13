import React, { useContext } from "react";
import { LoadingContext } from "../LoadingContext";
import { BASE_URL } from "../../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../ThemeContext";
import { removeRequests } from "../../utils/requestsSlice";
import { removeConnections } from "../../utils/connectionsSlice";
import { Link } from "react-router-dom";

const ListCard = ({ list, isConnectionPage }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
console.log(list)
  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
        dispatch(removeRequests(requestId))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const removeConnection = async (requestId) => {
    try {
      const res = await axios.delete(
        BASE_URL + `/request/remove/${requestId}`,
        {
          withCredentials: true,
        }
      );
      dispatch(removeConnections(requestId));
    } catch (err) {
      console.log(err);
    }
   
  };
  const { isLoading } = useContext(LoadingContext);
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
    <div className="flex flex-col items-center justify-center gap-8 my-10 px-8">
      <h1 className="font-bold text-xl text-center">
        {isConnectionPage ? "Connections" : "Requests"}
      </h1>

      {list.map((connection, index) => {
   
   
  

   return (
     <div
     key={connection._id}
       className="p-2 border-b-[1px] border-gray-300 flex justify-between w-[70%]"
     >
       <Link to={`/profile/${connection?.fromUserId?._id}`} className="flex gap-4 w-full">
         <img
           className="h-16 w-16 object-cover rounded-full border-2 border-gray-100"
           src={
             isConnectionPage
               ? connection?.user?.photoURL
               : connection?.fromUserId?.photoURL
           }
           alt="user"
         />
         <div>
           <div className="text-center flex items-center">
             {isConnectionPage ? (
               <>
                 {connection?.user?.firstName?.charAt(0).toUpperCase()}
                 {connection?.user?.firstName?.slice(1)}{" "}
                 {connection?.user?.lastName?.charAt(0).toUpperCase()}
                 {connection?.user?.lastName.slice(1)}
               </>
             ) : (
               <>
                 {connection?.fromUserId?.firstName
                   ?.charAt(0)
                   .toUpperCase()}
                 {connection?.fromUserId?.firstName?.slice(1)}{" "}
                 {connection?.fromUserId?.lastName}
               </>
             )}
           </div>
   
           <div className="text-[12px]">
             {isConnectionPage
               ? `${connection?.user?.about?.slice(0, 70)} ...`
               : `${connection?.fromUserId?.about?.slice(0, 70)} ...`}
           </div>
         </div>
       </Link> {/* Closing the Link */}
       
       <div className="flex gap-2">
         <button
           className="text-sm rounded-full border-[1px] border-gray-300 px-4 py-2 
             text-white bg-gradient-to-b from-[#8c75e3] to-[#6f51ee] w-fit h-8 flex justify-center items-center ml-auto"
           onClick={() => {
             if (!isConnectionPage) {
               reviewRequest("accepted", connection._id);
             } else {
               removeConnection(connection._id);
             }
           }}
         >
           {!isConnectionPage ? " Accept" : "unfriend"}
         </button>
   
         {!isConnectionPage && (
           <button
             className={`text-sm rounded-full border-[1px] border-gray-300 px-4 py-2 
               ${theme ? "text-black" : "text-white"} w-fit h-8 flex justify-end items-center ml-auto`}
             onClick={() => reviewRequest("rejected", connection._id)}
           >
             Reject
           </button>
         )}
       </div>
     </div>
   );
   
      })}
    </div>
  );
};

export default ListCard;
