import { NextResponse } from 'next/server';
import User from '@/app/lib/user-model';

export async function POST (req, res) {
  const { userId } = await req.json();
  let password = null;

  while (!password ) {
    try {
      const user = await User.findById(userId);
      await new Promise(resolve => setTimeout(resolve, 1000)); 
     if(user.tempPass)
      password = user.tempPass
    } catch (error) {
      console.error('Error finding user:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
   console.log(password);
  return NextResponse.json( { password } );
}