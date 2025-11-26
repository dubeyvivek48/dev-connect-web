import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import useApiCall from "../hook/useApiCall";
import { useToast } from "../context/ToastContainer";

const Layout = () => {
  const [loader, makeApiCall] = useApiCall();
  const user = useSelector((state) => state.user);
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserDetails = () => {
    console.log({ user });
    if (user) return;
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

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
