import { Spot } from '@binance/connector';
import { NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_BINANCE_API_KEY;
const apiSecret = process.env.NEXT_PUBLIC_BINANCE_SECRET_KEY;

const client = new Spot(apiKey, apiSecret);

export const GET = async (req, res) => {
    const { searchParams } = new URL(req.nextUrl);
    const coin = searchParams.get("coin");

    try {
        const response = await client.coinInfo();
        const currencyInfo = response.data.find(item => item.coin === coin);

        return NextResponse.json({ currencyInfo }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
};