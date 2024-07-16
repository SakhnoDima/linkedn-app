"use client";

import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useToastContext } from "../context/toast-context";
import Input from "./input";
import Button from "./button";

const LinkedinSignUpForm = ({ setIsLinkedinAuth }) => {
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
      setIsLinkedinAuth(true);
      update({ isLinkedinAuth: true });
    } catch (error) {
      console.log(error);
      showToast(error.response.data.message, "error");
    } finally {
      setSubmitting(false);
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
              className="input-bordered"
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
              className="input-bordered"
            />
            <ErrorMessage
              name="pass"
              component="div"
              className="text-red-500"
            />
          </div>

          <Button type="submit" className="btn-primary" disabled={isSubmitting}>
            <p>{isSubmitting ? "Loading" : "Connect to Linkedin"}</p>
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LinkedinSignUpForm;
