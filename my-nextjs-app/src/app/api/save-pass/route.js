import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { pass } = await req.json();

  const filePath = path.join(process.cwd(), "/public/",'passwords.json');
  const passwords ={ password : Number(pass) } ;

  fs.writeFileSync(filePath, JSON.stringify(passwords, null, 2));

  return NextResponse.json({ message: 'Password saved successfully!' });
}
