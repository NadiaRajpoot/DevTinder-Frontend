import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../utils/connectionsSlice";
import ListCard from "./ListCard";
import { LoadingContext } from "../LoadingContext";
const Connections = () => {
  const [isConnectionPage, setIsConnectionPage] = useState(false);
  const { setIsLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const getConnections = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/matched",

        { withCredentials: true }
      );
      dispatch(addConnections(res?.data?.data));
      setIsConnectionPage(true);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
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
          src="public/assets/empty-connections.svg"
          alt="user-not-found"
          className="block mx-auto w-96"
        />
      </div>
    );

  return (
    <>
      <ListCard list={connections} isConnectionPage={isConnectionPage} />
    </>
  );
};

export default Connections;
