"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import Button from "@/app/components/button";
import Input from "@/app/components/input";
import Loader from "@/app/components/loader";
import { useToastContext } from "@/app/context/toast-context";
import { EventChart } from "./event-chart";
import { UpWorkTasksTable } from "./up-work-tasks-table";
import { useAddQueryParams } from "@/app/hooks/useAddQueryParams";

const LIMIT = 10;

const fetchAndParseMixpanelData = async (from_date, to_date, userId) => {
  const url = `/api/mix-panel-info?from_date=${from_date}T00:00:00&to_date=${to_date}T15:15:00&user_id=${userId}`;

  const { data } = await axios.get(url);

  return data;
};

export const TableInfoEventsMixpanel = ({ userId }) => {
  const addQueryParams = useAddQueryParams();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(+searchParams.get("page-up-work") || 1);
  const [totalPage, setTotalPage] = useState(null);

  const showToast = useToastContext();

  const handleFetchData = async () => {
    if (!fromDate || !toDate || !userId) {
      showToast("Please select both dates.", "error");
      return;
    }
    addQueryParams({ fromDate, toDate });
    if (new Date(fromDate) > new Date(toDate)) {
      showToast("From date cannot be later than To date.", "error");
      return;
    }

    setLoading(true);
    fetchAndParseMixpanelData(fromDate, toDate, userId)
      .then((result) => {
        setData(result);
        console.log(result.length);
        setTotalPage(Math.floor(result.length / LIMIT));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setLoading(false);
        setData([]);
        showToast(error.response.data.error, "error");
      });
  };

  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();

      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const currentDate = getCurrentDate();
    setToDate(searchParams.get("toDate") || currentDate);
    setFromDate(searchParams.get("fromDate") || currentDate);
    setLoading(true);
    fetchAndParseMixpanelData(
      searchParams.get("fromDate") || currentDate,
      searchParams.get("toDate") || currentDate,
      userId
    )
      .then((result) => {
        setData(result);

        setTotalPage(Math.floor(result.length / LIMIT));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setLoading(false);
        setData([]);
        showToast(error.response.data.error, "error");
      });
  }, []);

  return (
    <div>
      <div className="mb-4 flex gap-4 items-center justify-center">
        <div>
          <label>
            <span className="mr-2">From Date:</span>
            <Input
              className="w-[200px]"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label>
            <span className="mr-2"> To Date:</span>
            <Input
              className="w-[200px]"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
        </div>
        <Button
          disabled={loading}
          whileHover={{ scale: 1.2 }}
          className="btn-sm min-w-[100px]"
          onClick={handleFetchData}
        >
          {loading ? <Loader /> : "Fetch Data"}
        </Button>
      </div>
      <div className="overflow-x-auto">
        <EventChart data={data} />
        <UpWorkTasksTable
          data={data.slice((page - 1) * 10, page * 10)}
          totalPage={totalPage}
          currentPage={page}
          setCurrentPage={setPage}
          loading={loading}
        />
      </div>
    </div>
  );
};
