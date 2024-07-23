import { Spot } from '@binance/connector';
import { NextResponse } from "next/server";
import QRCode from 'qrcode';


const apiKey = 'Rp2YiaAnK0S4URGDnu2qRvI8II2Sa03ArDs84Qq4JmuUyA6VeoxOwjIyF8QiYpIu';
const apiSecret = 'HcpmuJS82lP9FlPJLqInxykjWDtUH1Q23ZLeLTrOyFdTJnrbNCyZoBuAQ4WtaIDY';

const client = new Spot(apiKey, apiSecret);

export const GET = async (req, res) => {
    try {
        const response = await client.depositAddress('SOL', {network: 'SOL'});
        const address = response.data.address;

        // Генерація QR-коду
        const qrCodeDataURL = await QRCode.toDataURL(address);

        return NextResponse.json({ address, qrCode: qrCodeDataURL }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}