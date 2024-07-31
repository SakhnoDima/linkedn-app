import Checkbox from "@/app/components/checkbox";
import { Field } from "formik";

export const ProjectLength = ({ values, setFieldValue }) => {
  const projectLength = [
    { name: "week", label: "Less than one month", value: true },
    { name: "month", label: "1 to 3 month", value: true },
    { name: "semester", label: "3 to 6 month", value: true },
    { name: "ongoing", label: "More than 6 month", value: true },
  ];

  return (
    <div>
      <p className="mb-2">8. Project length</p>
      <div className="flex  flex-row gap-4 justify-around p-2">
        {projectLength.map((item, indx) => (
          <label
            key={indx}
            htmlFor={item.label}
            className="flex gap-2 items-center hover:cursor-pointer"
          >
            <Field
              id={item.label}
              name={`searchFilters.durationV3.${item.name}`}
              type="checkbox"
              checked={values.searchFilters.durationV3[item.name]}
              onChange={() =>
                setFieldValue(
                  `searchFilters.durationV3.${item.name}`,
                  !values.searchFilters.durationV3[item.name]
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
