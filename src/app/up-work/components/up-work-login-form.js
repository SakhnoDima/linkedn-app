"use client";

import axios from "axios";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useToastContext } from "@/app/context/toast-context";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import Loader from "@/app/components/loader";
import { useSession } from "next-auth/react";

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

const UpWorkLoginForm = ({
  setIsUpWorkAut,
  isSubmitting,
  setIsSubmitting,
  userId,
}) => {
  const { update } = useSession();
  const showToast = useToastContext();

  const initialValues = {
    login: "",
    pass: "",
  };
  const validationSchema = Yup.object({
    login: Yup.string().required("Login is required"),
    pass: Yup.string().required("Password is required"),
    secret: Yup.string().required("Secret is required"),
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
            update({ isUpWorkAuth: true });
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
      {({}) => (
        <Form className="flex flex-col gap-[15px] items-center">
          {filtersInputsUpWork.map((item) => (
            <div className="flex flex-col gap-2">
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
                className="text-red-500"
              />
            </div>
          ))}

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
