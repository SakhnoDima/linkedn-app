import React from "react";
import FormicInput from "../ui/formik-input";
import { SetBiddingOptions } from "./set-time";
import SetUsOnly from "./set-us-only";

export const ScannerInfo = ({ account, values, setFieldValue }) => {
  const filtersInputs = {
    labelText: "Specify Your Scanner Name",
    toolTipText: "You can add name for your scanner",
    fieldName: "scannerName",
    fieldType: "text",
    placeholder: `Ex: My First Scanner`,
  };
  return (
    <>
      <div>
        <FormicInput data={filtersInputs} />
        <SetBiddingOptions values={values} setFieldValue={setFieldValue} />
        {account === "freelancer-account" && (
          <SetUsOnly values={values} setFieldValue={setFieldValue} />
        )}
      </div>
    </>
  );
};
