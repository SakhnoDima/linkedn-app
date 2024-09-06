const axios = require("axios");
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const from_date = searchParams.get("from_date");
  const to_date = searchParams.get("to_date");

  try {
    const url = `https://data-eu.mixpanel.com/api/2.0/export?from_date=${from_date}&to_date=${to_date}&event=%5B%22SEND%20BID%22%5D`;
    const headers = {
      Accept: "text/plain",
      Authorization: "Basic MWZiYmU0M2ExNmIyY2UzZWE4ZWI1YTZiMDY2MDM5NjU6",
    };

    const response = await axios.get(url, { headers });

    //TODO if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    const data = response.data
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: `Failed to fetch data: ${error.message}` },
      { status: 500 }
    );
  }
}
