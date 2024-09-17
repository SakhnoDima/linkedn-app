import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import * as Yup from "yup";
import axios from "axios";

import Button from "./button";
import { useModalContext } from "../context/modal-context";
import FormicInput from "../up-work/components/ui/formik-input";
import FormicTextArea from "../up-work/components/ui/formik-textArea";
import { useToastContext } from "../context/toast-context";
import { FaCheck } from "react-icons/fa";
import Loader from "./loader";

const InvitationLetterForm = ({ userId, letterData, setLetterData }) => {
  const showToast = useToastContext();
  const { data: session, update } = useSession();

  const { closeModal } = useModalContext();
  const initialValues = {
    letterText: letterData.letterText || "",
    includesWords: letterData.includesWords || "",
  };

  const validationSchema = Yup.object({
    letterText: Yup.string().required("Required*"),
    includesWords: Yup.string(),
  });

  const handleStopSendingInvitationLetter = () => {
    axios
      .delete("/api/invitation-letter", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          letterId: letterData._id,
          userId,
        },
      })
      .then(({ data }) => {
        showToast(data.message, "success");
        update({
          ...session,
          user: { ...session.user, isGreetingMessage: "update" },
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
            .post("api/invitation-letter", {
              userId,
              invitationData: values,
            })
            .then(({ data }) => {
              showToast(data.message, "success");
              if (!session.user.isGreetingMessage) {
                update({
                  ...session,
                  user: { ...session.user, isGreetingMessage: "update" },
                });
              }

              setLetterData(data.letter);
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
              labelText: "Invitation letter",
              toolTipText:
                "Add your invitation letter. Use {{name}} to include name to the letter",
              fieldName: "letterText",
              fieldType: "text",
              placeholder: `Ex: Hi {{ name }},
               We specialize in crafting converting UI/UX design solutions. Are you open to connecting?
`,
              fieldClassName: "h-[300px]",
            }}
          />
          <FormicInput
            data={{
              labelText: "Includes words",
              toolTipText:
                "Here you can select the words that will be searched in the subtitle to use the right target. If words are not specified, the letter will be sent to everyone. Separate individual words/phrases using ';'",
              fieldName: "includesWords",
              fieldType: "text",
              placeholder: `Ex: CEO; Chief Executive`,
            }}
          />
          {!session.user.isGreetingMessage ? (
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

const InvitationLetterBlock = () => {
  const { data: session } = useSession();
  const [letter, setLetter] = useState({});
  const { openModal } = useModalContext();

  useEffect(() => {
    const getLetter = async () => {
      return await axios.get("api/invitation-letter", {
        params: {
          userId: session?.user.id,
        },
      });
    };
    if (session?.user.id) {
      getLetter().then((response) => setLetter(response.data));
    }
  }, [session?.user.id]);

  const handleClick = () => {
    openModal(
      <div className="py-4 px-10">
        <h2 className="text-center text-2xl mb-4">Greeting option</h2>
        {!session?.user.isGreetingMessage ? (
          <p>Initialize this task to start sending messages</p>
        ) : (
          <p>Your task has started, click Deactivate to stop sending</p>
        )}
        <InvitationLetterForm
          userId={session?.user.id}
          letterData={letter}
          setLetterData={setLetter}
        />
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
        <span>Greeting</span>
        {!session ? (
          <Loader />
        ) : (
          <FaCheck
            className={`${
              session?.user.isGreetingMessage
                ? "fill-green-600"
                : "fill-red-500"
            }`}
          />
        )}
      </Button>
    </div>
  );
};

export default InvitationLetterBlock;
