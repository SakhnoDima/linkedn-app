import User from "@/app/lib/user-model";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      throw new Error("Password and email is required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: `Email ${email} is already exist` },
        { status: 500 }
      );
    }

    const hashPassword = await hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashPassword,
    });
    return NextResponse.json({
      message: "User was saved",
      userId: newUser._id,
    });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
