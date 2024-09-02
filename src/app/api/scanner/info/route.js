import { NextResponse } from "next/server";
import Scanners from "@/app/lib/up-work-scanners";
import axios from "axios";
import { transformQuery } from "../../helpers";
import User from "@/app/lib/user-model";

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.nextUrl);
  const taskId = searchParams.get("taskId");

  const scannerData = await Scanners.findOne({ _id: taskId });

  if (!scannerData) {
    return NextResponse.json(
      { message: "Scanner did`nt find" },
      { status: 500 }
    );
  }
  const user = await User.findById({ _id: taskId.userId });

  // TODO Тут ми робимо запит на лямду який повторить пошук вакансій за попередній тиждень та поверне кількість
  //   const { data } = await axios.post("http://localhost:3001/weekly-result", {
  //     key: "upWork",
  //     id: scannerData.userId,
  //     taskId: scannerData._id,
  //     userEmail: user.email,
  //     scannerName: scannerData.scannerName,
  //     autoBidding: scannerData.autoBidding,
  //     searchWords: transformQuery(
  //       scannerData.searchWords.includeWords,
  //       scannerData.searchWords.excludeWords
  //     ),
  //     searchFilters: {
  //       ...scannerData.searchFilters,
  //       category:
  //         scannerData.searchFilters.category.length > 0
  //           ? scannerData.searchFilters.category
  //               .split(" | ")
  //               .map((item) => item.trim())
  //           : null,
  //       clientLocation:
  //         scannerData.searchFilters.clientLocation.length > 0
  //           ? scannerData.searchFilters.clientLocation
  //               .split(" | ")
  //               .map((item) => item.trim())
  //           : null,
  //     },
  //     clientParameters: scannerData.clientParameters,
  //     biddingOptions: scannerData.biddingOptions,
  //     coverLetterOptions: scannerData.biddingOptions,
  //   });
  //   console.log("Response in server route:", data);

  try {
    return NextResponse.json({ message: "Ok" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
