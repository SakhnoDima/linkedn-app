import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import Button from "./button";
import { useModalContext } from "../context/modal-context";
import FormicInput from "../up-work/components/ui/formik-input";

const InvitationLetterForm = () => {
  const { closeModal } = useModalContext();
  const initialValues = {};
  const validationSchema = Yup.object({
    //     cronTime: Yup.object().shape({
    //       min: Yup.number()
    //         .min(0, "Time cannot be negative")
    //         .max(59, "Maximum 59 minutes")
    //         .nullable(),
    //       hour: Yup.number()
    //         .min(0, "Time cannot be negative")
    //         .max(23, "Maximum 23 hour")
    //         .nullable(),
    //       timeZone: Yup.string(),
    //     }),
    //     autoBidding: Yup.boolean(),
    //     targetName: Yup.string().required("Required*"),
    //     connections: Yup.number().required("Required*"),
    //     keyWords: Yup.string().required("Required*"),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("ok");
        closeModal();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values, handleChange }) => (
        <Form
          className="flex flex-col space-y-4 p-4 
        "
        >
          <FormicInput
            data={{
              labelText: "Propose with a Specialized freelancer profile",
              toolTipText: "Here you can select a freelancer profile.",
              fieldName: "biddingOptions.profile",
              fieldType: "text",
              placeholder: `Ex: Freelancer Profile`,
            }}
          />
          <Button
            type="submit"
            className="mx-auto w-72 bg-indigo-600 hover:bg-indigo-800 rounded-[10px] text-white p-2"
            disabled={isSubmitting}
          >
            <p>Enable</p>
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const InvitationLetterBlock = () => {
  const { openModal } = useModalContext();
  const handleClick = () => {
    openModal(
      <div className="p-4">
        <h2 className="text-center text-xl">Greeting option</h2>
        <InvitationLetterForm />
      </div>
    );
  };

  return (
    <div>
      <Button
        className="btn-sm"
        whileHover={{ scale: 1.2 }}
        onClick={handleClick}
      >
        Greeting Letter
      </Button>
    </div>
  );
};

export default InvitationLetterBlock;
