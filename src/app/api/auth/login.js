import { NextResponse } from 'next/server';

export async function POST(req) {
    const { email, code } = await req.json();

    try {
        return NextResponse.json({ message: 'Login successful' });
    } catch (error) {
        return NextResponse.json({ message: 'Invalid code' }, { status: 401 });
    }
}
