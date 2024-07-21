import { NextResponse } from "next/server";
import axios from "axios";
import User from "@/app/lib/user-model";

async function checkTaskStatus(taskId) {
  let isLinkedinAuth = false;

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
        isLinkedinAuth = JSON.parse(statusResponse.data.result);
        clearInterval(interval);
      } else {
        console.log("Task is still processing");
      }
    } catch (error) {
      console.error("Error checking task status:", error);
    }
  }, 10000);

  while (true) {
    if (isLinkedinAuth !== false) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return isLinkedinAuth;
}

export const POST = async (req, res) => {
  const { data } = await req.json();

  if (!data) {
    return NextResponse.json(
      { message: "Credentials is required" },
      { status: 400 }
    );
  }

  const user = await User.findById({ _id: data.userId });

  const searchFilters = {};
  if (data.locations.length > 0) {
    searchFilters.Locations = data.locations;
  }
  if (data.languages.length > 0) {
    searchFilters["Profile language"] = data.languages;
  }
  if (data.title) {
    searchFilters.Keywords = data.title;
  }
  if (data.industries.length > 0) {
    searchFilters.Industry = data.industries;
  }
  if (data.serviceCategories.length > 0) {
    searchFilters["Service categories"] = data.serviceCategories;
  }

  try {
    const createTaskResponse = await axios.post(
      "https://6ejajjistb.execute-api.eu-north-1.amazonaws.com/default/lambda-create-task",
      {
        id: data.userId,
        levelOfTarget: 1,
        searchTags: data.keyWords,
        searchFilters,
        totalLettersPerDay: data.connections,
        invitationLetters: [""],
        email: user.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const taskId = createTaskResponse.data.taskId;
    console.log("Task started with ID:", taskId);

    const result = await checkTaskStatus(taskId);

    console.log("Finish:", result);

    if (result.error) {
      return NextResponse.json(
        {
          message: result.error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: `In total, ${result.totalInvitationSent} connection was completed out of ${result.totalLettersPerDay} planned.`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
