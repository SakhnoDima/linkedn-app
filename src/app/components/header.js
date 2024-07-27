"use client";

import { useSession } from "next-auth/react";
import { MdLogin } from "react-icons/md";
import Link from "next/link";
import LogOut from "./log-out";
import Image from "next/image";

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="px-[80px] py-2 border-b-2">
      <div>
        <Image src="/public/lighthouse.svg" width={35} height={35} />
      </div>
      <div>
        {!session ? (
          <>
            <Link className="btn btn-ghost text-xl" href="/login">
              <p>Login</p>
              <MdLogin />
            </Link>
          </>
        ) : (
          <LogOut />
        )}
      </div>
    </header>
  );
};

export default Header;
