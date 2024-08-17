import Toggle from "@/app/components/toggle";
import { Field } from "formik";

const FormikToggle = ({ labelText, values, handleChange, className }) => {
  return (
    <label className={`label cursor-pointer ${className}`}>
      <span className="label-text">{labelText}</span>
      <Field
        name="autoBidding"
        checked={values.autoBidding}
        onChange={handleChange}
        as={Toggle}
      />
    </label>
  );
};

export default FormikToggle;
