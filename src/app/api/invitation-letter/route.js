import { NextResponse } from "next/server";
import mongoose from "mongoose";

import LinkedinLetters from "@/app/lib/linkedin-letters-model";
import User from "@/app/lib/user-model";

export const POST = async (req, res) => {
  const { invitationData, userId } = await req.json();

  if (!invitationData.letterText || !userId) {
    return NextResponse.json(
      { message: "Required fields missed" },
      { status: 500 }
    );
  }
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      {
        isGreetingMessage: true,
      }
    );

    const existingLetter = await LinkedinLetters.findOneAndUpdate(
      {
        userId,
        type: "invitation",
      },
      {
        ...invitationData,
      },
      { new: true, upsert: true, runValidators: true }
    );
    if (!existingLetter) {
      const newLetter = await LinkedinLetters.create({
        ...invitationData,
        userId: new mongoose.Types.ObjectId(userId),
        type: "invitation",
      });

      if (!newLetter) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
      }
      return NextResponse.json(
        {
          message: "Invitation letter event was started successful",
          letter: newLetter,
        },
        { status: 200 }
      );
    }
    //TODO запускаємо таску

    return NextResponse.json(
      {
        message: "Invitation letter event was started successful",
        letter: existingLetter,
      },
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
    const letter = await LinkedinLetters.findOne({
      userId,
      type: "invitation",
    });

    if (!letter) {
      return NextResponse.json(
        { message: "Something went wrong" },
        { status: 500 }
      );
    }
    return NextResponse.json(letter);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const DELETE = async (req, res) => {
  const { userId, letterId } = await req.json();

  try {
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        isGreetingMessage: false,
      }
    );
    //TODO тут зупиняємо таску
    //TaskService.stopTask(userId, taskId);

    return NextResponse.json(
      { message: "Letter sender is stopped" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
