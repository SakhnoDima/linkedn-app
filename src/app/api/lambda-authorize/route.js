import { NextResponse } from 'next/server';
import User from '@/app/lib/user-model';
import dbConnect from '@/app/lib/moongose-connect';

export const POST = async (req, res) => {
  const {login, pass, userId} = await req.json();

  console.log(login);
  console.log(pass);
  console.log(userId);

  // const existingUser = await User.findOne({linkedinLogin : login})

  // if(existingUser){
  //   console.log(existingUser);
  //   return NextResponse.json({ message: 'This email already exist' });
  // }

  // const newUser = await User.create({
  //   linkedinLogin : login,
  //   linkedinPass : pass  });

  // if (!newUser) {
  //   return NextResponse.json({ message: 'Something went wrong try later' });
  // }

  console.log("Send request to lambda");

  return NextResponse.json({ 
    message: 'User was saved and login', 
  });
};