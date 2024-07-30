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

const filtersInputs = [
  {
    labelText: "1. All of these words",
    toolTipText: "Here you can add target wards and we will use all off them",
    fieldName: "searchWords.allOfTheseWords",
    fieldType: "text",
    placeholder: `Ex: WP | developer`,
  },
  {
    labelText: "2.Any of these words",
    toolTipText: "Here you can add target wards and we will use any off them",
    fieldName: "searchWords.anyOfTheseWords",
    fieldType: "text",
    placeholder: `Ex: WP | developer`,
  },
  {
    labelText: "3. None of these words",
    toolTipText: "Here you can add exception words",
    fieldName: "searchWords.noneOfTheseWord",
    fieldType: "text",
    placeholder: `Ex: js | debag`,
  },
  {
    labelText: "4. The exact phrase",
    toolTipText: "Here you can add exact phrase",
    fieldName: "searchWords.theExactPhrase",
    fieldType: "text",
    placeholder: `Ex: wordpress developer`,
  },
  {
    labelText: "5. Specify category you want",
    toolTipText: "Here you can add category, separate each category by ' | ' ",
    fieldName: "searchFilters.category",
    fieldType: "text",
    placeholder: `Ex: Web & Mobile Design`,
  },
];
const validationSchema = Yup.object({
  searchWords: Yup.object().shape({
    allOfTheseWords: Yup.string(),
    anyOfTheseWords: Yup.string(),
    noneOfTheseWord: Yup.string(),
    theExactPhrase: Yup.string(),
  }),
  searchFilters: Yup.object({
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
  }),

  projectLength: Yup.object().shape({
    week: Yup.boolean(),
    month: Yup.boolean(),
    semester: Yup.boolean(),
    ongoing: Yup.boolean(),
  }),
  hoursPerWeek: Yup.object().shape({
    as_needed: Yup.boolean(),
    full_time: Yup.boolean(),
  }),
});

const initialValues = {
  searchWords: {
    allOfTheseWords: "",
    anyOfTheseWords: "",
    noneOfTheseWord: "",
    theExactPhrase: "",
  },
  searchFilters: {
    category: "",
    experienceLevel: {
      1: false,
      2: false,
      3: false,
    },
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
  },

  projectLength: {
    week: false,
    month: false,
    semester: false,
    ongoing: false,
  },
  hoursPerWeek: {
    as_needed: false,
    full_time: false,
  },
};

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

const ExperienceLevel = ({ values, setFieldValue }) => {
  const experienceLevels = [
    { name: 1, label: "Entry Level", value: true },
    { name: 2, label: "Intermediate", value: true },
    { name: 3, label: "Expert", value: true },
  ];

  return (
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
              name={`searchFilters.experienceLevel.${item.name}`}
              type="checkbox"
              checked={values.searchFilters.experienceLevel[item.name]}
              onChange={() =>
                setFieldValue(
                  `searchFilters.experienceLevel.${item.name}`,
                  !values.searchFilters.experienceLevel[item.name]
                )
              }
              as={Checkbox}
            />
            <p>{item.label}</p>
          </label>
        ))}
      </div>
    </div>
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
              name="searchFilters.jobType.hourlyJobType.enabled"
              type="checkbox"
              checked={values.searchFilters.jobType.hourlyJobType.enabled}
              onChange={() => {
                setFieldValue(
                  "searchFilters.jobType.hourlyJobType.enabled",
                  !values.searchFilters.jobType.hourlyJobType.enabled
                );
                if (values.searchFilters.jobType.hourlyJobType.enabled) {
                  setFieldValue(
                    "searchFilters.jobType.hourlyJobType.range.min",
                    null
                  );
                  setFieldValue(
                    "searchFilters.jobType.hourlyJobType.range.max",
                    null
                  );
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
                name="searchFilters.jobType.hourlyJobType.range.min"
                type="number"
                placeholder="Min"
                className="w-[158px] py-[4px] pl-[22px]"
                value={
                  values.searchFilters.jobType.hourlyJobType.range.min || ""
                }
              />
              <ErrorMessage
                name="searchFilters.jobType.hourlyJobType.range.min"
                component="div"
                className="text-red-500 absolute top-[-4px] right-0"
              />
              <p>/hr</p>
            </div>
            <div className="flex gap-2 items-center relative">
              <BsCurrencyDollar className="absolute top-[5px] left-1 w-[20px] h-[20px]" />
              <Field
                name="searchFilters.jobType.hourlyJobType.range.max"
                type="number"
                placeholder="Max"
                className="w-[158px] py-[4px] pl-[22px]"
                value={
                  values.searchFilters.jobType.hourlyJobType.range.max || ""
                }
              />
              <ErrorMessage
                name="searchFilters.jobType.hourlyJobType.range.max"
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
              name="searchFilters.jobType.fixedJobType.enabled"
              type="checkbox"
              checked={values.searchFilters.jobType.fixedJobType.enabled}
              onChange={() => {
                setFieldValue(
                  "searchFilters.jobType.fixedJobType.enabled",
                  !values.searchFilters.jobType.fixedJobType.enabled
                );
                if (values.searchFilters.jobType.hourlyJobType.enabled) {
                  setFieldValue(
                    "searchFilters.jobType.fixedJobType.range.min",
                    null
                  );
                  setFieldValue(
                    "searchFilters.jobType.fixedJobType.range.max",
                    null
                  );
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
                name="searchFilters.jobType.fixedJobType.range.min"
                type="number"
                placeholder="Min"
                className="w-[158px] py-[4px] pl-[22px]"
                value={
                  values.searchFilters.jobType.fixedJobType.range.min || ""
                }
              />
              <p>/hr</p>
            </div>
            <div className="flex gap-2 items-center relative">
              <BsCurrencyDollar className="absolute top-[5px] left-1 w-[20px] h-[20px]" />
              <Field
                name="searchFilters.jobType.fixedJobType.range.max"
                type="number"
                placeholder="Max"
                className="w-[158px] py-[4px] pl-[22px]"
                value={
                  values.searchFilters.jobType.fixedJobType.range.max || ""
                }
              />
              <p>/hr</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectLength = ({ values, setFieldValue }) => {
  const projectLength = [
    { name: "week", label: "Less than one month", value: true },
    { name: "month", label: "1 to 3 month", value: true },
    { name: "semester", label: "3 to 6 month", value: true },
    { name: "ongoing", label: "More than 6 month", value: true },
  ];

  return (
    <div>
      <p className="mb-2">6. Project length</p>
      <div className="flex  flex-row gap-4 justify-around bg-indigo-50 p-2">
        {projectLength.map((item, indx) => (
          <label
            key={indx}
            htmlFor={item.label}
            className="flex gap-2 items-center hover:cursor-pointer"
          >
            <Field
              id={item.label}
              name={`projectLength.${item.name}`}
              type="checkbox"
              checked={values.projectLength[item.name]}
              onChange={() =>
                setFieldValue(
                  `projectLength.${item.name}`,
                  !values.projectLength[item.name]
                )
              }
              as={Checkbox}
            />
            <p>{item.label}</p>
          </label>
        ))}
      </div>
    </div>
  );
};
const HoursPerWeek = ({ values, setFieldValue }) => {
  const hoursPerWeek = [
    { name: "as_needed", label: "Less than 30 hrs/week", value: true },
    { name: "full_time", label: "More than 30 hrs/week", value: true },
  ];

  return (
    <div>
      <p className="mb-2">7. Hours per week</p>
      <div className="flex  flex-row gap-4 justify-around bg-indigo-50 p-2">
        {hoursPerWeek.map((item, indx) => (
          <label
            key={indx}
            htmlFor={item.label}
            className="flex gap-2 items-center hover:cursor-pointer"
          >
            <Field
              id={item.label}
              name={`hoursPerWeek.${item.name}`}
              type="checkbox"
              checked={values.hoursPerWeek[item.name]}
              onChange={() =>
                setFieldValue(
                  `hoursPerWeek.${item.name}`,
                  !values.hoursPerWeek[item.name]
                )
              }
              as={Checkbox}
            />
            <p>{item.label}</p>
          </label>
        ))}
      </div>
    </div>
  );
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
              <ExperienceLevel values={values} setFieldValue={setFieldValue} />
              <JobType values={values} setFieldValue={setFieldValue} />
              <ProjectLength values={values} setFieldValue={setFieldValue} />
              <HoursPerWeek values={values} setFieldValue={setFieldValue} />
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
