import { NextResponse } from 'next/server';
import User from '@/app/lib/user-model';
import dbConnect from '@/app/lib/moongose-connect';

export const POST = async (req, res) => {
  const {login, pass} = await req.json();

  await dbConnect();

  let userId;

  try {
    const updatedUser = await User.findOneAndUpdate(
        { linkedinLogin: login },
        { linkedinLogin: login, linkedinPass: pass },
        { new: true, upsert: true, runValidators: true }
      );
    
      userId = updatedUser._id

    if(!updatedUser){
        const newUser = await User.create({
            linkedinLogin : login,
            linkedinPass : pass  });
        
        userId = newUser._id
    }

  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
 
  return NextResponse.json({ 
    userId
  }, { status: 200 });
};