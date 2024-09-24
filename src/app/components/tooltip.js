import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export const Tooltip = ({ text, className }) => {
  return (
    <div className={`tooltip ${className}`} data-tip={text}>
      <AiOutlineQuestionCircle className="hover:cursor-pointer" />
    </div>
  );
};
