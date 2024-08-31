"use client";
import { FaCheck, FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";

import Button from "./button";
import Loader from "./loader";

const itemsClasses = "flex gap-2 items-center justify-between";
const itemStyle = "whitespace-nowrap font-bold";
const after =
  "after:content-[''] after:block after:absolute after:top-[-10px] after:left-0 after:w-full after:h-[10px]";
const before =
  "before:content-[''] before:w-[12px] before:h-[10px] before:block before:absolute before:top-[-7px] before:left-[115px] before:border-2 before:bg-white before:border-r-0 before:border-t-0  before:transform before:transform before:-translate-x-1/2 before:rotate-[135deg]";

const InfoUserBlock = () => {
  const [loading, setLoading] = useState(false);
  const { data: session, update } = useSession();

  const handleClick = async (target) => {
    try {
      setLoading(target);
      await axios.post("api/platform-out", {
        userId: session.user.id,
        target,
      });

      if (target === "linkedin") {
        update({
          ...session,
          user: { ...session.user, isLinkedinAuth: "update" },
        });
      } else {
        update({
          ...session,
          user: { ...session.user, isUpWorkAuth: "update" },
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative group">
      <FaRegUserCircle
        size={30}
        className="hover:fill-main-blue hover:cursor-pointer"
      />
      <div
        className={`hidden absolute z-[1] top-[40px] left-[-100px] border-2 rounded-lg bg-white px-2 py-4 group-hover:block ${after} ${before}`}
      >
        <ul className="flex flex-col gap-4">
          <li className={itemsClasses}>
            <p className={itemStyle}>User email:</p> <p>{session.user.email}</p>
          </li>
          <li className={itemsClasses}>
            <p className={itemStyle}>User id:</p>
            <p>{session.user.id}</p>
          </li>
          <li className={itemsClasses}>
            <div className={itemsClasses}>
              <p className={itemStyle}>Linkedin:</p>
              <FaCheck
                className={`${
                  session.user.isLinkedinAuth
                    ? "fill-green-600"
                    : "fill-red-500"
                }`}
              />
            </div>
            <Button
              disabled={loading || !session.user.isLinkedinAuth}
              className="min-h-8 h-8"
              onClick={() => handleClick("linkedin")}
            >
              {loading === "linkedin" ? <Loader /> : "Out"}
            </Button>
          </li>
          <li className={itemsClasses}>
            <div className={itemsClasses}>
              <p className={itemStyle}>UpWork:</p>
              <FaCheck
                className={`${
                  session.user.isUpWorkAuth ? "fill-green-600" : "fill-red-500"
                }`}
              />
            </div>
            <Button
              disabled={loading || !session.user.isUpWorkAuth}
              className="min-h-8 h-8"
              onClick={() => handleClick("upWork")}
            >
              {loading === "upWork" ? <Loader /> : "Out"}
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InfoUserBlock;
