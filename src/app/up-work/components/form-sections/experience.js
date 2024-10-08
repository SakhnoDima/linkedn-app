import Checkbox from "@/app/components/checkbox";
import { Tooltip } from "@/app/components/tooltip";
import { Field } from "formik";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export const ExperienceLevel = ({ values, setFieldValue }) => {
  const experienceLevels = [
    {
      name: 1,
      label: "Entry Level",
      value: true,
    },
    {
      name: 2,
      label: "Intermediate",
      value: true,
    },
    { name: 3, label: "Expert", value: true },
  ];

  return (
    <div className="mb-4">
      <div className="flex space-x-2">
        <p className="mb-2 text-lg">Experience level</p>
        <Tooltip text={`Here you can defined Experience level`} />
      </div>
      <div className="flex  flex-row gap-4 justify-around p-2">
        {experienceLevels.map((item, indx) => (
          <label
            key={indx}
            htmlFor={item.label}
            className="flex gap-2 items-center hover:cursor-pointer"
          >
            <Field
              id={item.label}
              name={`searchFilters.contractorTier.${item.name}`}
              type="checkbox"
              checked={values.searchFilters.contractorTier[item.name]}
              onChange={() =>
                setFieldValue(
                  `searchFilters.contractorTier.${item.name}`,
                  !values.searchFilters.contractorTier[item.name]
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
