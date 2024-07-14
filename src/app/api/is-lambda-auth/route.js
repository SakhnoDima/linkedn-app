import { NextResponse } from "next/server";
import User from "@/app/lib/user-model";

export const POST = async (req, res) => {
  const { userId } = await req.json();

  const user = await User.findById({
    _id: userId,
  });

  if (!user) {
    return NextResponse.json(
      {
        isAuth: false,
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      isAuth: user.isLinkedinAuth,
    },
    { status: 200 }
  );
};
