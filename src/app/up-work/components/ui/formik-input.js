import { ErrorMessage, Field } from "formik";
import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const FormicInput = ({ data, tooltipOptions }) => {
  return (
    <label className="w-full flex flex-col space-y-2  relative">
      <div className="flex items-center space-x-2">
        <span className="text-lg">{data.labelText}</span>
        <div
          className={`tooltip ${tooltipOptions} `}
          data-tip={`${data.toolTipText}`}
        >
          <AiOutlineQuestionCircle className="hover:cursor-pointer" />
        </div>
      </div>
      <Field
        className="border border-gray-300 p-2 rounded  mt-1 focus:outline-none focus:border-main-blue"
        name={`${data.fieldName}`}
        type={`${data.fieldType}`}
        placeholder={`${data.placeholder}`}
      />
      <ErrorMessage
        name={`${data.fieldName}`}
        component="div"
        className="text-red-500 absolute top-[-4px] right-0"
      />
    </label>
  );
};

export default FormicInput;
