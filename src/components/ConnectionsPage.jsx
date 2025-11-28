import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApiCall from "../hook/useApiCall";
import { useToast } from "../context/ToastContainer";
import { addConnections } from "../utils/connectionsSlice";
import UserCard from "./common/UserCard";
import Loader from "./common/Loader";

const ConnectionsPage = () => {
  const [loader, makeApiCall] = useApiCall();
  const connections = useSelector((state) => state.connections);
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const getUserDetails = () => {
    // if (connections) return;
    makeApiCall({
      ApiKey: "user/connections",
      method: "GET",

      onSuccess: (msg) => {
        console.log({ msg });
        dispatch(addConnections(msg.data?.data));
        showToast(msg?.data.message, "success");
      },
      onFailure: (msg) => {
        console.log({ msg });
        showToast(msg?.data.ERROR, "error");
      },
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  console.log({ connections });

  if (loader) {
    return <Loader />;
  }
  return (
    <div className="grid gap-6 p-4 container mx-auto m-auto">
      {connections?.map((item) => (
        <UserCard key={item?._id} {...item} />
      ))}
    </div>
  );
};

export default ConnectionsPage;
