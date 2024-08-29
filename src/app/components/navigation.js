"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LogOut from "./log-out";

const NavBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const linkStyle = (path) => {
    if (pathname === path) {
      return "text-blue-500";
    }
  };

  return (
    <div className="navbar bg-base-100 flex-col justify-center">
      <Link
        className={`btn btn-ghost text-xl ${
          pathname === "/" ? "text-blue-500" : ""
        }`}
        href="/"
      >
        Home
      </Link>
      {!!session && (
        <>
          <Link
            className={`btn btn-ghost text-xl ${
              pathname === "/up-work" ? "text-blue-500" : ""
            }`}
            href="/up-work"
          >
            UpWork
          </Link>
          <Link
            className={`btn btn-ghost text-xl ${
              pathname === "/linkedin" ? "text-blue-500" : ""
            }`}
            href="/linkedin"
          >
            Linkedin
          </Link>
          <Link
            className={`btn btn-ghost text-xl ${
              pathname === "/dashboard" ? "text-blue-500" : ""
            }`}
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className={`btn btn-ghost text-xl ${
              pathname === "/donations" ? "text-blue-500" : ""
            }`}
            href="/donations"
          >
            Donations
          </Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
