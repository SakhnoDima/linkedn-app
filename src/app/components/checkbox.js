import React from "react";

const Checkbox = ({ className, ...props }) => {
  return (
    <input
      type="checkbox"
      className={`checkbox bg-white ${className}`}
      {...props}
    />
  );
};

export default Checkbox;
