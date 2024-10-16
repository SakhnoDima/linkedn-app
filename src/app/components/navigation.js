"use client";
import React, { useState } from "react";
import { FaHome, FaLinkedin, FaDonate } from "react-icons/fa";
import { FaSquareUpwork } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { motion } from "framer-motion";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const iconSize = "w-[25px] h-[25px] shrink-0";
  const privatePages = [
    {
      icon: <FaSquareUpwork className={iconSize} />,
      page: "UpWork",
      href: "/up-work",
    },
    {
      icon: <FaLinkedin className={iconSize} />,
      page: "Linkedin",
      href: "/linkedin",
    },
    {
      icon: <MdDashboard className={iconSize} />,
      page: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <FaDonate className={iconSize} />,
      page: "Donations",
      href: "/donations",
    },
  ];

  return (
    <nav className="flex w-[200px]">
      <motion.aside
        animate={{ width: isOpen ? "200px" : "60px" }}
        className="flex flex-col "
      >
        <Link
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className={`btn btn-ghost flex flex-row text-xl flex-nowrap justify-start  ${
            pathname === "/" ? "text-blue-500" : ""
          }`}
          href="/"
        >
          <FaHome className={iconSize} />

          {isOpen && <span>Home</span>}
        </Link>
        {!!session && (
          <>
            {privatePages.map((page, index) => (
              <Link
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                key={index}
                className={`btn btn-ghost flex flex-row text-xl flex-nowrap justify-start ${
                  pathname === page.href ? "text-blue-500" : ""
                }`}
                href={page.href}
              >
                {page.icon}
                {isOpen && <span>{page.page}</span>}
              </Link>
            ))}
          </>
        )}
      </motion.aside>
    </nav>
  );
};

export default NavBar;
