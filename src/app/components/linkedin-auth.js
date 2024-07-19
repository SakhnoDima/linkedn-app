"use client";

import { useState } from "react";
import LinkedinSignUpForm from "./linkedin-sign-up-form";
import SaveCodeForm from "./save-user-cod";

const LinkedinAuth = ({ isAuth }) => {
  const [isLinkedinAuth, setIsLinkedinAuth] = useState(isAuth);
  const [isCodeConfirm, setIsCodeConfirm] = useState(false);
  if (isLinkedinAuth) {
    return;
  }

  return (
    <div className="w-[500px] mt-[50px] mx-auto flex flex-col items-center">
      <h2 className="text-xl mb-[16px]">
        To start work, please authorize your account first
      </h2>
      <LinkedinSignUpForm
        setIsCodeConfirm={setIsCodeConfirm}
        setIsLinkedinAuth={setIsLinkedinAuth}
      />
      {isCodeConfirm && <SaveCodeForm />}
    </div>
  );
};

export default LinkedinAuth;
