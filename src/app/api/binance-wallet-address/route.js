import { Spot } from '@binance/connector';
import { NextResponse } from "next/server";


export const GET = async (req, res) => {
    const { values, userId } = await req.json();

    const apiKey = process.env.NEXT_PUBLIC_BINANCE_API_KEY;
    const apiSecret = process.env.NEXT_PUBLIC_BINANCE_SECRET_KEY;
    console.log(apiKey)
    console.log(apiSecret)
    const client = new Spot(apiKey, apiSecret);

    try {
        const response = await client.depositAddress({
            coin: 'BNB',
            network: 'BSC' // або інша мережа, якщо потрібно
        });
        return NextResponse.json({response}, {status: 200})

    } catch (error) {
        console.error(error);
        // res.status(500).json({ message: 'Error fetching deposit address' });
        return NextResponse.json({status: 500}, {message: error.message})

    }
}