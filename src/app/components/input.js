import clsx from "clsx";
import React from "react";

const Input = ({ name, type, placeholder, value, setValue, secondary }) => {
  const inputClass = clsx({
    'input w-full  ': true,
    'input-bordered': secondary,
  
  });
  return (
    <input
      className={inputClass}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Input;
