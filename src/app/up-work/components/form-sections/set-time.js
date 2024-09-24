import { Tooltip } from "@/app/components/tooltip";
import { ErrorMessage, Field } from "formik";
import React from "react";
import FormikToggle from "../ui/formik-toggle";
import { FormicInputNumber } from "../ui/formic-input-number";

export const SetBiddingOptions = ({ values, setFieldValue }) => {
  return (
    <div className="mt-[10px]">
      <div className="items-center flex space-x-2">
        <p>Bidding interval options</p>
        <Tooltip
          text={`If you don't specify a time, the scanner will start every hour at 0 minutes (e.g., 00:00, etc.). If you only specify the hour, the scanner will start daily at the hour you set (e.g., at 14:00 every day).If you only specify the minutes, the scanner will start every hour at the minutes you set (e.g., at 00:15, ).`}
        />
      </div>

      <div className="flex flex-row gap-4 relative">
        <FormikToggle
          className="flex items-center gap-2 "
          values={values.autoBidding}
          handleChange={() => setFieldValue("autoBidding", !values.autoBidding)}
        >
          {values.autoBidding ? <span>ON</span> : <span>OFF</span>}
        </FormikToggle>

        <FormicInputNumber
          name="cronTime.min"
          placeholder="Minutes"
          value={values.cronTime.min}
          errorClassName="left-0 top-[-12px]"
        >
          <p>Minutes</p>
        </FormicInputNumber>

        <FormicInputNumber
          name="cronTime.hour"
          placeholder="Hours"
          value={values.cronTime.hour}
          errorClassName="left-0 top-[-12px]"
        >
          <p>Hours</p>
        </FormicInputNumber>
      </div>
    </div>
  );
};
