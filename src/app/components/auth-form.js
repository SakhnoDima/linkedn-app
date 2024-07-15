"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Input from "./input";
import Button from "./button";
import { useToastContext } from "../context/toast-context";
import axios from "axios";
import { signIn } from "next-auth/react";

const AthForm = () => {
  const [isAuthorize, setIsAuthorize] = useState(false);
  const showToast = useToastContext();
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const handlerAuthorize = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post("/api/auth/register", {
        email: values.email,
        password: values.password,
      });

      if (response.status == 200) {
        showToast(response?.data.message, "success");
        setIsAuthorize(true);
        return;
      }
    } catch (error) {
      console.error(error);
      showToast(error.response?.data.error, "error");
      setSubmitting(false);
    }
  };

  const handlerLogIn = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response.status === 401) {
        showToast("Email or password is wrong", "error");
      }

      if (!response?.error) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      showToast(error.response?.data.error, "error");
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-center text-2xl mb-[20px]">
        {isAuthorize ? "Login Form" : "Authorization Form"}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={isAuthorize ? handlerLogIn : handlerAuthorize}
      >
        {({ isSubmitting, errors }) => (
          <Form className="flex flex-col gap-[15px] items-center">
            <div className="flex flex-col gap-2">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                as={Input}
                className="input-bordered"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Field
                name="password"
                type="password"
                placeholder="Password"
                as={Input}
                className="input-bordered"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <p className="text-center">
                {isAuthorize
                  ? "I haven't authorise yet"
                  : "I've already authorised"}
                <span className="ml-2 underline hover:cursor-pointer hover:text-blue-600" onClick={() => setIsAuthorize(!isAuthorize)}>
                  {isAuthorize ? "Authorise" : "Login"}
                </span>
              </p>
            </div>

            <Button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              <p>{isAuthorize ? "Login" : "Authorise"}</p>
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AthForm;
