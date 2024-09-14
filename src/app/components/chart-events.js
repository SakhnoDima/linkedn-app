'use client';

import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const timeIntervals = {
    '1h': 3600 * 1000,
    '3h': 3 * 3600 * 1000,
    '1d': 24 * 3600 * 1000,
    '3d': 3 * 24 * 3600 * 1000,
    '7d': 7 * 24 * 3600 * 1000,
};

export const EventChart = ({ data }) => {
    const [selectedInterval, setSelectedInterval] = useState('1h');

    const now = Date.now();

    const filterDataByInterval = (events, interval) => {
        return events.filter((event) => now - event.properties.time * 1000 <= interval);
    };

    const filteredData = filterDataByInterval(data, timeIntervals[selectedInterval]);

    const groupDataByTime = (events) => {
        const groupedEvents = {};

        events.forEach((event) => {
            const roundedTime = Math.floor((event.properties.time * 1000) / (60 * 60 * 1000)) * (60 * 60 * 1000); // Округляем до часа
            if (!groupedEvents[roundedTime]) {
                groupedEvents[roundedTime] = { 'SEND BID': 0, 'REJECT BID': 0 };
            }
            groupedEvents[roundedTime][event.event] += 1;
        });

        const sendBidData = [];
        const rejectBidData = [];

        Object.keys(groupedEvents).forEach((time) => {
            sendBidData.push({ x: parseInt(time), y: groupedEvents[time]['SEND BID'] });
            rejectBidData.push({ x: parseInt(time), y: groupedEvents[time]['REJECT BID'] });
        });

        return { sendBidData, rejectBidData };
    };

    const { sendBidData, rejectBidData } = groupDataByTime(filteredData);

    const options = {
        chart: {
            type: 'line',
        },
        title: {
            text: 'Event count over time',
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date',
            },
            min: now - timeIntervals[selectedInterval],
            max: now,
        },
        yAxis: {
            title: {
                text: 'Number of events',
            },
            allowDecimals: false,
            min: 0,
            tickInterval: 1,
        },
        tooltip: {
            formatter: function () {
                return `${this.series.name}: <b>${this.y}</b> events on ${Highcharts.dateFormat('%Y-%m-%d %H:%M', this.x)}`;
            },
        },
        series: [
            {
                name: 'SEND BID',
                data: sendBidData,
                color: 'blue',
                marker: {
                    symbol: 'circle',
                },
            },
            {
                name: 'REJECT BID',
                data: rejectBidData,
                color: 'green',
                marker: {
                    symbol: 'circle',
                },
            },
        ],
    };

    return (
        <div>
            <div>
                <label htmlFor="time-interval">Select Time Interval: </label>
                <select id="time-interval" value={selectedInterval} onChange={(e) => setSelectedInterval(e.target.value)}>
                    <option value="1h">1 Hour</option>
                    <option value="3h">3 Hours</option>
                    <option value="1d">1 Day</option>
                    <option value="3d">3 Days</option>
                    <option value="7d">7 Days</option>
                </select>
            </div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};
