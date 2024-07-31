"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSession } from "next-auth/react";

import Button from "@/app/components/button";

import {
  AddingTargetWardsBlock,
  ClientHistory,
  ClientLocation,
  ExperienceLevel,
  HoursPerWeek,
  JobDescriptionsBlock,
  JobType,
  ProjectLength,
  ScannerInfo,
} from "./form-sections";

const validationSchema = Yup.object({
  scannerName: Yup.string(),
  autoBidding: Yup.boolean(),
  searchWords: Yup.object().shape({
    allOfTheseWords: Yup.string(),
    anyOfTheseWords: Yup.string(),
    noneOfTheseWords: Yup.string(),
    theExactPhrase: Yup.string(),
  }),
  searchFilters: Yup.object({
    category: Yup.string(),
    contractorTier: Yup.object().shape({
      1: Yup.boolean(),
      2: Yup.boolean(),
      3: Yup.boolean(),
    }),
    jobType: Yup.object().shape({
      hourlyJobType: Yup.object().shape({
        enabled: Yup.boolean(),
        min: Yup.number().nullable(),
        max: Yup.number().nullable(),
      }),
      fixedJobType: Yup.object().shape({
        enabled: Yup.boolean(),
        min: Yup.number().nullable(),
        max: Yup.number().nullable(),
      }),
    }),
    durationV3: Yup.object().shape({
      week: Yup.boolean(),
      month: Yup.boolean(),
      semester: Yup.boolean(),
      ongoing: Yup.boolean(),
    }),
    hoursPerWeek: Yup.object().shape({
      as_needed: Yup.boolean(),
      full_time: Yup.boolean(),
    }),
    clientHires: Yup.object().shape({
      0: Yup.boolean(),
      "1-9": Yup.boolean(),
      "10-": Yup.boolean(),
    }),
    clientLocation: Yup.string(),
  }),
});

const initialValues = {
  scannerName: "",
  autoBidding: false,
  searchWords: {
    allOfTheseWords: "",
    anyOfTheseWords: "",
    noneOfTheseWords: "",
    theExactPhrase: "",
  },
  searchFilters: {
    category: "",
    contractorTier: {
      1: false,
      2: false,
      3: false,
    },
    jobType: {
      hourlyJobType: {
        enabled: false,
        min: null,
        max: null,
      },
      fixedJobType: {
        enabled: false,
        min: null,
        max: null,
      },
    },
    durationV3: {
      week: false,
      month: false,
      semester: false,
      ongoing: false,
    },
    workload: {
      as_needed: false,
      full_time: false,
    },
    clientHires: {
      0: false,
      "1-9": false,
      "10-": false,
    },
    clientLocation: "",
  },
};

const addScanner = async (scanner, userId) => {
  console.log({ scanner, userId });
  try {
    const response = await axios.post(
      "/api/scanners",
      { scanner, userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log(response.data);
    }
  } catch (error) {
    console.log(error);
    showToast(error?.response.data.message || "Server error", "error");
  }
};

const ScannersForm = () => {
  const { data: session } = useSession();

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
          addScanner(values, session.user.id);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting, values, setFieldValue, handleChange }) => (
          <Form className="flex flex-wrap flex-col space-y-4 p-4 pl-6 overflow-y-auto pt-[32px]  center gap-[30px] mx-auto justify-center items-center">
            <div className="flex flex-col  gap-[30px] mx-auto justify-center ">
              <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                  Scanner
                </div>
                <div className="collapse-content">
                  <ScannerInfo values={values} handleChange={handleChange} />
                </div>
              </div>
              <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                  Target words
                </div>
                <div className="collapse-content">
                  <AddingTargetWardsBlock />
                </div>
              </div>
              <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                  Job Preferences
                </div>
                <div className="collapse-content">
                  <JobDescriptionsBlock />
                  <ExperienceLevel
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                  <JobType values={values} setFieldValue={setFieldValue} />
                  <ProjectLength
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                  <HoursPerWeek values={values} setFieldValue={setFieldValue} />
                </div>
              </div>
              <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                  Client Parameters
                </div>
                <div className="collapse-content">
                  <ClientHistory
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                  <ClientLocation />
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
