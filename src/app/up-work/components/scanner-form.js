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
import Checkbox from "@/app/components/checkbox";

const InputFormComponent = ({ data }) => {
  return (
    <label className="flex flex-col space-y-2  relative">
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
  );
};

const JobType = ({ values, setFieldValue }) => {
  return (
    <div>
      <p className="mb-2">5. Job type</p>
      <div className="flex flex-col gap-4 bg-indigo-50 p-2 ">
        <div className="flex  flex-row gap-4 justify-around">
          <label
            htmlFor="hourlyJobType"
            className="flex gap-2 items-center  justify-between hover:cursor-pointer"
          >
            <Field
              id="hourlyJobType"
              name="jobType.hourlyJobType.enabled"
              type="checkbox"
              checked={values.jobType.hourlyJobType.enabled}
              onChange={() => {
                setFieldValue(
                  "jobType.hourlyJobType.enabled",
                  !values.jobType.hourlyJobType.enabled
                );
                if (values.jobType.hourlyJobType.enabled) {
                  setFieldValue("jobType.hourlyJobType.range.min", null);
                  setFieldValue("jobType.hourlyJobType.range.max", null);
                }
              }}
              as={Checkbox}
            />
            <p className="min-w-[50px]">Hourly</p>
          </label>
          <div className="flex flex-row gap-4 ">
            <div className="flex gap-2 items-center relative">
              <BsCurrencyDollar className="absolute top-[5px] left-1 w-[20px] h-[20px]" />
              <Field
                name="jobType.hourlyJobType.range.min"
                type="number"
                placeholder="Min"
                className="w-[158px] py-[4px] pl-[22px]"
                value={values.jobType.hourlyJobType.range.min || ""}
              />
              <ErrorMessage
                name="jobType.hourlyJobType.range.min"
                component="div"
                className="text-red-500 absolute top-[-4px] right-0"
              />
              <p>/hr</p>
            </div>
            <div className="flex gap-2 items-center relative">
              <BsCurrencyDollar className="absolute top-[5px] left-1 w-[20px] h-[20px]" />
              <Field
                name="jobType.hourlyJobType.range.max"
                type="number"
                placeholder="Max"
                className="w-[158px] py-[4px] pl-[22px]"
                value={values.jobType.hourlyJobType.range.max || ""}
              />
              <ErrorMessage
                name="jobType.hourlyJobType.range.max"
                component="div"
                className="text-red-500 absolute top-[-4px] right-0"
              />
              <p>/hr</p>
            </div>
          </div>
        </div>
        <div className="flex  flex-row gap-4 justify-around">
          <label
            htmlFor="fixedJobType"
            className="flex gap-2 items-center  justify-between hover:cursor-pointer"
          >
            <Field
              id="fixedJobType"
              name="jobType.fixedJobType.enabled"
              type="checkbox"
              checked={values.jobType.fixedJobType.enabled}
              onChange={() => {
                setFieldValue(
                  "jobType.fixedJobType.enabled",
                  !values.jobType.fixedJobType.enabled
                );
                if (values.jobType.hourlyJobType.enabled) {
                  setFieldValue("jobType.fixedJobType.range.min", null);
                  setFieldValue("jobType.fixedJobType.range.max", null);
                }
              }}
              as={Checkbox}
            />
            <p className="min-w-[50px]">Fixed</p>
          </label>
          <div className="flex flex-row gap-4 ">
            <div className="flex gap-2 items-center relative">
              <BsCurrencyDollar className="absolute top-[5px] left-1 w-[20px] h-[20px]" />
              <Field
                name="jobType.fixedJobType.range.min"
                type="number"
                placeholder="Min"
                className="w-[158px] py-[4px] pl-[22px]"
                value={values.jobType.fixedJobType.range.min || ""}
              />
              <p>/hr</p>
            </div>
            <div className="flex gap-2 items-center relative">
              <BsCurrencyDollar className="absolute top-[5px] left-1 w-[20px] h-[20px]" />
              <Field
                name="jobType.fixedJobType.range.max"
                type="number"
                placeholder="Max"
                className="w-[158px] py-[4px] pl-[22px]"
                value={values.jobType.fixedJobType.range.max || ""}
              />
              <p>/hr</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  { name: 1, label: "Entry Level", value: true },
  { name: 2, label: "Intermediate", value: true },
  { name: 3, label: "Expert", value: true },
];

const validationSchema = Yup.object({
  targetWards: Yup.string().required("Required*"),
  exceptWords: Yup.string(),
  category: Yup.string(),
  experienceLevel: Yup.object().shape({
    1: Yup.boolean(),
    2: Yup.boolean(),
    3: Yup.boolean(),
  }),
  jobType: Yup.object().shape({
    hourlyJobType: Yup.object().shape({
      enabled: Yup.boolean(),
      range: Yup.object().shape({
        min: Yup.number().nullable(),
        max: Yup.number().nullable(),
      }),
    }),
    fixedJobType: Yup.object().shape({
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
  experienceLevel: {
    1: false,
    2: false,
    3: false,
  },
  hourlyJobType: "",
  jobType: {
    hourlyJobType: {
      enabled: false,
      range: {
        min: null,
        max: null,
      },
    },
    fixedJobType: {
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
                <InputFormComponent key={index} data={data} />
              ))}
              <div>
                <p className="mb-2">4. Experience level</p>
                <div className="flex  flex-row gap-4 justify-around bg-indigo-50 p-2">
                  {experienceLevels.map((item, indx) => (
                    <label
                      key={indx}
                      htmlFor={item.label}
                      className="flex gap-2 items-center hover:cursor-pointer"
                    >
                      <Field
                        id={item.label}
                        name={`experienceLevel.${item.name}`}
                        type="checkbox"
                        checked={values.experienceLevel[item.name]}
                        onChange={() =>
                          setFieldValue(
                            `experienceLevel.${item.name}`,
                            !values.experienceLevel[item.name]
                          )
                        }
                        as={Checkbox}
                      />
                      <p>{item.label}</p>
                    </label>
                  ))}
                </div>
              </div>
              <JobType values={values} setFieldValue={setFieldValue} />
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
