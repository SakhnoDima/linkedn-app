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
import { useToastContext } from "@/app/context/toast-context";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  scannerName: Yup.string().required("Required*"),
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

const ScannersForm = ({ setScanners, scanner, actions }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const showToast = useToastContext();

  const addScanner = async (scannerData, userId) => {
    try {
      const response = await axios.post(
        "/api/scanner",
        { scannerData, userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setScanners((prev) => [response.data.scanner, ...prev]);
      }
    } catch (error) {
      console.log(error);
      showToast(error?.response.data.message || "Server error", "error");
    }
  };

  const editScanner = async (scannerData, scannerId) => {
    try {
      const response = await axios.put(
        "/api/scanner",
        { scannerData, scannerId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        router.push(`/up-work/`);
      }
    } catch (error) {
      console.log(error);
      showToast(error?.response.data.message || "Server error", "error");
    }
  };
  const handleDelete = async () => {};

  return (
    <>
      <Formik
        initialValues={actions === "save" ? initialValues : scanner}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
          if (actions === "save") {
            addScanner(values, session.user.id);
          } else if (actions === "edit") {
            editScanner(values, scanner._id);
          }
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
            <div className="flex flex-row gap-4">
              <Button
                initial={{ backgroundColor: "#4f46e5" }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#3730a3",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                type="submit"
                className="mx-auto w-72 rounded-[10px] text-white p-2"
                disabled={isSubmitting}
              >
                <p>Save Scanner</p>
              </Button>
              {actions === "edit" && (
                <Button
                  onClick={handleDelete}
                  initial={{ backgroundColor: "#dc2626" }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#991b1b",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  type="button"
                  className="mx-auto w-72 rounded-[10px] text-white p-2"
                  disabled={isSubmitting}
                >
                  <p>Delete Scanner</p>
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ScannersForm;
