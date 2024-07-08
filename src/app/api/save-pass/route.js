import { NextResponse } from 'next/server';
import User from '@/app/lib/user-model';

export async function POST(req) {
  try {
    const { pass, userLogin } = await req.json();

    console.log(pass);
    console.log(userLogin);

    if (!pass || !userLogin) {
      return NextResponse.json({ message: 'Password and userLogin are required' }, { status: 400});
    }

    const user = await User.findOne({ linkedinLogin: userLogin });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    user.tempPass = pass;
    await user.save();

    return NextResponse.json({ message: 'Password saved successfully!', user });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export const maxDuration = 120; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';