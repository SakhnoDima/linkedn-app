"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BsCurrencyDollar } from "react-icons/bs";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";
import { useModalContext } from "@/app/context/modal-context";
import Input from "@/app/components/input";
import Button from "@/app/components/button";

const filtersInputs = [
  {
    labelText: "1. Specify target words",
    toolTipText: "Here you can add target wards",
    fieldName: "targetWards",
    fieldType: "text",
    placeholder: `Ex: WP | developer`,
  },
  {
    labelText: "2. Specify exception words",
    toolTipText: "Here you can add exception words",
    fieldName: "exceptWords",
    fieldType: "text",
    placeholder: `Ex: js | debag`,
  },
  {
    labelText: "3. Specify category you want",
    toolTipText: "Here you can add category, separate each category by ' | ' ",
    fieldName: "category",
    fieldType: "text",
    placeholder: `Ex: Web & Mobile Design`,
  },
];

const experienceLevels = [
  { label: "Entry Level" },
  { label: "Intermediate" },
  { label: "Expert" },
];

const validationSchema = Yup.object({
  targetWards: Yup.string().required("Required*"),
  exceptWords: Yup.string(),
  category: Yup.string(),
  checked: Yup.array().of(Yup.string()),
  jobType: Yup.object().shape({
    hourlyJobType: Yup.object().shape({
      enabled: Yup.boolean(),
      range: Yup.object().shape({
        min: Yup.number().nullable(),
        max: Yup.number().nullable(),
      }),
    }),
  }),
});

const initialValues = {
  targetWards: "",
  exceptWords: "",
  category: "",
  checked: [],
  hourlyJobType: "",
  jobType: {
    hourlyJobType: {
      enabled: false,
      range: {
        min: null,
        max: null,
      },
    },
  },
};

const ScannersForm = () => {
  const { data: session } = useSession();

  const [hourlyType, setHourlyType] = useState(false);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          console.log("Scanner was saved");
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="flex flex-wrap content-start flex-col space-y-4 p-4 pl-6 overflow-y-auto pt-[32px]  center gap-[30px] mx-auto justify-center items-center">
            <div className="flex flex-col  gap-[30px] mx-auto justify-center ">
              {filtersInputs.map((data, index) => (
                <label
                  key={index}
                  className="flex flex-col space-y-2  relative"
                >
                  <div className="flex items-center space-x-2">
                    <span>{data.labelText}</span>

                    <div className="tooltip" data-tip={`${data.toolTipText}`}>
                      <AiOutlineQuestionCircle className="hover:cursor-pointer" />
                    </div>
                  </div>
                  <Field
                    name={`${data.fieldName}`}
                    type={`${data.fieldType}`}
                    placeholder={`${data.placeholder}`}
                    as={Input}
                  />
                  <ErrorMessage
                    name={`${data.fieldName}`}
                    component="div"
                    className="text-red-500 absolute top-[-4px] right-0"
                  />
                </label>
              ))}
              <div>
                <p className="mb-2">4. Experience level</p>
                <div className="flex  flex-row gap-4 justify-center bg-indigo-50 p-2">
                  {experienceLevels.map((level, indx) => (
                    <label
                      key={indx}
                      htmlFor={level.label}
                      className="flex gap-2 items-center hover:cursor-pointer"
                    >
                      <Field
                        id={level.label}
                        name="checked"
                        type="checkbox"
                        value={level.label}
                      />
                      <p>{level.label}</p>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2">5. Job type</p>
                <div className="flex  flex-row gap-4 justify-center bg-indigo-50 p-2 relative">
                  <label
                    htmlFor="hourlyJobType"
                    className="flex gap-2 items-center  justify-between hover:cursor-pointer"
                  >
                    <Field
                      id="hourlyJobType"
                      name="jobType.hourlyJobType.enabled"
                      type="checkbox"
                      checked={values.jobType.hourlyJobType.enabled}
                      onChange={() =>
                        setFieldValue(
                          "jobType.hourlyJobType.enabled",
                          !values.jobType.hourlyJobType.enabled
                        )
                      }
                    />
                    <p>Hourly</p>
                  </label>
                  {values.jobType.hourlyJobType.enabled && (
                    <div className="flex flex-row space-x-2 absolute left-full ml-4">
                      <div className="flex gap-2 items-center relative">
                        <BsCurrencyDollar className="absolute top-[6px] left-1 w-[20px] h-[20px]" />
                        <Field
                          name="jobType.hourlyJobType.range.min"
                          type="number"
                          placeholder="Min"
                          className="w-20 py-[4px] pl-[22px]"
                        />
                        <p>/hr</p>
                      </div>
                      <div className="flex gap-2 items-center relative">
                        <BsCurrencyDollar className="absolute top-[6px] left-1 w-[20px] h-[20px]" />
                        <Field
                          name="jobType.hourlyJobType.range.max"
                          type="number"
                          placeholder="Max"
                          className="w-20 py-[4px] pl-[22px]"
                        />
                        <p>/hr</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="mx-auto w-72 bg-indigo-600 hover:bg-indigo-800 rounded-[10px] text-white p-2"
              disabled={isSubmitting}
            >
              <p>Save filters</p>
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ScannersForm;
