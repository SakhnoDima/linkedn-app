"use client";
const Toast = ({ message = "Error", status = "success" }) => {
  return (
    <div className="toast toast-top toast-end">
      {status === "error" && (
        <div className={`alert alert-error`}>
          <span>{message}</span>
        </div>
      )}
       {status === "success" && (
        <div className={`alert alert-success`}>
          <span>{message}</span>
        </div>
      )}
       
    </div>
  );
};

export default Toast;
