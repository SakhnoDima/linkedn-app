import { TextArea } from "@/app/components/text-area";
import { Tooltip } from "@/app/components/tooltip";
import { ErrorMessage, Field } from "formik";

const FormicTextArea = ({ data }) => {
  return (
    <label className="flex flex-col gap-2 relative">
      <div className="flex items-center space-x-2">
        <span className="text-lg">{data.labelText}</span>
        <Tooltip text={`${data.toolTipText}`} />
      </div>
      <Field
        className={` ${data.fieldClassName}`}
        name={`${data.fieldName}`}
        as={TextArea}
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

export default FormicTextArea;
