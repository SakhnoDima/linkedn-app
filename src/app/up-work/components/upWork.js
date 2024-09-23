"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import UpWorkLogin from "./up-work-login";
import ScannersForm from "./scanner-form";
import { ScannersList } from "./scanners-list";

const UpWork = () => {
  const { data: session, status } = useSession();
  const [scanners, setScanners] = useState([]);

  const isUpWorkAuth = session?.user?.isUpWorkAuth;
  const loadingSession = status === "loading";
  return (
    <div className="flex flex-row">
      <div className=" flex-3/4 ">
        {loadingSession
          ? ""
          : !isUpWorkAuth && (
              <UpWorkLogin session={session?.user.isUpWorkAuth} />
            )}
        <ScannersForm setScanners={setScanners} actions="save" />
      </div>
      <div className="border flex-1/4 ">
        <ScannersList scanners={scanners} setScanners={setScanners} />
      </div>
    </div>
  );
};

export default UpWork;
