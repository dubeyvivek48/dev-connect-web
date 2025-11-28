import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApiCall from "../hook/useApiCall";
import { useToast } from "../context/ToastContainer";

import UserCard from "./common/UserCard";
import Loader from "./common/Loader";
import { addRequests } from "../utils/requestSlice";

const ConnectionRequestPage = () => {
  const [loader, makeApiCall] = useApiCall();
  const request = useSelector((state) => state.request);
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const getRequests = () => {
    // if (connections) return;
    makeApiCall({
      ApiKey: "user/requests/received",
      method: "GET",

      onSuccess: (msg) => {
        console.log({ msg });
        dispatch(addRequests(msg.data?.data));
        showToast(msg?.data.message, "success");
      },
      onFailure: (msg) => {
        console.log({ msg });
        showToast(msg?.data.ERROR, "error");
      },
    });
  };

  useEffect(() => {
    getRequests();
  }, []);

  const acceptOrRemoveRequest = (status, _id) => {
    makeApiCall({
      ApiKey: `connection/review/${status}/${_id}`, //connection/review/accepted/6928a2a6af905bc8304cd7c1
      method: "POST",

      onSuccess: (msg) => {
        getRequests();
        showToast(msg?.data.message, "success");
      },
      onFailure: (msg) => {
        showToast(msg?.data.ERROR, "error");
      },
    });
  };

  if (loader) {
    return <Loader />;
  }
  return (
    <div className="grid gap-6 p-4 container mx-auto m-auto">
      {request?.map((item) => (
        <UserCard
          key={item?._id}
          {...item?.fromUserId}
          actionsButtons={[
            {
              label: "Accept",
              className: "btn btn-primary w-1/2 rounded-lg font-medium",
              callBack: () => {
                acceptOrRemoveRequest("accepted", item?._id);
              },
            },
            {
              label: "Reject",
              className:
                "btn btn-outline btn-error w-1/2 rounded-lg font-medium",
              callBack: () => {
                acceptOrRemoveRequest("rejected", item?._id);
              },
            },
          ]}
        />
      ))}
    </div>
  );
};

export default ConnectionRequestPage;
