"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LogOut from "./log-out";

const NavBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const linkStyle = (path) =>
    pathname === path
      ? "btn btn-ghost text-xl text-blue-500"
      : "btn btn-ghost text-xl";

  return (
    <div className="navbar bg-base-100 justify-center">
      <Link className={linkStyle("/")} href="/">
        Home
      </Link>
      {!session && (
        <>
          <Link className={linkStyle("/sign-up")} href="/sign-up">
            Authorization
          </Link>
          <Link className={linkStyle("/login")} href="/login">
            Login
          </Link>
        </>
      )}
      {!!session && (
        <>
          <Link className={linkStyle("/linkedin")} href="/linkedin">
            Linkedin
          </Link>
          <LogOut />
        </>
      )}
    </div>
  );
};

export default NavBar;