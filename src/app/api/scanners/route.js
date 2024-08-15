import { NextResponse } from "next/server";
import Scanners from "@/app/lib/up-work-scanners";

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
