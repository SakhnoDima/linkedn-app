import { Tooltip } from "@/app/components/tooltip";
import { ErrorMessage, Field } from "formik";
import { BsCurrencyDollar } from "react-icons/bs";

export const MinAvgHourlyRate = ({ values }) => {
  const category = {
    fieldName: "clientParameters.maxAvgHourlyRatePaid",
    fieldType: "number",
    placeholder: `Ex: 24`,
  };
  return (
    <div className="mb-4">
      <div className="flex space-x-2">
        <p className="mb-2">16. Hourly rate paid</p>
        <Tooltip
          text={`Here you can determine client average hourly rate paid`}
        />
      </div>
      <div className="flex justify-around flex-row gap-4 p-2">
        <div className="flex gap-2 items-center relative">
          <BsCurrencyDollar className="absolute top-[5px] left-1 w-[20px] h-[20px]" />
          <Field
            name="clientParameters.minAvgHourlyRatePaid"
            type="number"
            placeholder="Min"
            className="w-[158px] py-[4px] pl-[22px] border-[2px] border-gray-300 p-2 rounded"
            value={values.clientParameters.minAvgHourlyRatePaid || ""}
          />
          <ErrorMessage
            name="clientParameters.minAvgHourlyRatePaid"
            component="div"
            className="text-red-500 absolute top-[-4px] right-0"
          />
          <p>/hr</p>
        </div>
        <div className="flex gap-2 items-center relative">
          <BsCurrencyDollar className="absolute top-[5px] left-1 w-[20px] h-[20px]" />
          <Field
            name="clientParameters.maxAvgHourlyRatePaid"
            type="number"
            placeholder="Max"
            className="w-[158px] py-[4px] pl-[22px] border-[2px] border-gray-300 p-2 rounded"
            value={values.clientParameters.maxAvgHourlyRatePaid || ""}
          />
          <ErrorMessage
            name="clientParameters.maxAvgHourlyRatePaid"
            component="div"
            className="text-red-500 absolute top-[-4px] right-0"
          />
          <p>/hr</p>
        </div>
      </div>
    </div>
  );
};
