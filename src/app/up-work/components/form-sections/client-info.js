import Checkbox from "@/app/components/checkbox";
import { Tooltip } from "@/app/components/tooltip";
import { Field } from "formik";

export const ClientInfo = ({ values, setFieldValue }) => {
  const hoursPerWeek = [
    { name: "all", label: "My previous clients", value: true },
    { name: "1", label: "Payment verified", value: true },
  ];

  return (
    <div className="mb-4">
      <div className="flex space-x-2">
        <p className="mb-2">11. Client info</p>
        <Tooltip text={`Define Client info`} />
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
              name={`searchFilters.clientInfo.${item.name}`}
              type="checkbox"
              checked={values.searchFilters.clientInfo[item.name]}
              onChange={() =>
                setFieldValue(
                  `searchFilters.clientInfo.${item.name}`,
                  !values.searchFilters.clientInfo[item.name]
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
