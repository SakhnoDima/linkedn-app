"use client";
import Button from "@/app/components/button";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const WeeklyInfo = ({ active, scanner }) => {
  const [availableVacancies, setAvailableVacancies] = useState(null);

  const handleGetWeeklyResults = async (scanner) => {
    const { data } = await axios.get("/api/scanner/info", {
      params: {
        taskId: scanner._id,
      },
    });
    console.log(data);
    // TODO setAvailableVacancies() сюди покласти результат
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
            className="border border-white hover:border-white"
            type="button"
            onClick={() => handleGetWeeklyResults(scanner)}
          >
            <span>Check</span>
          </Button>
          <div>
            <p>
              Here you`ll see weekly available result:
              <span>{availableVacancies}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyInfo;
