import { Spot } from '@binance/connector';
import { NextResponse } from "next/server";
import QRCode from 'qrcode';

const apiKey = process.env.NEXT_PUBLIC_BINANCE_API_KEY;
const apiSecret = process.env.NEXT_PUBLIC_BINANCE_SECRET_KEY;

const client = new Spot(apiKey, apiSecret);

export const GET = async (req, res) => {
    const { searchParams } = new URL(req.nextUrl);
    const coin = searchParams.get("coin");
    const network = searchParams.get("network");

    try {
        const response = await client.depositAddress(coin, {network: network});
        const address = response.data.address;

        const qrCodeDataURL = await QRCode.toDataURL(address);

        return NextResponse.json({ address, qrCode: qrCodeDataURL }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}