"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

import Button from "./button";

const LogOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <Button
      className="btn btn-ghost text-xl"
      onClick={handleSignOut}
      type="button"
    >
      <span>Logout</span>
      <MdLogout />
    </Button>
  );
};

export default LogOut;
