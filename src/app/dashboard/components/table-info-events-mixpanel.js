'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/app/components/button';
import Input from '@/app/components/input';
import Loader from '@/app/components/loader';
import { useToastContext } from '@/app/context/toast-context';
import ItemsInfoEvents from './items-info-events-mixpanel';
import { EventChart } from './event-chart';

const fetchAndParseMixpanelData = async (from_date, to_date, userId) => {
    const url = `/api/mix-panel-info?from_date=${from_date}T00:00:00&to_date=${to_date}T15:15:00&user_id=${userId}`;

    const { data } = await axios.get(url);

    return data;
};

const getCurrentDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatUnixTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const TableInfoEventsMixpanel = ({ userId }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const showToast = useToastContext();

    const handleFetchData = async () => {
        if (!fromDate || !toDate || !userId) {
            showToast('Please select both dates.', 'error');
            return;
        }

        if (new Date(fromDate) > new Date(toDate)) {
            showToast('From date cannot be later than To date.', 'error');
            return;
        }

        setLoading(true);
        fetchAndParseMixpanelData(fromDate, toDate, userId)
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.response.data.error);
                setLoading(false);
                setData([]);
                showToast(error.response.data.error, 'error');
            });
    };

    useEffect(() => {
        const currentDate = getCurrentDate();
        setToDate(currentDate);
        setFromDate(currentDate);
        setLoading(true);
        fetchAndParseMixpanelData(currentDate, currentDate, userId)
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.response.data.error);
                setLoading(false);
                setData([]);
                showToast(error.response.data.error, 'error');
            });
    }, []);

    const onChangeChart = (unixTime) => {
        const currentDate = getCurrentDate();
        const lastTime = Math.floor(Date.now() / 1000);
        const unixTimeInSeconds = Math.floor(unixTime / 1000);
        const differenceDate = formatUnixTime(lastTime - unixTimeInSeconds);

        setToDate(differenceDate);
        setFromDate(currentDate);
        setLoading(true);

        fetchAndParseMixpanelData(currentDate, currentDate, userId)
            .then((result) => {
                setChartData(result);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.response.data.error);
                setLoading(false);
                setChartData([]);
                showToast(error.response.data.error, 'error');
            });
    };

    return (
        <div>
            <div className="mb-4 flex gap-4 items-center justify-center">
                <div>
                    <label>
                        <span className="mr-2">From Date:</span>
                        <Input className="w-[200px]" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    </label>
                    <label>
                        <span className="mr-2"> To Date:</span>
                        <Input className="w-[200px]" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                    </label>
                </div>
                <Button disabled={loading} whileHover={{ scale: 1.2 }} className="btn-sm min-w-[100px]" onClick={handleFetchData}>
                    {loading ? <Loader /> : 'Fetch Data'}
                </Button>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr className="text-center">
                            <th>Event</th>
                            <th>Scanner</th>
                            <th>Freelancer</th>
                            <th>Link</th>
                            <th>Bidding Time</th>
                            <th>Сreated Time</th>
                            <th>Required Connects</th>
                        </tr>
                    </thead>
                    <ItemsInfoEvents data={data} />
                </table>
            </div>

            <EventChart data={chartData} onChangeChart={onChangeChart} />
        </div>
    );
};
