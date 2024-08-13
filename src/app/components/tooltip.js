import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export const Tooltip = ({ text }) => {
  return (
    <div className="tooltip" data-tip={text}>
      <AiOutlineQuestionCircle className="hover:cursor-pointer" />
    </div>
  );
};
