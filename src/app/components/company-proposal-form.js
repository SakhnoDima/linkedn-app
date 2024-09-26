import { useSession } from "next-auth/react";
import moment from "moment-timezone";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import Button from "./button";
import FormicTextArea from "../up-work/components/ui/formik-textArea";
import FormicInput from "../up-work/components/ui/formik-input";
import FormikToggle from "../up-work/components/ui/formik-toggle";
import { FormicInputNumber } from "../up-work/components/ui/formic-input-number";
import { Tooltip } from "./tooltip";
import { useModalContext } from "../context/modal-context";
import { events } from "./target-actions";

const inputData = [
  {
    labelText: "Name",
    toolTipText: "Here you can select name for your event",
    fieldName: "targetName",
    fieldType: "text",
    placeholder: `Ex: developer, JS`,
  },
  {
    labelText: "Targets words",
    toolTipText:
      "Here you can select the target words that will be used for the search",
    fieldName: "keyWords",
    fieldType: "text",
    placeholder: `Ex: developer, JS`,
  },
  {
    labelText: "Number invitations",
    toolTipText: "Enter the number of invitations you plan to send",
    fieldName: "connections",
    fieldType: "number",
    placeholder: `Ex: "20"`,
  },
  {
    labelText: "Location",
    toolTipText: "Here you can select the location. Use country name",
    fieldName: "locations",
    fieldType: "text",
    placeholder: `Ex: United State`,
  },
  {
    labelText: "Target industry",
    toolTipText:
      "Enter the industries in which you want to search for accounts. There may be several options separated - ';'",
    fieldName: "industries",
    fieldType: "text",
    placeholder: `Ex: "Market Research; Social Media Marketing"`,
  },
  {
    labelText: "Conversation topic",
    toolTipText: "Here you can select the conversation topic",
    fieldName: "topic",
    fieldType: "text",
    placeholder: `Ex: Careers`,
  },
];

const validationSchema = Yup.object({
  connections: Yup.number().required("Required*"),
  targetName: Yup.string().required("Required*"),
  keyWords: Yup.string().required("Required*"),
  locations: Yup.string().required("Required*"),
  topic: Yup.string().required("Required*"),
  letterText: Yup.string()
    .required("Required*")
    .max(750, "Your message is too long"),
  autoBidding: Yup.boolean(),
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
  connections: Yup.number().required("Required*"),
  industries: Yup.string(),
});

export const JobLetterForm = ({ currentTarget, handler }) => {
  const { data: session } = useSession();
  const { closeModal } = useModalContext();
  console.log(currentTarget?.locations);

  const initialValues = {
    industries: currentTarget.industries
      ? currentTarget.industries.join(";")
      : "",
    targetName: currentTarget.targetName || "",
    keyWords: currentTarget.keyWords || "",
    locations: currentTarget ? currentTarget.locations[0] : "",
    letterText: currentTarget.letterText || "",
    topic: currentTarget.topic || "",
    autoBidding: currentTarget.autoBidding || false,
    cronTime: {
      min: currentTarget?.cronTime?.min || null,
      hour: currentTarget?.cronTime?.hour || null,
      timeZone: moment.tz.guess() || null,
    },
    connections: currentTarget.connections || "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        handler(
          {
            status: false,
            event: events.companies,
            cronTime: values.cronTime,
            autoBidding: values.autoBidding,
            targetName: values.targetName,
            connections: values.connections,
            keyWords: values.keyWords,
            locations:
              values.locations.length > 0
                ? values.locations.split(";").map((elem) => elem.trim())
                : [],
            industries:
              values.industries.length > 0
                ? values.industries.split(";").map((elem) => elem.trim())
                : [],
            topic: values.topic,
            letterText: values.letterText,
          },
          session.user.id
        );
        closeModal();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values, handleChange }) => (
        <Form className="flex flex-col space-y-4 p-4 overflow-y-auto">
          {inputData.map((data, index) => (
            <FormicInput
              key={index}
              data={data}
              tooltipOptions="tooltip-right"
            />
          ))}

          <FormicTextArea
            data={{
              labelText: "Compose message",
              toolTipText:
                "Add you proposal message not longer then 750 symbols",
              fieldName: "letterText",
              fieldType: "text",
              placeholder: `Ex: Hi My name is Bob,
               We specialize in crafting converting UI/UX design solutions. Are you open to connecting?
`,
              fieldClassName: "h-[300px]",
            }}
          ></FormicTextArea>

          <div>
            <div className="flex space-x-2 items-center mb-2">
              <p className="text-lg">Start time options</p>
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
          <Button
            initial={{ backgroundColor: "#4f46e5" }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "#3730a3",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            type="submit"
            className="mx-auto w-72 rounded-[10px] text-white p-2"
            disabled={isSubmitting}
          >
            <p>Save</p>
          </Button>
        </Form>
      )}
    </Formik>
  );
};
