"use client";
import { useEffect, useState } from "react";
import ConnectionForm from "../components/connection-form";
import LinkedinAuth from "../components/linkedin-auth";

const SendingRequestBlock = () => {
  return (
    <div className="py-[50px] ">
      <h2 className="text-3xl text-center mb-[8px] font-bold ">
        Connecting Form
      </h2>
      <p className="text-center mb-[12px]">
        Here you can specify the filters you need for the target and send
        requests
      </p>
      <ConnectionForm />
    </div>
  );
};

const ConnectionPage = () => {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const isAuth = async () => {
      const response = await fetch("/api/is-lambda-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: "669000d2ca3d92b84e73d6c9" }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuth(data.isAuth);
      }
    };

    isAuth();
  }, []);

  return (
    <>{isAuth ? <SendingRequestBlock /> : <LinkedinAuth setAuth={setAuth} />}</>
  );
};

export default ConnectionPage;
