import React from "react";

const StatusBadge = ({ children, className }) => {
  return <div className={`badge badge-outline ${className}`}>{children}</div>;
};

export default StatusBadge;
