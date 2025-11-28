import React, { useEffect } from "react";
import useApiCall from "../hook/useApiCall";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContainer";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./common/UserCard";
import Loader from "./common/Loader";

const FeedPage = () => {
  const [loader, makeApiCall] = useApiCall();
  const feeds = useSelector((state) => state.feeds);
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserDetails = () => {
    makeApiCall({
      ApiKey: "user/feed",
      method: "GET",

      onSuccess: (msg) => {
        dispatch(addFeed(msg.data?.users));
        showToast(msg?.data.message, "success");
      },
      onFailure: (msg) => {
        showToast(msg?.data.ERROR, "error");
      },
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleConnection = (status, _id) => {
    makeApiCall({
      ApiKey: `connection/send/${status}/${_id}`,
      method: "POST",

      onSuccess: (msg) => {
        getUserDetails();

        showToast(msg?.data.message, "success");
      },
      onFailure: (msg) => {
        navigate("/login");
        showToast(msg?.data.ERROR, "error");
      },
    });
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center">
      {feeds &&
        feeds.map((item) => (
          <UserCard
            {...item}
            actionsButtons={[
              {
                label: "Intrested",
                className: "btn btn-primary w-1/2 rounded-lg font-medium",
                callBack: () => {
                  handleConnection("intrested", item?._id);
                },
              },
              {
                label: "Ignored",
                className:
                  "btn btn-outline btn-error w-1/2 rounded-lg font-medium",
                callBack: () => {
                  handleConnection("ignored", item?._id);
                },
              },
            ]}
          />
        ))}
    </div>
  );
};

export default FeedPage;
