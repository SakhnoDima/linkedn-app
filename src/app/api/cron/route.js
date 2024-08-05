import { NextResponse } from "next/server";
import { TaskService } from "../services/cron";

export const POST = async (req, res) => {
  const { taskId } = await req.json();
  console.log("In CRON");
  try {
    TaskService.startTask(taskId);
    return NextResponse.json({ message: "Task is started" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, res) => {
  const { taskId } = await req.json();

  try {
    TaskService.stopTask(taskId);
    return NextResponse.json({ message: "Task is stopped" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
