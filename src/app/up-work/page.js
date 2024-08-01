"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

import UpWorkLogin from "./components/up-work-login";
import ScannersForm from "./components/scanner-form";
import { ScannersList } from "./components/scanners-list";

const page = () => {
  const { data: session } = useSession();
  const [scanners, setScanners] = useState([]);

  return (
    <div className="flex flex-row">
      <div className=" flex-3/4 ">
        {!session?.user.isUpWorkAuth && (
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

export default page;
