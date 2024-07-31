import React from "react";
import FormicInput from "../ui/formik-input";
import FormikToggle from "../ui/formik-toggle";

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
        <div className="w-[200px] mt-4">
          <FormikToggle
            labelText="Auto Bidding"
            values={values}
            handleChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};
