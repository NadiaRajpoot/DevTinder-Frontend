import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";
import { addConnections } from "../../utils/connectionsSlice";
import ListCard from "./ListCard";
import { LoadingContext } from "../LoadingContext";
import Loader from "../components/Loader"; 

const Connections = () => {
  const [isConnectionPage, setIsConnectionPage] = useState(false);
  const [error, setError] = useState(null);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const location = useLocation(); 

  const getConnections = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/matched`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      setIsConnectionPage(true);
    } catch (err) {
      console.error("Fetch connections failed:", err);
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (connections.length === 0) {
      getConnections();
    } else {
      setIsConnectionPage(true);
    }

  }, [location.pathname]); 

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-medium mt-10">
        {error.message || error}
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div>
        <div className="font-bold text-2xl text-center my-10">
          No connections found!
        </div>
        <img
          src="/assets/empty-connections.svg"
          alt="user-not-found"
          className="block mx-auto w-96"
        />
      </div>
    );
  }

  return (
    <div>
      <ListCard list={connections} isConnectionPage={isConnectionPage} />
    </div>
  );
};

export default Connections;
