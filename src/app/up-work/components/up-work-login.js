"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UpWorkLoginForm from "./up-work-login-form";

const UpWorkLogin = ({ isAuth }) => {
  const [isUpWorkAut, setIsUpWorkAut] = useState(isAuth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  if (isUpWorkAut) {
    return;
  }
  return (
    <div>
      <h2 className="text-center text-3xl mb-4">Upwork Authorization</h2>
      <UpWorkLoginForm
        setIsUpWorkAut={setIsUpWorkAut}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        userId={session?.user.id}
      />
    </div>
  );
};

export default UpWorkLogin;
