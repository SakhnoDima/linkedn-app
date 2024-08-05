import { NextResponse } from "next/server";
import axios from "axios";
import User from "@/app/lib/user-model";
import LinkedinFilters from "@/app/lib/linkedin-filters-model";

import { TaskService } from "../services/cron";

export const POST = async (req, res) => {
  const { data } = await req.json();

  if (!data) {
    return NextResponse.json(
      { message: "Credentials is required" },
      { status: 400 }
    );
  }

  const user = await User.findById({ _id: data.userId });

  await LinkedinFilters.findByIdAndUpdate(
    { _id: data._id },
    {
      status: true,
    },
    { new: true }
  );

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
    TaskService.startTask(data._id, data, user, searchFilters);

    return NextResponse.json(
      {
        message: `We have started the connection process, please wait for the result`,
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
