import { ErrorMessage, Field } from "formik";
import React from "react";

export const FormicInputNumber = ({
  name,
  placeholder,
  value,
  fieldClassName,
  errorClassName,
  children,
}) => {
  return (
    <div className="flex gap-2 items-center relative">
      <Field
        name={name}
        type="number"
        placeholder={placeholder}
        className={`w-[158px] py-[4px] pl-[22px] border-[2px] border-gray-300 p-2 rounded focus:outline-none focus:border-main-blue ${fieldClassName}`}
        value={value || ""}
      />
      <ErrorMessage
        name={name}
        component="div"
        className={`text-sm text-red-500 absolute ${errorClassName}`}
      />
      {children}
    </div>
  );
};
