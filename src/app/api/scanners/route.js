import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Scanners from "@/app/lib/up-work-scanners";

export const POST = async (req, res) => {
  const { scanner, userId } = await req.json();
  console.log({ scanner, userId });
  try {
    const newScanner = await Scanners.create({
      ...scanner,
      userId: new mongoose.Types.ObjectId(userId),
    });

    console.log(newScanner);
    return NextResponse.json({ message: "Add filters" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
