import { NextResponse } from "next/server";
import Scanners from "@/app/lib/up-work-scanners";
import axios from "axios";
import { transformQuery } from "../../helpers";
import User from "@/app/lib/user-model";
import { EVENTS } from "../../services/constants";

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.nextUrl);
  const scannerId = searchParams.get("taskId");

  const scannerData = await Scanners.findOneAndUpdate(
    { _id: scannerId },
    { weeklyStatus: null, error: "" },
    { new: true }
  );

  if (!scannerData) {
    return NextResponse.json(
      { message: "Scanner did`nt find" },
      { status: 500 }
    );
  }
  const user = await User.findById({ _id: scannerData.userId });

  try {
    console.log(user);

    await axios
      .post(
        "https://6ejajjistb.execute-api.eu-north-1.amazonaws.com/default/lambda-create-task",
        {
          accountType: user.status,
          usOnly: user.accountUsOnly,
          taskPlatform: EVENTS.upWork.name,
          taskType: EVENTS.upWork.taskType.weeklyResult,
          id: scannerData.userId,
          taskId: scannerData._id,
          chatId: [],
          userEmail: user.email,
          scannerName: scannerData.scannerName,
          autoBidding: scannerData.autoBidding,
          searchWords: transformQuery(
            scannerData.searchWords.includeWords,
            scannerData.searchWords.excludeWords
          ),
          searchFilters: {
            usOnly: scannerData.usOnly,
            ...scannerData.searchFilters,
            category:
              scannerData.searchFilters.category.length > 0
                ? scannerData.searchFilters.category
                    .split(" | ")
                    .map((item) => item.trim())
                : null,
            clientLocation:
              scannerData.searchFilters.clientLocation.length > 0
                ? scannerData.searchFilters.clientLocation
                    .split(" | ")
                    .map((item) => item.trim())
                : null,
          },
          clientParameters: scannerData.clientParameters,
          biddingOptions: scannerData.biddingOptions,
          coverLetterOptions: scannerData.biddingOptions,
        }
      )
      .then((createTaskResponse) => {
        const taskId = createTaskResponse.data.taskId;
        console.log("Task started with ID:", taskId);
        checkTaskStatus(taskId, scannerId);
      })
      .catch(({ response }) => {
        console.log(response.data.error);

        throw new Error(response.data.error);
      });

    return NextResponse.json({ message: "Ok" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

async function checkTaskStatus(taskId, scannerId) {
  let isAuth = false;

  const interval = setInterval(async () => {
    try {
      const statusResponse = await axios.post(
        "https://dim6czm31f.execute-api.eu-north-1.amazonaws.com/default/lambda-check-task-status",
        {
          id: taskId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (statusResponse.data.status === "completed") {
        console.log("Task completed:", statusResponse.data.result);
        const response = JSON.parse(statusResponse.data.result);
        console.log("Res in check status f", response);

        if (response.error) {
          console.log("Error", response.error);
          clearInterval(interval);
          await Scanners.findOneAndUpdate(
            { _id: scannerId },
            { error: response.error },
            { new: true }
          );
          isAuth = false;
        } else {
          await Scanners.findOneAndUpdate(
            { _id: scannerId },
            { weeklyStatus: response.totalJobs },
            { new: true }
          );

          isAuth = false;
        }

        clearInterval(interval);
      } else {
        console.log("Task is still processing");
      }
    } catch (error) {
      console.error("Error checking task status:", error);
    }
  }, 10000);

  while (true) {
    if (isAuth !== false) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return isAuth;
}
