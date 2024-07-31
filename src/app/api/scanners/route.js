import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Scanners from "@/app/lib/up-work-scanners";

export const POST = async (req, res) => {
  const { scanner, userId } = await req.json();

  try {
    const newScanner = await Scanners.create({
      ...scanner,
      userId: new mongoose.Types.ObjectId(userId),
    });

    return NextResponse.json(
      { message: "Add filters", scanner: newScanner },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.nextUrl);
  const userId = searchParams.get("userId");

  try {
    const scanners = await Scanners.find({ userId });
    if (!scanners) {
      return NextResponse.json(
        { message: "Something went wrong try letter" },
        { status: 500 }
      );
    }
    return NextResponse.json(scanners);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
