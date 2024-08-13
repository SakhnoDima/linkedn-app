import { Tooltip } from "@/app/components/tooltip";
import { Field } from "formik";

export const ClientTotalSpent = ({ values, setFieldValue }) => {
  const minTotalSpent = [
    { value: "1K", label: "1K+" },
    { value: "10K", label: "10K+" },
    { value: "100K", label: "100K+" },
    { value: "1M", label: "1M+" },
    { value: "10M", label: "10M+" },
  ];
  return (
    <div className="mb-4">
      <div className="flex space-x-2">
        <p className="mb-2">14. Client Total Spent</p>
        <Tooltip text={`Choose min client total spent`} />
      </div>

      <div className="flex gap-8 justify-center">
        {minTotalSpent.map((value, indx) => (
          <label
            key={indx}
            htmlFor={value.label}
            className="flex flex-col  items-center hover:cursor-pointer "
          >
            <Field
              id={value.label}
              type="radio"
              name="total-spent"
              value={value.value}
              className="radio h-[28px] w-[28px] bg-white"
              checked={values.clientParameters.minTotalSpent === value.value}
              onChange={() =>
                setFieldValue("clientParameters.minTotalSpent", value.value)
              }
            />
            <p>{value.label}</p>
          </label>
        ))}
      </div>
    </div>
  );
};
