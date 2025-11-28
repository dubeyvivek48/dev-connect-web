import React, { useEffect } from "react";
import SchemaForm from "./common/SchemaForm/SchemaForm";
import useApiCall from "../hook/useApiCall";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../context/ToastContainer";
import { addUser } from "../utils/userSlice";
import UserCard from "./common/UserCard";

const profileSchema = (data) => {
  return [
    {
      name: "age",
      label: "Age",
      required: true,
      type: "number",
      defaultValue: data?.age,
    },
    {
      name: "gender",
      label: "Gender",
      required: true,
      type: "select",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Others", value: "others" },
      ],
      defaultValue: data?.gender,
    },
    {
      name: "photoUrl",
      label: "Photo Url",
      required: true,
      type: "text",
      defaultValue: data?.photoUrl,
    },
    {
      name: "skills",
      label: "Skills",
      required: true,
      type: "array",
      defaultValue: data?.skills?.join(","),
    },
    {
      name: "about",
      label: "About",
      required: true,
      type: "text",
      defaultValue: data?.about,
    },
  ];
};

const ProfilePage = () => {
  const [loader, makeApiCall] = useApiCall();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const getProfile = () => {
    makeApiCall({
      ApiKey: "profile/view",
      method: "GET",

      onSuccess: (msg) => {
        dispatch(addUser(msg.data?.data));
        showToast(msg?.data.message, "success");
      },
      onFailure: (msg) => {
        showToast(msg?.data.ERROR, "error");
      },
    });
  };

  useEffect(() => {
    getProfile();
  }, []);
  const submitForm = (data) => {
    console.log({ data });
    makeApiCall({
      ApiKey: "profile/edit",
      method: "PATCH",
      payload: { ...data, skills: data?.skills?.split(",") },
      onSuccess: (msg) => {
        console.log({ msg });

        getProfile();
        showToast(msg?.data.message, "success");
      },
      onFailure: (msg) => {
        // console.log({ msg, ERROR: msg?.data.ERROR });
        showToast(msg?.data.ERROR, "error");
      },
    });
  };

  console.log({ user });

  return (
    <div className="min-h-screen flex items-center items-stretch justify-center p-6 bg-base-200">
      <UserCard {...user} />
      <div className="card w-full max-w-3xl mx-auto rounded-2xl shadow-lg border border-base-300 bg-gradient-to-br from-base-100 to-base-200 overflow-hidden my-3">
        <div className="card card-border bg-base-100  shadow-lg rounded-box  border p-5">
          {/* <div className="avatar justify-center">
            <div className="mask mask-squircle w-24">
              <img src={user?.photoUrl} />
            </div>
          </div> */}
          <h6 className="text-2xl font-bold text-center capitalize text-base-content mb-2">
            Profile Page
          </h6>

          <SchemaForm
            schema={profileSchema(user)}
            onSubmit={submitForm}
            submitLoader={loader}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
