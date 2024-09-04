"use client";
import Button from "@/app/components/button";
import Loader from "@/app/components/loader";
import axios from "axios";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const WeeklyInfo = ({ active, scanner }) => {
  const [availableVacancies, setAvailableVacancies] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetWeeklyResults = async (scanner) => {
    setLoading(true);
    await axios.get("/api/scanner/info", {
      params: {
        taskId: scanner._id,
      },
    });

    const interval = setInterval(async () => {
      try {
        const response = await axios.get("/api/scanner/status", {
          params: {
            taskId: scanner._id,
          },
        });

        if (response.data.weeklyStatus) {
          console.log(
            `Status is ${response.data.weeklyStatus}, stopping checks`
          );

          clearInterval(interval);
          setLoading(false);
          setAvailableVacancies(response.data.weeklyStatus);
        } else {
          console.log(
            `Status is ${response.data.weeklyStatus}. Waiting result...`
          );
        }
      } catch (error) {
        clearInterval(interval);
        setLoading(false);
        console.error("Error checking connection status:", error);
      }
    }, 10000);
  };
  return (
    <div className="mt-4">
      <div className="flex items-center space-x-2 mb-2">
        <span>Scanner relevance</span>
        <div
          className="tooltip"
          data-tip={
            "Check the relevance of the scanner for vacancies for the past week. The function is active after saving the scanner"
          }
        >
          <AiOutlineQuestionCircle className="hover:cursor-pointer" />
        </div>
      </div>
      {active && (
        <div className="flex items-center gap-5">
          <Button
            disabled={loading}
            className="border border-white hover:border-white"
            type="button"
            onClick={() => handleGetWeeklyResults(scanner)}
          >
            <span>Check</span>
          </Button>
          <div className="flex gap-4 items-center">
            <p>Here you`ll see weekly available result:</p>
            <span>{loading ? <Loader /> : availableVacancies}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyInfo;
