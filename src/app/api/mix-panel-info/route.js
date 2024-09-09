const axios = require("axios");
import User from "@/app/lib/user-model";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const from_date = searchParams.get("from_date");
  const to_date = searchParams.get("to_date");
  const userId = searchParams.get("user_id");

  try {
    const user = await User.findById({ _id: userId });

    const url = `https://data-eu.mixpanel.com/api/2.0/export?from_date=${from_date}&to_date=${to_date}`;
    const headers = {
      Accept: "text/plain",
      Authorization: "Basic MWZiYmU0M2ExNmIyY2UzZWE4ZWI1YTZiMDY2MDM5NjU6",
    };

    const response = await axios.get(url, { headers });

    if (!response.status === 200) {
      console.log(response.data);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = response.data
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .filter(
        (elem) =>
          elem.properties.distinct_id === user.email &&
          (elem.event === "REJECT BID" || elem.event === "SEND BID")
      );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch data: ${error.message}` },
      { status: 500 }
    );
  }
}
