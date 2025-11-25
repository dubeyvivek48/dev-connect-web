import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useApiCall from "../hook/useApiCall";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContainer";
import { addUser } from "../utils/userSlice";

const Navbar = () => {
  const userInfo = useSelector((state) => state.user);
  const [loader, makeApiCall] = useApiCall();
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, firstName, lastName, emailId, photoUrl, about, skills } =
    userInfo || {};
  console.log({ _id, firstName, lastName, emailId, photoUrl, about, skills });

  const handleLogout = () => {
    makeApiCall({
      ApiKey: "logout",
      method: "POST",

      onSuccess: (msg) => {
        console.log({ msg });
        dispatch(addUser(null));
        navigate("/login");
        showToast(msg?.data.message, "success");
      },
      onFailure: (msg) => {
        showToast(msg?.data.ERROR, "error");
      },
    });
  };
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
          dev-connect
        </a>
      </div>

      {userInfo && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    photoUrl ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
