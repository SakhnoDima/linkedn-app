import { NextResponse } from "next/server";

export async function GET(req, res) {
  const SECRET_KEY = process.env.SECRET_KEY;

  const url = "https://mixpanel.com/api/2.0/segmentation";

  try {
    const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Basic " + Buffer.from(SECRET_KEY).toString("base64"),
        },
      });

      const data = await response.json();

      console.log(data);
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  } catch (error) {
    
  }
 

return NextResponse.json({ message: "Ok" });
}
