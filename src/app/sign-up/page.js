"use client";
import { useState } from "react";
import LoginForm from "../components/logIn-form";
import Popup from "../components/pop-up";

const SignUpPage = () => {
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [userLogin, setUserLogin] = useState("");
  return (
    <div className="w-[450px] mx-auto mt-[200px] text-lg font-medium">
      <h2 className="mb-3 text-center">Authorization form</h2>
      <LoginForm setIsShowPopup={setIsShowPopup} setUserLogin={setUserLogin} />
      {isShowPopup ? <Popup userLogin={userLogin} /> : ""}
    </div>
  );
};

export default SignUpPage;
