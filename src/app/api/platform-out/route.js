import { NextResponse } from "next/server";
import User from "@/app/lib/user-model";

export const POST = async (req, res) => {
  const { userId, target } = await req.json();

  try {
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      {
        isLinkedinAuth: target === "linkedin" ? false : true,
        isUpWorkAuth: target === "upWork" ? false : true,
      },
      { new: true }
    );
    if (!user) {
      return NextResponse.json(
        { message: "Server Error. Try letter" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: `You successful logout from ${target}` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
