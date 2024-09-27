import { NextResponse } from "next/server";
import LinkedinCompletedTasks from "@/app/lib/linkedin-tasks-model";

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.nextUrl);
  const userId = searchParams.get("userId");
  try {
    const results = await LinkedinCompletedTasks.find({ userId });

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Server Error" },
      { status: 500 }
    );
  }
};
