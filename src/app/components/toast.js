const Toast = ({ message = "Error", status="error" }) => {
  console.log(status);
    return (
      <div className="toast toast-top toast-start">
        <div className={`alert alert-${status}`}>
          <span>{message}</span>
        </div>
      </div>
    );
  };
  
  export default Toast;