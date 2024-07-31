import React from "react";

const Loader = ({ className }) => {
  return (
    <span
      className={`loading loading-spinner text-primary ${className}`}
    ></span>
  );
};

export default Loader;
