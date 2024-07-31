import { NextResponse } from "next/server";
import axios from "axios";
import User from "@/app/lib/user-model";

export class ErrorList {
  constructor() {
    this.errors = [];
  }
  addError(id, message) {
    const index = this.errors.findIndex((obj) => obj.id === id);

    if (index === -1) {
      this.errors.push({ id, message });
    } else {
      this.errors[index].message = message;
    }
  }
  removeError(id) {
    const index = this.errors.findIndex((obj) => obj.id === id);

    if (index !== -1) {
      this.errors.splice(index, 1);
    }
  }
  getErrorById(id) {
    const foundObject = this.errors.find((obj) => obj.id === id);

    return foundObject || false;
  }
}
const errorList = new ErrorList();

async function checkTaskStatus(taskId) {
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
        if (response.isUpWorkAuth) {
          const newUser = await User.findByIdAndUpdate(
            { _id: response.id },
            {
              isUpWorkAuth: true,
            },
            { new: true }
          );
          console.log(newUser);
          isAuth = response.isUpWorkAuth;
          clearInterval(interval);
        }
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
  const { login, pass, userId, secret } = await req.json();

  if (!login || !pass || !userId) {
    return NextResponse.json(
      { message: "Credentials is required" },
      { status: 400 }
    );
  }
  console.log({ login, pass, userId, secret });
  try {
    axios
      .post(
        "https://6ejajjistb.execute-api.eu-north-1.amazonaws.com/default/lambda-create-task",
        {
          id: userId,
          email: login,
          password: pass,
          secret: secret,
          key: "upWork",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((createTaskResponse) => {
        if (createTaskResponse.data.error) {
          console.log("in Post", createTaskResponse.data.error);
          errorList.addError(userId, createTaskResponse.data.error);
          return;
        }
        const taskId = createTaskResponse.data.taskId;
        errorList.removeError(userId);

        checkTaskStatus(taskId);
      });

    return NextResponse.json(
      {
        message: `Your account is currently being authenticated on the UpWork platform. Wait for it to finish.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
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
    const isError = errorList.getErrorById(targetId);
    if (isError) {
      return NextResponse.json({ message: isError.message }, { status: 500 });
    }

    const currentUser = await User.findById({ _id: targetId });

    console.log(currentUser.isUpWorkAuth);

    console.log("User in get", currentUser);
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
