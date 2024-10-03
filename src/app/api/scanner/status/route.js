import { NextResponse } from "next/server";
import Scanners from "@/app/lib/up-work-scanners";
import { error } from "console";

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("taskId");
  try {
    const scannerData = await Scanners.findOne({ _id: taskId });

    if (!scannerData) {
      return NextResponse.json(
        { message: "Scanner did`nt find" },
        { status: 500 }
      );
    }

    if (scannerData.error) {
      console.log("Error in scanner status", scannerData.error);
      return NextResponse.json(
        { message: "Server error, try again letter " },
        { status: 500 }
      );
    }

    return NextResponse.json({ weeklyStatus: scannerData.weeklyStatus });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
