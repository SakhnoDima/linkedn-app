import Checkbox from "@/app/components/checkbox";
import { Tooltip } from "@/app/components/tooltip";
import { Field } from "formik";

export const ClientHistory = ({ values, setFieldValue }) => {
  const hoursPerWeek = [
    { name: 0, label: "No hires", value: true },
    { name: "1-9", label: "1 to 9 hires", value: true },
    { name: "10-", label: "10+ hires", value: true },
  ];

  return (
    <div className="mb-4">
      <div className="flex space-x-2">
        <p className="mb-2 text-lg">Client History</p>
        <Tooltip text={`Define Client history`} />
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
              name={`searchFilters.clientHires.${item.name}`}
              type="checkbox"
              checked={values.searchFilters.clientHires[item.name]}
              onChange={() =>
                setFieldValue(
                  `searchFilters.clientHires.${item.name}`,
                  !values.searchFilters.clientHires[item.name]
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
