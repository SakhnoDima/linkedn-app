"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useSession } from "next-auth/react";

import Input from "./input";
import Button from "./button";

const filtersInputs = [
  {
    labelText: "1. Add Your target filters name.",
    toolTipText: "Here I can add some text",
    fieldName: "targetName",
    fieldType: "string",
    placeholder: "Name",
  },
  {
    labelText: "2. How many connections would you like to send?",
    toolTipText: "Here I can add some text",
    fieldName: "connections",
    fieldType: "number",
    placeholder: "Connections",
  },
  {
    labelText: "3. Add keywords",
    toolTipText: "Here I can add some text",
    fieldName: "keyWords",
    fieldType: "string",
    placeholder: "Keywords",
  },
  {
    labelText: "4. Add Title",
    toolTipText: "Here I can add some text",
    fieldName: "title",
    fieldType: "string",
    placeholder: "Title",
  },
  {
    labelText: "5. Add Locations",
    toolTipText: "Here I can add some text",
    fieldName: "locations",
    fieldType: "string",
    placeholder: "Locations",
  },
  {
    labelText: "6. Add service categories",
    toolTipText: "Here I can add some text",
    fieldName: "serviceCategories",
    fieldType: "string",
    placeholder: "Service categories",
  },
];

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
              {filtersInputs.map((data, index) => (
                <label
                  key={index}
                  className="flex flex-col space-y-2  relative"
                >
                  <div className="flex items-center space-x-2">
                    <span>{data.labelText}</span>
                    <div className="tooltip" data-tip={`${data.toolTipText}`}>
                      <AiOutlineQuestionCircle className="hover:cursor-pointer" />
                    </div>
                  </div>
                  <Field
                    name={`${data.fieldName}`}
                    type={`${data.fieldType}`}
                    placeholder={`${data.placeholder}`}
                    as={Input}
                  />
                  <ErrorMessage
                    name="targetName"
                    component="div"
                    className="text-red-500 absolute top-[-4px] right-0"
                  />
                </label>
              ))}
              {/* <label className="flex flex-col space-y-2  relative">
                <div className="flex items-center space-x-2">
                  <span>1. Add Your target filters name.</span>
                  <div className="tooltip" data-tip="Here I can add some text">
                    <AiOutlineQuestionCircle className="hover:cursor-pointer" />
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
                  <div className="tooltip" data-tip="Here I can add some text">
                    <AiOutlineQuestionCircle className="hover:cursor-pointer" />
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
                  <div className="tooltip" data-tip="Here I can add some text">
                    <AiOutlineQuestionCircle className="hover:cursor-pointer" />
                  </div>
                </div>

                <Field
                  name="keyWords"
                  type="string"
                  placeholder="Keywords"
                  as={Input}
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
                  <div className="tooltip" data-tip="Here I can add some text">
                    <AiOutlineQuestionCircle className="hover:cursor-pointer" />
                  </div>
                </div>

                <Field
                  name="title"
                  type="string"
                  placeholder="Title"
                  as={Input}
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 absolute top-[-4px] right-0"
                />
              </label>
              <p>
                  It is also possible to add several values in fields 5-7, necessarily
                  separating them with a semicolon (";")
              </p>
              <label className="flex flex-col space-y-2 relative">
                <div className="flex items-center space-x-2">
                  <span> 5. Add Locations</span>
                  <div className="tooltip" data-tip="Here I can add some text">
                    <AiOutlineQuestionCircle className="hover:cursor-pointer" />
                  </div>
                </div>
                <Field
                  name="locations"
                  placeholder="Locations"
                  type="string"
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
                  <div className="tooltip" data-tip="Here I can add some text">
                    <AiOutlineQuestionCircle className="hover:cursor-pointer" />
                  </div>
                </div>

                <Field
                  name="serviceCategories"
                  placeholder="Service categories"
                  component={Input}
                  type="string"
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
                  <div className="tooltip" data-tip="Here I can add some text">
                    <AiOutlineQuestionCircle className="hover:cursor-pointer" />
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
              </label> */}
              <label className="flex flex-col mx-auto">
                <div className="flex items-center space-x-2">
                  <span>8. Add profile language</span>
                  <div className="tooltip" data-tip="Here I can add some text">
                    <AiOutlineQuestionCircle className="hover:cursor-pointer" />
                  </div>
                </div>
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
