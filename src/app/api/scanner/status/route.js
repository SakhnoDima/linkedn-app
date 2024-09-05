import { NextResponse } from "next/server";
import Scanners from "@/app/lib/up-work-scanners";
import axios from "axios";
import User from "@/app/lib/user-model";

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.nextUrl);
  const taskId = searchParams.get("taskId");
  try {
    const scannerData = await Scanners.findOne({ _id: taskId });
    console.log("In status", scannerData.weeklyStatus);
    console.log("id", taskId);

    if (!scannerData) {
      return NextResponse.json(
        { message: "Scanner did`nt find" },
        { status: 500 }
      );
    }

    return NextResponse.json({ weeklyStatus: scannerData.weeklyStatus });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
