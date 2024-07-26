"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useToastContext } from "@/app/context/toast-context";
import Button from "@/app/components/button";
import Input from "@/app/components/input";
import Loader from "@/app/components/loader";

const UpWorkLoginForm = () => {
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
      const { data } = await axios.post(
        "/api/up-work-authorize",
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

      showToast(data.message, "success");

      //update({ isLinkedinAuth: true });
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
