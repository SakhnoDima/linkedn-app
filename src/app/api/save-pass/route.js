import { NextResponse } from 'next/server';
import User from '@/app/lib/user-model';


export async function POST(req) {
    try {
        const { code, userId } = await req.json();
        console.log(req.headers);
        if (!code || !userId) {
            return NextResponse.json({ message: 'Password and userId are required' }, { status: 400 });
        }

        const user = await User.findOne({_id : userId});

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        user.tempPass = code;
        await user.save();

        return NextResponse.json({ message: 'Password saved successfully!'});
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export const maxDuration = 60; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';
