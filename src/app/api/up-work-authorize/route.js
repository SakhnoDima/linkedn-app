import { NextResponse } from "next/server";
import axios from "axios";
import User from "@/app/lib/user-model";

async function checkTaskStatus(taskId) {
  let isAuth = false;

  const interval = setInterval(async () => {
    try {
      const statusResponse = await axios.post(
        "додати",
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
        isAuth = JSON.parse(statusResponse.data.result);
        clearInterval(interval);
      } else {
        console.log("Task is still processing");
      }
    } catch (error) {
      console.error("Error checking task status:", error);
      isAuth = false; //!  перевірити!
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

export const POST = async (req, res) => {
  const { login, pass, userId } = await req.json();

  if (!login || !pass || !userId) {
    return NextResponse.json(
      { message: "Credentials is required" },
      { status: 400 }
    );
  }
  console.log({ login, pass, userId });
  try {
    // axios
    //   .post(
    //     "додати",
    //     {
    //       id: userId,
    //       email: login,
    //       password: pass,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .then((createTaskResponse) => {
    //     const taskId = createTaskResponse.data.taskId;
    //     checkTaskStatus(taskId)
    //       .then((res) => {
    //         console.log("res", res); //! перевірити
    //         User.findByIdAndUpdate(
    //           { _id: userId },
    //           {
    //             isUpWorkAuth: res,
    //           }
    //         );
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         console.log("in catch after check auth UW status");
    //       });
    //   });

    return NextResponse.json(
      {
        message: `Your account is currently being authenticated on the UpWork platform. Wait for it to finish.`,
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

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.nextUrl);
  const targetId = searchParams.get("targetId");

  if (!targetId) {
    return NextResponse.json(
      { message: `${targetId} is required` },
      { status: 400 }
    );
  }
  try {
    const currentUser = await User.findById({ _id: targetId });

    return NextResponse.json(
      {
        status: currentUser.isUpWorkAuth,
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
