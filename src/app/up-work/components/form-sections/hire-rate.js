import { Tooltip } from "@/app/components/tooltip";
import { Field } from "formik";

export const HireRate = ({ values, setFieldValue }) => {
  const hireRates = [
    { value: "Mid Rates", label: ">40%" },
    { value: "High Rates", label: ">70%" },
    { value: "Max Rates", label: "100%" },
  ];
  return (
    <div className="mb-4">
      <div className="flex space-x-2">
        <p className="mb-2">15. Hire Rate</p>
        <Tooltip
          text={`Determine the minimum hiring rating. This indicates advanced leads with a good history`}
        />
      </div>

      <div className="flex gap-8 justify-center">
        {hireRates.map((value, indx) => (
          <label
            key={indx}
            htmlFor={value.label}
            className="flex flex-col  items-center hover:cursor-pointer "
          >
            <Field
              id={value.label}
              type="radio"
              name="hire-rate"
              value={value.value}
              className="radio h-[28px] w-[28px] bg-white"
              checked={values.clientParameters.minHireRate === value.value}
              onChange={() =>
                setFieldValue("clientParameters.minHireRate", value.value)
              }
            />
            <p>{value.label}</p>
          </label>
        ))}
      </div>
    </div>
  );
};
