import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const filePath = path.join(process.cwd(), "/public/", 'passwords.json');

  const readFile = async () => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  };

  let fileContent;

  while (true) {
    try {
      fileContent = await readFile();
      if (fileContent) {
        break;
      }
    } catch (error) {
      console.error('Error reading file:', error);
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  const password = JSON.parse(fileContent);
  return NextResponse.json(password);
}
