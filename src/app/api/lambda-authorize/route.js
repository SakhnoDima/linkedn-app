import { NextResponse } from "next/server";
import User from "@/app/lib/user-model";
import dbConnect from "@/app/lib/moongose-connect";

export const POST = async (req, res) => {
  const { login, pass, userId } = await req.json();

  if (!login || !pass || !userId) {
    return NextResponse.json(
      { message: "Credentials is required" },
      { status: 400 }
    );
  }
  try {
    // const isConnected = await fetch('https://qyf4aviui4.execute-api.eu-north-1.amazonaws.com/default/linkedin-crawler', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ password: pass, email: login, id: userId }),
    // });
    // if (!isConnected.ok){
    //     return NextResponse.json({ message: 'User wasn`t authorize in Lambda' }, { status: 500 });
    // }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { isLinkedinAuth: true },
      { new: true, upsert: true, runValidators: true }
    );

  
    return NextResponse.json(
      { message: "User was authorized successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }

};

export const maxDuration = 60; // This function can run for a maximum of 5 seconds
export const dynamic = "force-dynamic";
