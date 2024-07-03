import { NextApiRequest, NextApiResponse } from 'next';
import handlePuppeteerTask from "../../../../puppeteerHandler"

export default async function handler(req = NextApiRequest, res = NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;
    console.log(message);

    try {
      await handlePuppeteerTask();
      res.status(200).json({ resMess: "Ok" });
    } catch (error) {
      console.error("Error handling Puppeteer task:", error);
      res.status(500).json({ error: "Error handling Puppeteer task" });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
