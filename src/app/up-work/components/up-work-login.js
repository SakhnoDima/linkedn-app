"use client";

import { useState } from "react";
import UpWorkLoginForm from "./up-work-login-form";

const UpWorkLogin = ({ isAuth }) => {
  const [isUpWorkAut, setIsUpWorkAut] = useState(isAuth);
  if (isUpWorkAut) {
    return;
  }
  return (
    <div>
      <h2 className="text-center text-3xl mb-4">Upwork Authorization</h2>
      <UpWorkLoginForm setIsUpWorkAut={setIsUpWorkAut} />
    </div>
  );
};

export default UpWorkLogin;
