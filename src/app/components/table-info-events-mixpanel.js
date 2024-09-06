"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const fetchAndParseMixpanelData = async (from_date, to_date) => {
  const url = `/api/mix-panel-info?from_date=${from_date}&to_date=${to_date}`;

  const { data } = await axios.get(url);

  return data;
};

export const TableInfoEventsMixpanel = () => {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [error, setError] = useState("");

  const handleFetchData = async () => {
    if (!fromDate || !toDate) {
      setError("Please select both dates.");
      return;
    }

    if (new Date(fromDate) > new Date(toDate)) {
      setError("From date cannot be later than To date.");
      return;
    }

    try {
      const result = await fetchAndParseMixpanelData(fromDate, toDate);
      setData(result);
    } catch (error) {
      setError(`Failed to fetch data: ${error.message}`);
    }
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
    setToDate(currentDate);
    setFromDate(currentDate);

    fetchAndParseMixpanelData(currentDate, currentDate).then((result) => {
      setData(result);
    });
  }, []);

  return (
    <div className="scanner-breakdown">
      <h2>Scanner Breakdown</h2>
      <div className="date-selection">
        <label>
          From Date:
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </label>
        <label>
          To Date:
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </label>

        <button onClick={handleFetchData}>Fetch Data</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="data-list">
        <div className="data-header">
          <span>Event</span>
          <span>Link</span>
          <span>User id</span>
          <span>Freelancer</span>
          <span>Required Connects</span>
        </div>

        <div className="data-body">
          {data.map((item, index) => (
            <div key={index} className="data-row">
              <span>{item.event}</span>
              <span>
                <a href={item.properties.targetLink}>
                  {item.properties.targetLink}
                </a>
              </span>
              <span>{item.properties.$user_id}</span>
              <span>{item.properties.freelancer}</span>
              <span>{item.properties.requiredConnects}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
