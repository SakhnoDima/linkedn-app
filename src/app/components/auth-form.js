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
import Loader from "./loader";
import mixpanel from "mixpanel-browser";

const isProduction = process.env.NEXT_PUBLIC_PRODUCTION || null;

const AthForm = () => {
  const [isAuthorize, setIsAuthorize] = useState(!isProduction);
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
  const handlerAuthorize = async (values, { setSubmitting }) => {
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

  const handlerLogIn = async (values, { setSubmitting }) => {
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
        router.push("/linkedin");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      showToast(error.response?.data.error, "error");
      setSubmitting(false);
    }
  };

  return (
    <div className="w-[650px] mx-auto ">
      <h2 className="text-center text-2xl mb-[50px]">
        {isAuthorize ? "Login Form" : "Authorization Form"}
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={isAuthorize ? handlerLogIn : handlerAuthorize}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-8 items-center">
            <label className="flex flex-col gap-2 relative">
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
                className="text-red-500 absolute right-0 top-[-18px]"
              />
              <p className="absolute top-[-24px]">Email</p>
            </label>
            <label className="flex flex-col gap-2 relative">
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
                className="text-red-500 absolute right-0 top-[-18px]"
              />
              <p className="absolute top-[-24px]">Password</p>
            </label>
            <div>
              {!!isProduction && (
                <p className="text-center">
                  {isAuthorize
                    ? "I haven't authorise yet"
                    : "I've already authorised"}
                  <span
                    className="ml-2 underline hover:cursor-pointer hover:text-blue-600"
                    onClick={() => setIsAuthorize(!isAuthorize)}
                  >
                    {isAuthorize ? "Authorise" : "Login"}
                  </span>
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="btn-primary min-w-[180px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader />
              ) : (
                <p>{isAuthorize ? "Login" : "Authorise"}</p>
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AthForm;
