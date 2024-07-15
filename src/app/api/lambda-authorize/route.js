import { NextResponse } from "next/server";
import User from "@/app/lib/user-model";
import axios from "axios";

export const POST = async (req, res) => {
  const { login, pass, userId } = await req.json();

  if (!login || !pass || !userId) {
    return NextResponse.json(
      { message: "Credentials is required" },
      { status: 400 }
    );
  }
  try {
    
    // const isConnected = await axios.post(
    //   'https://5yd7a3dfj0.execute-api.eu-north-1.amazonaws.com/default/apiTest',
    //   {
    //     password: pass,
    //     email: login,
    //     id: userId
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     timeout: 600000 
    //   }
    // );

    // // //TODO шукати причину чого не можемо дочекатися відповіді

    // console.log(isConnected.data);
    // if (!isConnected.status === 200){
    //     return NextResponse.json({ message: 'User wasn`t authorize in Lambda' }, { status: 500 });
    // }

   await User.findOneAndUpdate(
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

// export const maxDuration = 60; // This function can run for a maximum of 5 seconds
// export const dynamic = "force-dynamic";
