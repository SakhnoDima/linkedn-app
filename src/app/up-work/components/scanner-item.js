import StatusBadge from "@/app/components/status-badge";
import React from "react";

export const ScannerItem = ({ elem }) => {
  const handleClick = () => {
    console.log(elem._id);
  };

  return (
    <li
      onClick={handleClick}
      className="flex flex-row items-center justify-around gap-4 p-1 border-b hover:cursor-pointer"
    >
      <p>Name: {elem.scannerName}</p>

      <StatusBadge active={elem.autoBidding}>
        {elem.autoBidding ? "Active" : "Pending"}
      </StatusBadge>
    </li>
  );
};
