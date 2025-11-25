import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Show a new toast
  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto close after 3 sec
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  console.log({ toasts });

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="toast toast-top toast-center z-[9999]">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`alert ${
              t.type === "success" ? "alert-success" : "alert-error"
            } shadow-lg`}
          >
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
