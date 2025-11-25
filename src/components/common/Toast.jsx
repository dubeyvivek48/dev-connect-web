import React, { useEffect, useState } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // auto close after 4 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose(); // optional callback to remove toast
    }, 3000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  if (!visible) return null;

  return (
    <div className="toast toast-top toast-center z-50">
      <div
        className={`alert ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        } text-white`}
      >
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
