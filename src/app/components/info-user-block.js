"use client";
import { FaCheck, FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { useSession } from "next-auth/react";

import Button from "./button";
import Loader from "./loader";
import {FaRegCopy} from "react-icons/fa6";

const itemsClasses = "flex gap-2 items-center justify-between";
const itemStyle = "whitespace-nowrap font-bold";
const after =
    "after:content-[''] after:block after:absolute after:top-[-10px] after:left-0 after:w-full after:h-[10px]";
const before =
    "before:content-[''] before:w-[12px] before:h-[10px] before:block before:absolute before:top-[-7px] before:left-[115px] before:border-2 before:bg-white before:border-r-0 before:border-t-0 before:transform before:-translate-x-1/2 before:rotate-[135deg]";

const InfoUserBlock = () => {
  const [loading, setLoading] = useState(false);
  const { data: session, update } = useSession();
  const [tooltipText, setTooltipText] = useState("Click to copy");

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

  const handleInitTelegramNotifications = async (target) => {
    try {
      setLoading(target);
      const { data } = await axios.get("/api/init-telegram-note", {
        params: {
          userId: session.user.id,
        },
      });
      update({
        ...session,
        user: { ...session.user, isTelegramNotifications: "update" },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const tooltipClick = async () => {
    try {
      await navigator.clipboard.writeText(session.user.id);
      await setTooltipText("Copied!");
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <div className="relative group dropdown dropdown-hover">
      <FaRegUserCircle
        size={30}
        tabIndex={0}
        role="button"
        className="hover:fill-main-blue m-1"
      />
      <div
          tabIndex={0}
          className={`dropdown-content absolute z-[1] top-[40px] left-[-100px] border-2 rounded-lg bg-white px-2 py-4 ${after} ${before}`}
      >
        <ul className="flex flex-col gap-4">
          <li className={itemsClasses}>
            <p className={itemStyle}>User email:</p>
            <p>{session.user.email}</p>
          </li>
          <li className={itemsClasses}>
            <p className={itemStyle}>User id:</p>
            <div className="tooltip" data-tip={tooltipText}>
              <button className="btn w-[130px] flex flex-nowrap" onClick={tooltipClick}>
                <FaRegCopy
                    size={35}
                />
                <span className="text-ellipsis overflow-hidden ...">{session.user.id}</span>
              </button>
            </div>
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
              className="min-h-8 h-8 w-[50px]"
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
              className="min-h-8 h-8 w-[50px]"
              onClick={() => handleClick("upWork")}
            >
              {loading === "upWork" ? <Loader /> : "Out"}
            </Button>
          </li>
          <li className={itemsClasses}>
            <div className={itemsClasses}>
              <p className={itemStyle}>Telegram:</p>
              <FaCheck
                className={`${
                  session.user.isTelegramNotifications
                    ? "fill-green-600"
                    : "fill-red-500"
                }`}
              />
            </div>
            <Button
              disabled={loading}
              className="min-h-8 h-8 w-[50px]"
              onClick={() => handleInitTelegramNotifications("telegram")}
            >
              {loading === "telegram" ? (
                <Loader />
              ) : session.user.isTelegramNotifications ? (
                "Off"
              ) : (
                "On"
              )}
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InfoUserBlock;
