"use client";
import { useState } from "react";
import axios from 'axios';
import { useSession } from "next-auth/react";

import Input from "./input";
import Button from "./button";
import { useModalContext } from "../context/modal-context";
import { useToastContext } from "../context/toast-context";

const SaveCodeForm = () => {
  const { data: session } = useSession();
  const [code, setCod] = useState("");
  const { closeModal } = useModalContext();
  const showToast = useToastContext()
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/save-pass", {
        code,
        userId: session.user.id
      });

      closeModal();
      showToast(response?.data.message, "success");
    } catch (error) {
      showToast(error.response?.data.message, "error");
    }
  };

  return (
    <div className="w-[700px] p-[50px] flex flex-col gap-[20px]">
      <p className="text-center">
        Check your email and enter the verification code from LinkedIn
      </p>
      <form
        className="flex flex-col gap-8 items-center"
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
  );
};

export default SaveCodeForm;
