import { NextResponse } from 'next/server';


export const POST = async (req, res) => {
  const reqBody = await req.json();
  console.log(reqBody);
  return NextResponse.json({ message: 'Hello from POST!' });
};