import React from "react";
import FormicInput from "../ui/formik-input";
import { SetBiddingOptions } from "./set-time";

export const ScannerInfo = ({ values, handleChange }) => {
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
        <SetBiddingOptions values={values} handleChange={handleChange} />
      </div>
    </>
  );
};
