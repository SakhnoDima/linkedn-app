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
      <UpWorkLoginForm setIsUpWorkAut={setIsUpWorkAut} />
    </div>
  );
};

export default UpWorkLogin;
