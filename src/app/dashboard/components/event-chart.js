"use client";

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const EventChart = ({ data }) => {
  const sendBidData = [];
  const rejectBidData = [];

  console.log(data);

  data.forEach((event) => {
    const date = new Date(event.properties.time * 1000)
      .toISOString()
      .slice(0, 10);
    if (event.event === "SEND BID") {
      sendBidData.push({
        x: event.properties.time * 1000,
        y: 1,
        name: "SEND BID",
      });
    } else if (event.event === "REJECT BID") {
      rejectBidData.push({
        x: event.properties.time * 1000,
        y: 1,
        name: "REJECT BID",
      });
    }
  });
  console.log("sendBidData", sendBidData);
  console.log("rejectBidData", rejectBidData);
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Number of events on date",
    },
    xAxis: {
      type: "datetime",
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Number of events",
      },
    },
    tooltip: {
      formatter: function () {
        return `${this.point.name}: <b>${
          this.y
        }</b> event(s) on ${Highcharts.dateFormat("%Y-%m-%d", this.x)}`;
      },
    },
    series: [
      {
        name: "SEND BID",
        data: sendBidData,
        color: "blue",
        marker: {
          symbol: "circle",
        },
      },
      {
        name: "REJECT BID",
        data: rejectBidData,
        color: "green",
        marker: {
          symbol: "circle",
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
