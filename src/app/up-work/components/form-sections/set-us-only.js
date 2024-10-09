import { Tooltip } from "@/app/components/tooltip";
import FormikToggle from "../ui/formik-toggle";

const SetUsOnly = ({ values, setFieldValue }) => {
  return (
    <div className="mt-[10px]">
      <div className="items-center flex space-x-2">
        <p>US Only</p>
        <Tooltip
          className="tooltip-right"
          text={`Set this option only if your account is verified in the US and you can apply for these jobs`}
        />
      </div>
      <FormikToggle
        className="w-[120px] gap-2 justify-start mb-1"
        values={values.searchFilters.usOnly}
        handleChange={() =>
          setFieldValue("searchFilters.usOnly", !values.searchFilters.usOnly)
        }
      >
        {values.searchFilters.usOnly ? <span>TRUE</span> : <span>FALSE</span>}
      </FormikToggle>
    </div>
  );
};

export default SetUsOnly;
