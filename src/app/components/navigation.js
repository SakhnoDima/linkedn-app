'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  
  const linkStyle = (path) => (
    pathname === path ? "btn btn-ghost text-xl text-blue-500" : "btn btn-ghost text-xl"
  );

  return (
    <div className="navbar bg-base-100 justify-center">
      <Link className={linkStyle("/")} href="/">
        Home
      </Link>
      <Link className={linkStyle("/connection")} href="/connection">
        Connection
      </Link>
      <Link className={linkStyle("/sign-up")} href="/sign-up">
        Authorization
      </Link>
      <Link className={linkStyle("/login")} href="/login">
        Login
      </Link>
   
    </div>
  );
};

export default NavBar;
