"use client";

import axios from "axios";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useToastContext } from "@/app/context/toast-context";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import Loader from "@/app/components/loader";
import { useSession } from "next-auth/react";
import Radio from "@/app/components/radio";

const filtersInputsUpWork = [
  {
    fieldName: "login",
    fieldType: "text",
    placeholder: "UpWork Login",
  },
  {
    fieldName: "pass",
    fieldType: "password",
    placeholder: "UpWork Password",
  },
  {
    fieldName: "secret",
    fieldType: "text",
    placeholder: "UpWork Secret",
  },
];
const statuses = [
  {
    name: "freelancer-account",
    label: "Freelancer",
    value: "freelancer-account",
  },
  {
    name: "agency-account",
    label: "Agency",
    value: "agency-account",
  },
];
const UpWorkLoginForm = ({
  setIsUpWorkAut,
  isSubmitting,
  setIsSubmitting,
  userId,
}) => {
  const { data: session, update } = useSession();
  const showToast = useToastContext();

  const initialValues = {
    login: "",
    pass: "",
    secret: "",
    status: null,
  };
  const validationSchema = Yup.object({
    login: Yup.string().required("Login is required"),
    pass: Yup.string().required("Password is required"),
    secret: Yup.string().required("Secret is required"),
    status: Yup.string().required("Chose type of account"),
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        "/api/up-work-authorize",
        {
          pass: values.pass,
          login: values.login,
          secret: values.secret,
          status: values.status,
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 600000,
        }
      );

      showToast(data.message, "success");

      const interval = setInterval(async () => {
        try {
          const response = await axios.get("/api/up-work-authorize", {
            params: {
              targetId: userId,
            },
          });
          if (response.data.status) {
            console.log("Status", response.data.status);
            console.log("Auth successful");
            setIsUpWorkAut(true);
            clearInterval(interval);
            update({
              ...session,
              user: { ...session.user, isUpWorkAuth: "update" },
            });
            setIsSubmitting(false);
          } else if (response.data.error) {
            setIsUpWorkAut(false);
            clearInterval(interval);
            setIsSubmitting(false);
          } else {
            console.log("User connecting....");
          }
        } catch (error) {
          console.error("Error checking connection status:", error);
          showToast(error?.response.data.message || "Server error", "error");
          setIsSubmitting(false);
          clearInterval(interval);
        }
      }, 10000);
    } catch (error) {
      console.log(error);
      showToast(error.response.data.message, "error");
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      className="flex flex-col gap-[15px]"
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue }) => (
        <Form className="flex flex-col gap-[15px] items-center">
          {filtersInputsUpWork.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 relative">
              <Field
                name={item.fieldName}
                type={item.fieldType}
                placeholder={item.placeholder}
                as={Input}
                className="input-bordered"
              />
              <ErrorMessage
                name={item.fieldName}
                component="div"
                className="text-red-500 absolute top-[-15px] right-0 text-sm"
              />
            </div>
          ))}
          <div className="flex gap-6 relative">
            {statuses.map((item, indx) => (
              <label
                key={indx}
                htmlFor={item.name}
                className="flex gap-2 items-center hover:cursor-pointer"
              >
                <Field
                  id={item.name}
                  name="status"
                  type="radio"
                  value={item.value}
                  checked={values.status === item.value}
                  onChange={() => setFieldValue("status", item.value)}
                  as={Radio}
                />
                <p>{item.label}</p>
              </label>
            ))}
            <ErrorMessage
              name="status"
              component="div"
              className="text-red-500 absolute top-[-15px] right-[0] text-sm"
            />
          </div>

          <Button
            type="submit"
            className="btn-primary min-w-[180px]"
            disabled={isSubmitting}
          >
            <p>{isSubmitting ? <Loader /> : "Connect to Linkedin"}</p>
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpWorkLoginForm;
