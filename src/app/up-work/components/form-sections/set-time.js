import { Tooltip } from "@/app/components/tooltip";
import { ErrorMessage, Field } from "formik";
import React from "react";
import FormikToggle from "../ui/formik-toggle";

export const SetBiddingOptions = ({ values, handleChange }) => {
  return (
    <div className="mt-4">
      <div className="flex space-x-2">
        <p className="mb-2">Bidding interval options</p>
        <Tooltip
          text={`If you don't specify a time, the scanner will start every hour at 0 minutes (e.g., 00:00, etc.). If you only specify the hour, the scanner will start daily at the hour you set (e.g., at 14:00 every day).If you only specify the minutes, the scanner will start every hour at the minutes you set (e.g., at 00:15, ).`}
        />
      </div>

      <div className="flex justify-around flex-row gap-4 relative">
        <FormikToggle
          className="flex gap-2"
          labelText="Auto Bidding"
          values={values}
          handleChange={handleChange}
        />

        <div className="flex gap-2 items-center ">
          <Field
            name="cronTime.min"
            type="number"
            placeholder="Minutes"
            className="w-[158px] py-[4px] pl-[22px] border-[2px] border-gray-300 p-2 rounded"
            value={values.cronTime.min || ""}
          />
          <ErrorMessage
            name="cronTime.min"
            component="div"
            className="text-red-500 absolute top-0 left-0"
          />
          <p>Minutes</p>
        </div>
        <div className="flex gap-2 items-center">
          <Field
            name="cronTime.hour"
            type="number"
            placeholder="Hours"
            className="w-[158px] py-[4px] pl-[22px] border-[2px] border-gray-300 p-2 rounded"
            value={values.cronTime.hour || ""}
          />
          <ErrorMessage
            name="cronTime.hour"
            component="div"
            className="text-red-500 absolute top-0 right-0"
          />
          <p>Hours</p>
        </div>
      </div>
    </div>
  );
};
