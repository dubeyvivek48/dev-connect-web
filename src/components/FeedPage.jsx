import React, { useEffect } from "react";
import useApiCall from "../hook/useApiCall";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContainer";

const FeedPage = () => {
  const [loader, makeApiCall] = useApiCall();
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserDetails = () => {
    makeApiCall({
      ApiKey: "profile/view",
      method: "GET",

      onSuccess: (msg) => {
        console.log({ msg });
        dispatch(addUser(msg.data?.profile));

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
