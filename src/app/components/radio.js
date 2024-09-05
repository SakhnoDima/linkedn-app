import React from "react";

const Radio = ({ className, ...props }) => {
  return (
    <input type="radio" className={`radio bg-white ${className}`} {...props} />
  );
};

export default Radio;
