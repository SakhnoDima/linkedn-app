import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    const { email } = await req.json();

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your verification code',
        text: `Your verification code is ${code}`,
    };

    try {
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Code sent successfully' });
    } catch (error) {
        console.error('Error sending email: ', error);
        return NextResponse.json({ message: 'Failed to send code' }, { status: 500 });
    }
}
