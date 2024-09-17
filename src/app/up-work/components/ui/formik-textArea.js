import { TextArea } from "@/app/components/text-area";
import { Tooltip } from "@/app/components/tooltip";
import { ErrorMessage, Field } from "formik";

const FormicTextArea = ({ data, onBlur, children }) => {
  return (
    <label className="flex flex-col gap-2 relative">
      <div className="flex items-center space-x-2">
        <span className="text-lg">{data.labelText}</span>
        <Tooltip text={`${data.toolTipText}`} />
      </div>
      <Field
        className={`border border-gray-300 p-2 rounded focus:outline-none focus:border-main-blue ${data.fieldClassName}`}
        name={`${data.fieldName}`}
        as={TextArea}
        placeholder={`${data.placeholder}`}
        onBlur={onBlur}
      />
      <ErrorMessage
        name={`${data.fieldName}`}
        component="div"
        className="text-red-500 absolute top-0 right-0"
      />
      {children}
    </label>
  );
};

export default FormicTextArea;
