import { NextResponse } from "next/server";
import User from "@/app/lib/user-model";
import axios from "axios";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

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
        let resultObject = JSON.parse(statusResponse.data.result);
        isLinkedinAuth = resultObject.isLinkedinAuth;
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
  const { login, pass, userId } = await req.json();

  if (!login || !pass || !userId) {
    return NextResponse.json(
      { message: "Credentials is required" },
      { status: 400 }
    );
  }
  try {
    const createTaskResponse = await axios.post(
      "https://6ejajjistb.execute-api.eu-north-1.amazonaws.com/default/lambda-create-task",
      {
        id: userId,
        email: login,
        password: pass,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const taskId = createTaskResponse.data.taskId;
    console.log("Task started with ID:", taskId);

    const isLinkedinAuth = await checkTaskStatus(taskId);

    console.log("isLinkedinAuth after f:", isLinkedinAuth);

    await User.findOneAndUpdate(
      { _id: userId },
      { isLinkedinAuth: true, tempPass: null },
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json(
      { message: "User was authorized successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
