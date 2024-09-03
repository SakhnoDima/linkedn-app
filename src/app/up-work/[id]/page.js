"use client";

import GoBack from "@/app/components/go-back";
import { useToastContext } from "@/app/context/toast-context";
import axios from "axios";
import Link from "next/link";

import { useEffect, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import ScannersForm from "../components/scanner-form";
import { ScannersList } from "../components/scanners-list";
import Button from "@/app/components/button";

const Page = ({ params }) => {
  const { id } = params;
  const showToast = useToastContext();
  const [scanner, setScanner] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserLinkedinTasks = async (id) => {
      try {
        if (!id) {
          return;
        }

        const { data } = await axios.get("/api/scanner", {
          params: {
            taskId: id,
          },
        });

        setScanner(data);
      } catch (error) {
        console.log(error);
        showToast(error.response.data.message, "error");
        return;
      } finally {
        setLoading(false);
      }
    };

    getUserLinkedinTasks(id);
  }, [id]);

  const handBotInit = async () => {
    try {
      const { data } = await axios.post(
        "/api/up-work-filtration",
        {
          _id: scanner._id,
          userId: scanner.userId,
          scannerName: scanner.scannerName,
          autoBidding: scanner.autoBidding,
          searchWords: scanner.searchWords,
          searchFilters: scanner.searchFilters,
          clientParameters: scanner.clientParameters,
          biddingOptions: scanner.biddingOptions,
          coverLetterOptions: scanner.coverLetterOptions,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 600000,
        }
      );

      console.log(data);
    } catch (error) {
      console.log("Error at page:", error);
    }
  };
  const handInfo = async () => {
    try {
      const res = await axios.get("/api/up-work-filtration", {
        params: {
          userId: scanner.userId,
        },
      });

      console.log("Res", res);
    } catch (error) {
      console.log("Error at page:", error);
    }
  };
  return (
    <div>
      <GoBack href="/up-work">
        Go back <RiArrowGoBackFill />
      </GoBack>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <ScannersForm scanner={scanner} actions="edit" />
        </>
      )}
      <Button
        onClick={handBotInit}
        type="submit"
        className="mx-auto w-[50px] bg-indigo-600 hover:bg-indigo-800 rounded-[10px] text-white p-2"
      >
        <p>Login</p>
      </Button>
      <Button
        onClick={handBotInit}
        type="submit"
        className="mx-auto w-[50px] bg-indigo-600 hover:bg-indigo-800 rounded-[10px] text-white p-2"
      >
        <p>Start</p>
      </Button>
      <Button
        onClick={handInfo}
        type="submit"
        className="mx-auto w-[50px] bg-indigo-600 hover:bg-indigo-800 rounded-[10px] text-white p-2"
      >
        <p>Info</p>
      </Button>
    </div>
  );
};

export default Page;
