import { NextResponse } from "next/server";
import LinkedinCompletedTasks from "@/app/lib/linkedin-tasks-model";
import { PAGE_LIMIT } from "../linkedin-filters/route";

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.nextUrl);
  const userId = searchParams.get("userId");
  const page = searchParams.get("page");
  try {
    const totalCount = await LinkedinCompletedTasks.countDocuments({
      userId: userId,
    });

    const filters = await LinkedinCompletedTasks.find({ userId: userId })
      .sort({ _id: -1 })
      .limit(PAGE_LIMIT * 1)
      .skip((page - 1) * PAGE_LIMIT)
      .exec();

    if (!filters) {
      return NextResponse.json(
        { message: "Something went wrong try letter" },
        { status: 500 }
      );
    }
    return NextResponse.json({
      results: filters,
      totalPages: Math.ceil(totalCount / PAGE_LIMIT),
    });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Server Error" },
      { status: 500 }
    );
  }
};
