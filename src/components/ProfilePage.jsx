import React, { useEffect } from "react";
import SchemaForm from "./common/SchemaForm/SchemaForm";
import useApiCall from "../hook/useApiCall";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../context/ToastContainer";
import { addUser } from "../utils/userSlice";

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
      defaultValue: data?.skills || [],
    },
  ];
};

const ProfilePage = () => {
  const [loader, makeApiCall] = useApiCall();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const submitForm = (data) => {
    console.log({ data });
    makeApiCall({
      ApiKey: "profile/edit",
      method: "PATCH",
      payload: { ...data, skills: data?.skills?.split(",") },
      onSuccess: (msg) => {
        console.log({ msg });

        // dispatch(addUser(msg.data?.data));
        // navigate("/");
        showToast(msg?.data.message, "success");
      },
      onFailure: (msg) => {
        // console.log({ msg, ERROR: msg?.data.ERROR });
        showToast(msg?.data.ERROR, "error");
      },
    });
  };

  useEffect(() => {
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
  }, []);

  console.log({ user });

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
      <div className="card p-6 w-full max-w-md">
        <div className="card card-border bg-base-100 w-96 shadow-lg rounded-box  border p-5">
          <div className="avatar justify-center">
            <div className="mask mask-squircle w-24">
              <img src={user?.photoUrl} />
            </div>
          </div>
          <h6 className="text-2xl flex justify-center mt-3 mb-4 ">
            ProfilePage
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
