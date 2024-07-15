"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Button from "./button";

const LogOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
   await signOut({ redirect: false });
   router.push("/");
    };
  
  return (
    <Button onClick ={handleSignOut} type="button">
      <span>Logout</span>
    </Button>
  );
};

export default LogOut;
