import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Scanners from "@/app/lib/up-work-scanners";
import { CronUpWork } from "../services/up-work-cron";
import User from "@/app/lib/user-model";

export const POST = async (req, res) => {
  const { scannerData, userId } = await req.json();

  try {
    const newScanner = await Scanners.create({
      ...scannerData,
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!newScanner) {
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
    const user = await User.findById({ _id: userId });

    if (scannerData.autoBidding) {
      CronUpWork.startScanner(userId, newScanner, user.email);
    }

    return NextResponse.json(
      { message: "Scanner was saved successful", scanner: newScanner },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.nextUrl);
  const taskId = searchParams.get("taskId");

  try {
    const scanners = await Scanners.findOne({ _id: taskId });

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

export const PUT = async (req, res) => {
  const { scannerData, scannerId } = await req.json();
  console.log({ scannerData, scannerId });
  try {
    const updatedScanner = await Scanners.findByIdAndUpdate(
      {
        _id: scannerId,
      },
      {
        ...scannerData,
      },
      { new: true }
    );

    if (!updatedScanner) {
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }

    const user = await User.findById({ _id: updatedScanner.userId });

    if (scannerData.autoBidding) {
      CronUpWork.startScanner(
        updatedScanner.userId.toString(),
        updatedScanner,
        user.email
      );
    } else {
      await CronUpWork.stopScanner(
        updatedScanner.userId.toString(),
        updatedScanner._id
      );
    }

    return NextResponse.json(
      { message: "Add filters", filter: updatedScanner },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const DELETE = async (req, res) => {
  try {
    const { scannerId } = await req.json();

    if (!scannerId) {
      throw new Error("No IDs provided for deletion");
    }

    const deletedScanner = await Scanners.findByIdAndDelete(scannerId);

    if (deletedScanner.autoBidding) {
      await CronUpWork.stopScanner(deletedScanner.userId, deletedScanner._id);
    }

    if (!deletedScanner) {
      throw new Error("Some items were not deleted. Please try again.");
    }

    return NextResponse.json(
      {
        message: `Scanner - ${deletedScanner.scannerName} deleted successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting filters: ", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
