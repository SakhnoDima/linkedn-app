import Checkbox from "@/app/components/checkbox";
import { Tooltip } from "@/app/components/tooltip";
import { Field } from "formik";

export const HoursPerWeek = ({ values, setFieldValue }) => {
  const hoursPerWeek = [
    { name: "as_needed", label: "Less than 30 hrs/week", value: true },
    { name: "full_time", label: "More than 30 hrs/week", value: true },
  ];

  return (
    <div>
      <div className="flex space-x-2">
        <p className="mb-2">9. Hours per week</p>
        <Tooltip text={`Hours per week duration`} />
      </div>

      <div className="flex  flex-row gap-4 justify-around p-2">
        {hoursPerWeek.map((item, indx) => (
          <label
            key={indx}
            htmlFor={item.label}
            className="flex gap-2 items-center hover:cursor-pointer"
          >
            <Field
              id={item.label}
              name={`searchFilters.workload.${item.name}`}
              type="checkbox"
              checked={values.searchFilters.workload[item.name]}
              onChange={() =>
                setFieldValue(
                  `searchFilters.workload.${item.name}`,
                  !values.searchFilters.workload[item.name]
                )
              }
              as={Checkbox}
            />
            <p>{item.label}</p>
          </label>
        ))}
      </div>
    </div>
  );
};
