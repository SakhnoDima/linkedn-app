import Checkbox from "@/app/components/checkbox";
import { Tooltip } from "@/app/components/tooltip";
import { Field } from "formik";

export const ClientWithoutHistory = ({ values, setFieldValue }) => {
  return (
    <div className="mb-4">
      <div className="flex space-x-2">
        <p className="mb-2">17. Without Sufficient History</p>
        <Tooltip
          text={`Use this options if previously defined values of client hire rate and client hourly rate paid could be not uncertain`}
        />
      </div>

      <div className="flex  flex-row gap-4 justify-around p-2">
        <label
          htmlFor="without-history"
          className="flex gap-2 items-center hover:cursor-pointer"
        >
          <Field
            id="without-history"
            name={`clientParameters.clientsWithoutSufficientHistory`}
            type="checkbox"
            checked={values.clientParameters.clientsWithoutSufficientHistory}
            onChange={() =>
              setFieldValue(
                `clientParameters.clientsWithoutSufficientHistory`,
                !values.clientParameters.clientsWithoutSufficientHistory
              )
            }
            as={Checkbox}
          />
          <p>Without history</p>
        </label>
      </div>
    </div>
  );
};
