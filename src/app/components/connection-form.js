"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useSession } from "next-auth/react";
import { useModalContext } from "../context/modal-context";
import moment from "moment-timezone";

import Input from "./input";
import Button from "./button";

import mixpanel from "mixpanel-browser";
import { useEffect } from "react";
import FormikToggle from "../up-work/components/ui/formik-toggle";
import { FormicInputNumber } from "../up-work/components/ui/formic-input-number";
import { Tooltip } from "./tooltip";

const filtersInputs = [
  {
    labelText: "1. Specify a name for this filter",
    toolTipText: "Write the name that best fits this target filter.",
    fieldName: "targetName",
    fieldType: "text",
    placeholder: `Ex: "SEO target"`,
  },
  {
    labelText: "2. Number of connections to be sent",
    toolTipText:
      "Write how many connections you want to send. We recommend a value between 10 and 20.",
    fieldName: "connections",
    fieldType: "number",
    placeholder: `Ex: "20"`,
  },
  {
    labelText: "3. Search tags",
    toolTipText: "General tags by which accounts will be searched.",
    fieldName: "keyWords",
    fieldType: "text",
    placeholder: `Ex: "SEO"`,
  },
  {
    labelText: "4. Account title",
    toolTipText:
      "Enter the title of the accounts you want to see in your connections.",
    fieldName: "title",
    fieldType: "text",
    placeholder: `Ex: "CEO"`,
  },
  {
    labelText: "5. Target locations",
    toolTipText:
      "Enter the locations in which you want to search for accounts. There may be several options separated - ';'",
    fieldName: "locations",
    fieldType: "text",
    placeholder: `Ex: "Germany; USA"`,
  },
  {
    labelText: "6. Target service categories",
    toolTipText:
      "Enter the service categories in which you want to search for accounts. There may be several options separated - ';'",
    fieldName: "serviceCategories",
    fieldType: "text",
    placeholder: `Ex: "Marketing Services; Technology, Information and Internet"`,
  },
  {
    labelText: "7. Target industry",
    toolTipText:
      "Enter the industries in which you want to search for accounts. There may be several options separated - ';'",
    fieldName: "industries",
    fieldType: "text",
    placeholder: `Ex: "Market Research; Social Media Marketing"`,
  },
];

const validationSchema = Yup.object({
  cronTime: Yup.object().shape({
    min: Yup.number()
      .min(0, "Time cannot be negative")
      .max(59, "Maximum 59 minutes")
      .nullable(),
    hour: Yup.number()
      .min(0, "Time cannot be negative")
      .max(23, "Maximum 23 hour")
      .nullable(),
    timeZone: Yup.string(),
  }),
  autoBidding: Yup.boolean(),
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

const ConnectionForm = ({ currentTarget, handler }) => {
  const { data: session } = useSession();
  const { closeModal } = useModalContext();

  const initialValues = {
    cronTime: {
      min: currentTarget.cronTime?.min || null,
      hour: currentTarget.cronTime?.hour || null,
      timeZone: moment.tz.guess() || null,
    },
    autoBidding: currentTarget.autoBidding || false,
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

  useEffect(() => {
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_SECRET_KEY, { debug: true });
  }, []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handler(
            {
              status: false,
              cronTime: values.cronTime,
              autoBidding: values.autoBidding,
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
          closeModal();
          setSubmitting(false);

          mixpanel.track("create new target");

          console.log("create new target");
        }}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form className="flex flex-col space-y-4 p-4 pl-6 overflow-y-auto pt-[32px]">
            <div className="flex flex-col center gap-[30px] mx-auto mb-8 justify-center items-center w-min">
              {filtersInputs.map((data, index) => (
                <>
                  <label
                    key={index}
                    className="flex flex-col space-y-2  relative"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{data.labelText}</span>
                      {index <= 2 && <span className="text-red-500">*</span>}
                    </div>
                    <div className="tooltip" data-tip={`${data.toolTipText}`}>
                      <AiOutlineQuestionCircle className="hover:cursor-pointer" />
                    </div>
                    <Field
                      name={`${data.fieldName}`}
                      type={`${data.fieldType}`}
                      placeholder={`${data.placeholder}`}
                      as={Input}
                    />
                    <ErrorMessage
                      name={`${data.fieldName}`}
                      component="div"
                      className="text-red-500 absolute top-[-4px] right-0"
                    />
                  </label>
                  {index === 3 && (
                    <p key="additional-info">
                      It is also possible to add several values in fields 5-7,
                      necessarily separating them with a semicolon (";")
                    </p>
                  )}
                </>
              ))}
              <label key="language" className="flex flex-col mx-auto">
                <div className="flex items-center space-x-2">
                  <span>8. Add profile language</span>
                  <div
                    className="tooltip"
                    data-tip="Select preferred user profile language"
                  >
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
              <div key="time">
                <div className="flex space-x-2 items-center mb-2">
                  <p>Start time options</p>
                  <Tooltip
                    text={`If you don't specify a time, the scanner will start every hour at 0 minutes (e.g., 00:00, etc.). If you only specify the hour, the scanner will start daily at the hour you set (e.g., at 14:00 every day).If you only specify the minutes, the scanner will start every hour at the minutes you set (e.g., at 00:15, ).`}
                  />
                </div>

                <div className="flex justify-around flex-row gap-4 py-4 ">
                  <FormikToggle
                    className="flex gap-2"
                    values={values.autoBidding}
                    handleChange={handleChange}
                  >
                    {values.autoBidding ? <span>ON</span> : <span>OFF</span>}
                  </FormikToggle>

                  <FormicInputNumber
                    name="cronTime.min"
                    placeholder="Minutes"
                    value={values.cronTime.min}
                    errorClassName="left-0 top-[-18px]"
                  >
                    <p>Minutes</p>
                  </FormicInputNumber>

                  <FormicInputNumber
                    key="time-options-hour"
                    name="cronTime.hour"
                    placeholder="Hours"
                    value={values.cronTime.hour}
                    errorClassName="left-0 top-[-18px]"
                  >
                    <p>Hours</p>
                  </FormicInputNumber>
                </div>
              </div>
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
