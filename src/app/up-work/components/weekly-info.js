"use client";
import Button from "@/app/components/button";
import Loader from "@/app/components/loader";
import { useToastContext } from "@/app/context/toast-context";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const addToLocalStorage = (id) => {
  let ids = JSON.parse(localStorage.getItem("weekly-info")) || [];
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem("weekly-info", JSON.stringify(ids));
  }
};
const removeFromLocalStorage = (id) => {
  let ids = JSON.parse(localStorage.getItem("weekly-info")) || [];
  ids = ids.filter((item) => item !== id);
  localStorage.setItem("weekly-info", JSON.stringify(ids));
};
const isIdInLocalStorage = (id) => {
  let ids = JSON.parse(localStorage.getItem("weekly-info")) || [];
  return ids.includes(id);
};

const WeeklyInfo = ({ active, scanner }) => {
  const [availableVacancies, setAvailableVacancies] = useState(
    active ? scanner.weeklyStatus : null
  );
  const [loading, setLoading] = useState(false);
  const showToast = useToastContext();
  useEffect(() => {
    let interval;
    if (active) {
      console.log(scanner._id);

      const isWeeklyLoading = isIdInLocalStorage(scanner._id);

      if (isWeeklyLoading) {
        setLoading(true);
        interval = setInterval(async () => {
          try {
            const response = await axios.get("/api/scanner/status", {
              params: {
                taskId: scanner._id,
              },
            });

            if (
              response.data.weeklyStatus === 0 ||
              response.data.weeklyStatus
            ) {
              console.log(
                `Status is ${response.data.weeklyStatus}, stopping checks`
              );

              clearInterval(interval);
              setLoading(false);
              setAvailableVacancies(response.data.weeklyStatus);
              removeFromLocalStorage(scanner._id);
            } else {
              console.log(`From LS Status is false. Waiting result...`);
            }
          } catch (error) {
            clearInterval(interval);
            setLoading(false);
            removeFromLocalStorage(scanner._id);
            console.error("Error checking connection status:", error);
          }
        }, 10000);
      }
    }
    return () => {
      if (active) {
        clearInterval(interval);
      }
    };
  }, []);

  const handleGetWeeklyResults = async (scanner) => {
    setLoading(true);

    await axios
      .get("/api/scanner/info", {
        params: {
          taskId: scanner._id,
        },
      })
      .then((res) => {
        console.log("Initial request successful:", res.data);
        addToLocalStorage(scanner._id);
        const interval = setInterval(async () => {
          try {
            const response = await axios.get("/api/scanner/status", {
              params: {
                taskId: scanner._id,
              },
            });

            if (response.data.error) {
              console.log(response.data.error);
              showToast("Server error, try agin letter", "error");
              clearInterval(interval);
              setLoading(false);
              removeFromLocalStorage(scanner._id);
            } else if (
              response.data.weeklyStatus === 0 ||
              response.data.weeklyStatus ||
              response.data.error
            ) {
              console.log(
                `Status is ${response.data.weeklyStatus}, stopping checks`
              );

              clearInterval(interval);
              setLoading(false);
              setAvailableVacancies(response.data.weeklyStatus);
              removeFromLocalStorage(scanner._id);
            } else {
              console.log(`From LS Status is false. Waiting result...`);
            }
          } catch ({ response }) {
            clearInterval(interval);
            setLoading(false);
            removeFromLocalStorage(scanner._id);
            console.log(response.data.message);
            showToast(response.data.message, "error");
          }
        }, 10000);
      })
      .catch(({ response }) => {
        setLoading(false);
        showToast(response.data.message || "Server error", "error");
      });
  };

  return (
    <div className="mt-[10px]">
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-lg">Scanner relevance</span>
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
            {loading ? (
              <p>
                Checking available vacancies for the previous 7 days{" "}
                <Loader className="ml-4" />
              </p>
            ) : (
              <>
                {scanner?.weeklyStatus ||
                availableVacancies ||
                availableVacancies === 0 ? (
                  <>
                    <p>Your last checking result is:</p>
                    <span>{scanner?.weeklyStatus || availableVacancies}</span>
                  </>
                ) : (
                  <p>Try to check your scanner</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyInfo;
