import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

import { useModalContext } from "../context/modal-context";
import { useToastContext } from "../context/toast-context";
import Button from "./button";
import Loader from "./loader";
import { useSession } from "next-auth/react";
import FormicTextArea from "../up-work/components/ui/formik-textArea";
import FormicInput from "../up-work/components/ui/formik-input";

const JobLetterForm = ({ letterData, setLetterData }) => {
  const showToast = useToastContext();
  const { data: session, update } = useSession();
  const [messageLength, setMessageLength] = useState(0);

  const { closeModal } = useModalContext();

  const inputData = [
    {
      labelText: "Targets words",
      toolTipText:
        "Here you can select the target words that will be used for the search",
      fieldName: "targetWords",
      fieldType: "text",
      placeholder: `Ex: developer, JS`,
    },
    {
      labelText: "Location",
      toolTipText: "Here you can select the location. Use country name",
      fieldName: "location",
      fieldType: "text",
      placeholder: `Ex: United State`,
    },
    {
      labelText: "Conversation topic",
      toolTipText: "Here you can select the conversation topic",
      fieldName: "topic",
      fieldType: "text",
      placeholder: `Ex: Careers`,
    },
  ];

  const initialValues = {
    targetWords: letterData.targetWords || "",
    location: letterData.location || "",
    letterText: letterData.letterText || "",
    topic: letterData.topic || "",
  };

  const validationSchema = Yup.object({
    targetWords: Yup.string().required("Required*"),
    location: Yup.string().required("Required*"),
    topic: Yup.string().required("Required*"),
    letterText: Yup.string().required("Required*"),
  });

  const handleBlur = (event) => {
    const message = event.target.value;
    setMessageLength(message.length);
  };

  const handleStopSendingInvitationLetter = () => {
    axios
      .delete("api/job-proposal-letter", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          letterId: letterData._id,
          userId: session.user.id,
        },
      })
      .then(({ data }) => {
        showToast(data.message, "success");
        update({
          ...session,
          user: { ...session.user, jobProposalMessage: "update" },
        });
      })
      .catch((error) => {
        console.log(error);
        showToast(error.response.data.message, "error");
      })
      .finally(closeModal());
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        try {
          axios
            .post("api/job-proposal-letter", {
              userId: session.user.id,
              message: values,
            })
            .then(({ data }) => {
              showToast(data.message, "success");
              if (!session.user.jobProposalMessage) {
                update({
                  ...session,
                  user: { ...session.user, jobProposalMessage: "update" },
                });
              }

              !setLetterData(data.letter);
            })
            .catch((error) => {
              console.log(error);
              showToast(error.response.data.message, "error");
            })
            .finally(closeModal());
        } catch (error) {
          console.log(error);
        }

        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form
          className="w-[400px] flex flex-col space-y-4 
        "
        >
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
            onBlur={handleBlur}
          >
            {messageLength > 750 && (
              <p className="text-red-500  absolute top-[-4px] right-0">{`Yor message is too long.`}</p>
            )}
          </FormicTextArea>

          {inputData.map((data, index) => (
            <FormicInput key={index} data={data} />
          ))}

          {!session.user.jobProposalMessage ? (
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
              <p>Initialize</p>
            </Button>
          ) : (
            <Button
              onClick={handleStopSendingInvitationLetter}
              initial={{ backgroundColor: "#dc2626" }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#991b1b",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              type="button"
              className="mx-auto w-72 rounded-[10px] text-white p-2 "
              disabled={isSubmitting}
            >
              <p>Deactivate</p>
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};

const JobProposalLetterBlock = () => {
  const { data: session } = useSession();
  const [letter, setLetter] = useState({});
  const { openModal } = useModalContext();

  useEffect(() => {
    const getLetter = async () => {
      return await axios.get("api/job-proposal-letter", {
        params: {
          userId: session?.user.id,
        },
      });
    };
    if (session?.user.id) {
      getLetter().then((response) => {
        setLetter(response.data);
      });
    }
  }, [session?.user.id]);

  const handleClick = () => {
    openModal(
      <div className="py-4 px-10">
        <h2 className="text-center text-2xl mb-4">Greeting option</h2>
        <JobLetterForm letterData={letter} setLetterData={setLetter} />
      </div>
    );
  };

  return (
    <div>
      <Button
        disabled={!session}
        className="btn-sm flex items-center"
        whileHover={{ scale: 1.2 }}
        onClick={handleClick}
      >
        <span>Job offers</span>
        {!session ? (
          <Loader />
        ) : (
          <FaCheck
            className={`${
              session?.user.jobProposalMessage
                ? "fill-green-600"
                : "fill-red-500"
            }`}
          />
        )}
      </Button>
    </div>
  );
};

export default JobProposalLetterBlock;
