import React from "react";
import FormicInput from "../ui/formik-input";
import { SetBiddingOptions } from "./set-time";
import FormikToggle from "@/app/up-work/components/ui/formik-toggle";

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
        <div className="mt-[10px]">
          <span>U.S. Only</span>
          <FormikToggle
            className="gap-2 justify-start mb-1"
            values={values.usOnly}
            handleChange={() => handleChange("usOnly", !values.usOnly)}
          >
            {values.usOnly ? <span>TRUE</span> : <span>FALSE</span>}
          </FormikToggle>
        </div>
      </div>
    </>
  );
};
