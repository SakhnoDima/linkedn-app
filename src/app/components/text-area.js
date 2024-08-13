import React from "react";

export const TextArea = ({ className, field, ...props }) => {
  return (
    <textarea
      className={`textarea resize-none p-4 ${className} `}
      {...props}
      {...field}
    ></textarea>
  );
};
