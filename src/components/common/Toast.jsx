import React from "react";

const Toast = ({ message, type = "success" }) => {
  return (
    <div className="toast toast-top toast-end">
      <div
        className={`alert ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        } `}
      >
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
