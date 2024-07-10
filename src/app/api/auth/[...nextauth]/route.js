import { NextResponse } from 'next/server';

export async function POST(req) {
    return NextResponse.json({ message: 'Nextauth POST request' });
}

export async function GET(req) {
    return NextResponse.json({ message: 'Nextauth GET request' });
}
