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
    <div className="navbar bg-base-100 flex-col justify-center">
      {!!session ? (
        <>
          <Link className={linkStyle("/up-work")} href="/up-work">
            UpWork
          </Link>
          <Link className={linkStyle("/linkedin")} href="/linkedin">
            Linkedin
          </Link>
          <Link className={linkStyle("/dashboard")} href="/dashboard">
            Dashboard
          </Link>
          <Link className={linkStyle("/donations")} href="/donations">
            Donations
          </Link>
          <Link className={linkStyle("/account")} href="/account">
            Account
          </Link>
        </>
      ) : (
        <Link className={linkStyle("/")} href="/">
          Home
        </Link>
      )}
    </div>
  );
};

export default NavBar;
