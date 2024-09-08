"use client";

import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useToastContext } from "../context/toast-context";
import Input from "./input";
import Button from "./button";
import Loader from "./loader";

const LinkedinSignUpForm = ({ setIsCodeConfirm }) => {
  const [loading, setLoading] = useState(false);
  const showToast = useToastContext();
  const { data: session, update } = useSession();

  const initialValues = {
    login: "",
    pass: "",
  };
  const validationSchema = Yup.object({
    login: Yup.string().required("Login is required"),
    pass: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsCodeConfirm(true);
    setLoading(true);
    try {
      const linkedinAuthorization = await axios.post(
        "/api/lambda-authorize",
        {
          pass: values.pass,
          login: values.login,
          userId: session.user.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 600000,
        }
      );

      showToast(linkedinAuthorization.data.message, "success");

      const interval = setInterval(async () => {
        try {
          const response = await axios.get("/api/lambda-authorize", {
            params: {
              userId: session.user.id,
            },
          });

          if (response.data.status) {
            console.log("Status is true, stopping checks");

            clearInterval(interval);
            setLoading(false);
            update({
              ...session,
              user: { ...session.user, isLinkedinAuth: "update" },
            });
          }
        } catch (error) {
          clearInterval(interval);
          setLoading(false);
          console.error("Error checking connection status:", error);
          showToast(error?.response.data.message || "Server error", "error");
        }
      }, 10000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      showToast(error.response.data.message, "error");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      className="flex flex-col gap-[15px]"
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-[15px] items-center">
          <div className="flex flex-col gap-2">
            <Field
              name="login"
              type="text"
              placeholder="Linkedin Login"
              as={Input}
              className="input-bordered w-[400px]"
            />
            <ErrorMessage
              name="login"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Field
              name="pass"
              type="password"
              placeholder="Linkedin Password"
              as={Input}
              className="input-bordere w-[400px]"
            />
            <ErrorMessage
              name="pass"
              component="div"
              className="text-red-500"
            />
          </div>

          <Button
            type="submit"
            className="btn-primary min-w-[180px]"
            disabled={loading}
          >
            <p>{loading ? <Loader /> : "Connect to Linkedin"}</p>
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LinkedinSignUpForm;
