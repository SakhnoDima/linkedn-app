import { NextResponse } from "next/server";
import axios from "axios";
import { transformQuery } from "../helpers";
import User from "@/app/lib/user-model";

export const POST = async (req, res) => {
  try {
    const {
      _id,
      userId,
      scannerName,
      autoBidding,
      searchWords,
      searchFilters,
      clientParameters,
      biddingOptions,
      coverLetterOptions,
    } = await req.json();

    const user = await User.findById({ _id: userId });

    console.log(user);

    searchFilters.category = searchFilters.category
      .split(" | ")
      .map((item) => item.trim());

    searchFilters.clientLocation = searchFilters.clientLocation
      .split(" | ")
      .map((item) => item.trim());

    console.log("!!! START BID !!!");

    // console.log({
    //   _id: _id,
    //   userId: userId,
    //   userEmail: user.email,
    //   scannerName,
    //   autoBidding,
    //   searchWords: transformQuery(
    //     searchWords.includeWords,
    //     searchWords.excludeWords
    //   ),
    //   searchFilters,
    //   clientParameters,
    //   biddingOptions,
    //   coverLetterOptions,
    // });

    // const response = await axios.post("http://localhost:3001/upwork", {
    //   _id: _id,
    //   userId: userId,
    //   userEmail: user.email,
    //   scannerName,
    //   autoBidding,
    //   searchWords: transformQuery(
    //     searchWords.includeWords,
    //     searchWords.excludeWords
    //   ),
    //   searchFilters,
    //   clientParameters,
    //   biddingOptions,
    //   coverLetterOptions,
    // });

    // console.log(response.data);

    // return NextResponse.json({ message: response.data }, { status: 200 });

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    console.log("Error at API:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
