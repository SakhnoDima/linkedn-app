import { NextResponse } from 'next/server';
import User from '@/app/lib/user-model';
import dbConnect from '@/app/lib/moongose-connect';

export async function POST(req, res) {
    await dbConnect();
    const { userId } = await req.json();
    let password = null;
    console.log(userId);
    while (!password) {
        try {
            const user = await User.findById(userId);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (user.tempPass) password = user.tempPass;
        } catch (error) {
            console.error('Error finding user:', error);
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }
    }
    console.log(password);
    return NextResponse.json({ password });
}

export const maxDuration = 60; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';
