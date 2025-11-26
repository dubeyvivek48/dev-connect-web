import React, { useEffect } from "react";
import useApiCall from "../hook/useApiCall";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContainer";
import { addFeed } from "../utils/feedSlice";

const FeedPage = () => {
  const [loader, makeApiCall] = useApiCall();
  const feeds = useSelector((state) => state.feeds);
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserDetails = () => {
    if (feeds) return;
    makeApiCall({
      ApiKey: "user/feed",
      method: "GET",

      onSuccess: (msg) => {
        console.log({ msg });
        dispatch(addFeed(msg.data?.users));

        showToast(msg?.data.message, "success");
      },
      onFailure: (msg) => {
        console.log({ msg });
        navigate("/login");
        showToast(msg?.data.ERROR, "error");
      },
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return <div>FeedPage</div>;
};

export default FeedPage;
