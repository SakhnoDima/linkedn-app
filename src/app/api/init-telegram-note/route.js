import { NextResponse } from "next/server";
import User from "@/app/lib/user-model";
import { CronUpWork } from "../services/up-work-cron";

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.nextUrl);
  const userId = searchParams.get("userId");

  try {
    const user = await User.findById({ _id: userId });

    console.log("start telegram", user);

    if (!user.isTelegramNotifications) {
      await CronUpWork.startTelegramNotification(userId);
    } else {
      await CronUpWork.stopScanner(userId, userId);
    }

    await User.findByIdAndUpdate(
      { _id: userId },
      {
        isTelegramNotifications: !user.isTelegramNotifications,
      },
      { new: true }
    );
    if (!user) {
      return NextResponse.json(
        { message: "Server Error. Try letter" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    console.log("Error at API:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
