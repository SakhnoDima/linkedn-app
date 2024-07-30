import React from "react";

const Checkbox = ({ className, ...props }) => {
  return (
    <input type="checkbox" className={`checkbox ${className}`} {...props} />
  );
};

export default Checkbox;
