"use client";

import { useState } from "react";
import LinkedinSignUpForm from "./linkedin-sign-up-form";
import SaveCodeForm from "./save-user-cod";
import { useSession } from "next-auth/react";

const LinkedinAuth = () => {
  const { data: session } = useSession();

  const [isCodeConfirm, setIsCodeConfirm] = useState(false);

  return (
    !session?.user.isLinkedinAuth ||
    (!session.user && (
      <div className="w-[500px] mt-[50px] mx-auto mb-[40px] flex flex-col items-center">
        <h2 className="text-xl mb-[16px]">
          To start work, please authorize your account first
        </h2>
        <LinkedinSignUpForm setIsCodeConfirm={setIsCodeConfirm} />
        {isCodeConfirm && <SaveCodeForm />}
      </div>
    ))
  );
};

export default LinkedinAuth;
