import Toggle from "@/app/components/toggle";
import { Field } from "formik";

const FormikToggle = ({
  children,
  labelText,
  values,
  handleChange,
  className,
}) => {
  return (
    <label className={`label cursor-pointer ${className}`}>
      <span className="label-text">{labelText}</span>
      <Field
        name="autoBidding"
        checked={values}
        onChange={handleChange}
        as={Toggle}
      />
      {children}
    </label>
  );
};

export default FormikToggle;
