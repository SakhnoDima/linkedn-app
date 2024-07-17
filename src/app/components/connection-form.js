"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useSession } from "next-auth/react";

import Input from "./input";
import Button from "./button";

const validationSchema = Yup.object({
  targetName: Yup.string().required("Required*"),
  connections: Yup.number().required("Required*"),
  keyWords: Yup.string().required("Required*"),
});
const languageOptions = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "ru", label: "Russian" },
  { value: "de", label: "German" },
];

const ConnectionForm = ({ setFilters, currentTarget, handler }) => {
  const { data: session } = useSession();

  const initialValues = {
    targetName: currentTarget.targetName || "",
    connections: currentTarget.connections || "",
    keyWords: currentTarget.keyWords || "",
    locations: currentTarget.locations ? currentTarget.locations.join(";") : "",
    title: currentTarget.title || "",
    languages: currentTarget.languages || "",
    industries: currentTarget.industries
      ? currentTarget.industries.join(";")
      : "",
    serviceCategories: currentTarget.serviceCategories
      ? currentTarget.serviceCategories.join(";")
      : "",
  };

  return (
    <>
      <h2 className="text-3xl text-center mb-[8px] font-bold ">Target Form</h2>
      <p className="text-center mb-[12px]">
        Here you can specify the filters you need for the target and send
        requests
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handler(
            {
              targetName: values.targetName,
              connections: values.connections,
              keyWords: values.keyWords,
              title: values.title,
              locations:
                values.locations.length > 0
                  ? values.locations.split(";").map((elem) => elem.trim())
                  : [],
              languages: values.languages || [],
              industries:
                values.industries.length > 0
                  ? values.industries.split(";").map((elem) => elem.trim())
                  : [],
              serviceCategories:
                values.serviceCategories.length > 0
                  ? values.serviceCategories
                      .split(";")
                      .map((elem) => elem.trim())
                  : [],
            },
            session.user.id
          );
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col space-y-4 p-4">
            <div className="flex flex-col center gap-[30px] mx-auto">
              <label className="flex flex-col space-y-2  relative">
                <div className="flex items-center space-x-2">
                  <span>1. Add Your target filters name.</span>
                  <div className="group">
                    <AiOutlineQuestionCircle className="hover:cursor-pointer" />
                    <p className="hidden group-hover:block absolute bottom-[-24px] left-4 w-[100%] p-[4px] bg-slate-100 rounded">
                      Here I can add some text
                    </p>
                  </div>
                </div>
                <Field
                  name="targetName"
                  type="string"
                  placeholder="Name"
                  as={Input}
                />
                <ErrorMessage
                  name="targetName"
                  component="div"
                  className="text-red-500 absolute top-[-4px] right-0"
                />
              </label>
              <label className="flex flex-col space-y-2 relative">
                <div className="flex items-center space-x-2">
                  <span> 2. How many connections would you like to send?</span>
                  <div className="group">
                    <AiOutlineQuestionCircle className="hover:cursor-pointer" />
                    <p className="hidden group-hover:block absolute bottom-[-24px] left-4 w-[100%] p-[4px] bg-slate-100 rounded">
                      Here I can add some text
                    </p>
                  </div>
                </div>

                <Field
                  name="connections"
                  type="number"
                  placeholder="Connections"
                  as={Input}
                />
                <ErrorMessage
                  name="connections"
                  component="div"
                  className="text-red-500 absolute top-[-4px] right-0"
                />
              </label>
              <label className="flex flex-col space-y-2 relative">
                <div className="flex items-center space-x-2">
                  <span> 3. Add keywords</span>
                  <div className="group">
                    <AiOutlineQuestionCircle className="hover:cursor-pointer" />
                    <p className="hidden group-hover:block absolute bottom-[-24px] left-4 w-[100%] p-[4px] bg-slate-100 rounded">
                      Here I can add some text
                    </p>
                  </div>
                </div>

                <Field
                  name="keyWords"
                  placeholder="Keywords"
                  component={Input}
                />
                <ErrorMessage
                  name="keyWords"
                  component="div"
                  className="text-red-500 absolute top-[-4px] right-0"
                />
              </label>
              <label className="flex flex-col space-y-2 relative">
                <div className="flex items-center space-x-2">
                  <span> 4. Add Title</span>
                  <div className="group">
                    <AiOutlineQuestionCircle className="hover:cursor-pointer" />
                    <p className="hidden group-hover:block absolute bottom-[-24px] left-4 w-[100%] p-[4px] bg-slate-100 rounded">
                      Here I can add some text
                    </p>
                  </div>
                </div>

                <Field
                  className="mt-1"
                  name="title"
                  type="text"
                  placeholder="Title"
                  as={Input}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 absolute top-[-4px] right-0"
                />
              </label>
              <label className="flex flex-col space-y-2 relative">
                <div className="flex items-center space-x-2">
                  <span> 5. Add Locations</span>
                  <div className="group">
                    <AiOutlineQuestionCircle className="hover:cursor-pointer" />
                    <p className="hidden group-hover:block absolute bottom-[-24px] left-4 w-[100%] p-[4px] bg-slate-100 rounded">
                      Here I can add some text
                    </p>
                  </div>
                </div>
                <Field
                  name="locations"
                  placeholder="Locations"
                  component={Input}
                />
                <ErrorMessage
                  name="locations"
                  component="div"
                  className="text-red-500 absolute top-[-4px] right-0"
                />
              </label>
              <label className="flex flex-col space-y-2 relative">
                <div className="flex items-center space-x-2">
                  <span> 6. Add service categories</span>
                  <div className="group">
                    <AiOutlineQuestionCircle className="hover:cursor-pointer" />
                    <p className="hidden group-hover:block absolute bottom-[-24px] left-4 w-[100%] p-[4px] bg-slate-100 rounded">
                      Here I can add some text
                    </p>
                  </div>
                </div>

                <Field
                  name="serviceCategories"
                  placeholder="Service categories"
                  component={Input}
                />
                <ErrorMessage
                  name="serviceCategories"
                  component="div"
                  className="text-red-500 absolute top-[-4px] right-0"
                />
              </label>
              <label className="flex flex-col space-y-2 relative">
                <div className="flex items-center space-x-2">
                  <span> 7. Add industry</span>
                  <div className="group">
                    <AiOutlineQuestionCircle className="hover:cursor-pointer" />
                    <p className="hidden group-hover:block absolute bottom-[-24px] left-4 w-[100%] p-[4px] bg-slate-100 rounded">
                      Here I can add some text
                    </p>
                  </div>
                </div>

                <Field
                  name="industries"
                  type="text"
                  placeholder="Industries"
                  component={Input}
                />
                <ErrorMessage
                  name="industries"
                  component="div"
                  className="text-red-500 absolute top-[-4px] right-0"
                />
              </label>

              <label className="flex flex-col mx-auto">
                <span className="mt-5">8. Add profile language</span>
                <Field
                  name="languages"
                  component={({ field, form, ...props }) => (
                    <div className="flex space-x-4 bg-indigo-50 p-2 border-2 rounded-[5px]">
                      {languageOptions.map((option) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            type="checkbox"
                            id={option.value}
                            {...field}
                            {...props}
                            value={option.value}
                            checked={field.value.includes(option.value)}
                            onChange={() => {
                              if (field.value.includes(option.value)) {
                                const nextValue = field.value.filter(
                                  (value) => value !== option.value
                                );
                                form.setFieldValue(field.name, nextValue);
                              } else {
                                const nextValue = [
                                  ...field.value,
                                  option.value,
                                ];
                                form.setFieldValue(field.name, nextValue);
                              }
                            }}
                            className="mr-2"
                          />
                          <label htmlFor={option.value}>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  )}
                />
                <ErrorMessage
                  name="languages"
                  component="div"
                  className="text-red-500"
                />
              </label>
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

export default ConnectionForm;
