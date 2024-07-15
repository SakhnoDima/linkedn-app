"use client";

import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";

import Input from "./input";
import Button from "./button";
import { useToastContext } from "../context/toast-context";


const LinkedinSignUpForm = ({setIsLinkedinAuth}) => {
  const { data: session, update } = useSession();
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const showToast = useToastContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const linkedinAuthorization = await axios.post(
        "/api/lambda-authorize",
        {
          pass,
          login,
          userId: session.user.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 600000,
        }
      );
      showToast(linkedinAuthorization.data.message, "success");
      setIsLinkedinAuth(true);
      update({isLinkedinAuth: true})
    } catch (error) {
      console.log(error);
      showToast(error.response.data.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
      <Input
        required
        name="login"
        type="text"
        placeholder="Linkedin login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        className="input-bordered"
      />
      <Input
        required
        name="pass"
        type="password"
        placeholder="Linkedin password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        className="input-bordered"
      />
      <Button type="submit" className="btn-primary">
        <p>Send</p>
      </Button>
    </form>
  );
};

export default LinkedinSignUpForm;
