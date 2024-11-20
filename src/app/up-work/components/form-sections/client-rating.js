import { Tooltip } from "@/app/components/tooltip";
import { Field } from "formik";
import React from "react";

export const ClientRating = ({ values, setFieldValue }) => {
  return (
    <div className="mb-4">
      <div className="flex space-x-2">
        <p className="mb-2 text-lg">Client Min Average Feedback</p>
        <Tooltip text={`Define Client min rating feedback`} />
      </div>

      <div className="flex justify-center">
        <div className="rating">
          {[0, 1, 2, 3, 4, 5].map((value) => (
            <Field
              key={value}
              type="radio"
              name={`rating-1`}
              value={value}
              className={`mask mask-star h-[28px] w-[28px] ${
                value === 0 ? "hidden" : ""
              }`}
              checked={values.clientParameters.minAvgFeedback === value}
              onChange={() =>
                setFieldValue("clientParameters.minAvgFeedback", value)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
