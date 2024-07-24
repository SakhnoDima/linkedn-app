import { Spot } from '@binance/connector';
import { NextResponse } from "next/server";

const apiKey = 'Rp2YiaAnK0S4URGDnu2qRvI8II2Sa03ArDs84Qq4JmuUyA6VeoxOwjIyF8QiYpIu';
const apiSecret = 'HcpmuJS82lP9FlPJLqInxykjWDtUH1Q23ZLeLTrOyFdTJnrbNCyZoBuAQ4WtaIDY';

const client = new Spot(apiKey, apiSecret);

export const GET = async (req, res) => {
    console.log('start')
    try {
        const response = await client.coinInfo();
        const currency = 'USDT';

        return NextResponse.json({ response }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
};