import clsx from "clsx";
import React from "react";

const StatusBadge = ({ children, className, active }) => {
  return (
    <div
      className={clsx(
        `badge badge-outline`,
        className,
        active && "badge-secondary"
      )}
    >
      {children}
    </div>
  );
};

export default StatusBadge;
