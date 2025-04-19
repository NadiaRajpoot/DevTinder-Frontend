import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../utils/connectionsSlice";
import ListCard from "./ListCard";
import { LoadingContext } from "../LoadingContext";

const Connections = () => {
  const [isConnectionPage, setIsConnectionPage] = useState(false);
  const [error, setError] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  //fetching connection requests
  const getConnections = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/matched`, {
        withCredentials: true,
      });

      if (res?.data?.data) {
        dispatch(addConnections(res.data.data));
        setIsConnectionPage(true);
      }
    } catch (err) {
      console.error("Fetch connections failed:", err);
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
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

  return (
    <div>
      <ListCard list={connections} isConnectionPage={isConnectionPage} />
    </div>
  );
};

export default Connections;
