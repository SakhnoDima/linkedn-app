import { NextResponse } from "next/server";
import axios from "axios";
import User from "@/app/lib/user-model";
import LinkedinFilters from "@/app/lib/linkedin-filters-model";

import LinkedinCompletedTasks from "@/app/lib/linkedin-tasks-model";
import { ErrorList } from "../services/errors";

const errorList = new ErrorList();

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

  const setFalse = await LinkedinFilters.findByIdAndUpdate(
    { _id: data._id },
    {
      status: true,
    },
    { new: true }
  );

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
    axios
      .post(
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
      )
      .then((createTaskResponse) => {
        const taskId = createTaskResponse.data.taskId;
        console.log("Task started with ID:", taskId);
        checkTaskStatus(taskId)
          .then((res) => {
            console.log("res", res);

            errorList.removeError(user._id.toHexString());

            if (res.error) {
              errorList.addError(user._id.toHexString(), res.error);
            }

            LinkedinCompletedTasks.create({
              taskName: data.targetName,
              userId: user._id,
              targetTaskId: data._id,
              date: new Date().toISOString().split("T")[0],
              error: res.error,
              levelOfTarget: res.levelOfTarget,
              totalClicks: res.totalClicks,
              totalLettersPerDay: res.totalLettersPerDay,
              totalInvitationSent: res.totalInvitationSent,
              searchTags: res.searchTags,
              userNames: [...res.userNames],
              searchFilters: {
                Locations: Array.isArray(res.searchFilters?.Locations)
                  ? [...res.searchFilters.Locations]
                  : [],
                "Profile language": Array.isArray(
                  res.searchFilters?.["Profile language"]
                )
                  ? [...res.searchFilters["Profile language"]]
                  : [],
                Keywords: res.searchFilters?.Keywords || "",
                Industry: Array.isArray(res.searchFilters?.Industry)
                  ? [...res.searchFilters.Industry]
                  : [],
                "Service categories": Array.isArray(
                  res.searchFilters?.["Service categories"]
                )
                  ? [...res.searchFilters["Service categories"]]
                  : [],
              },
            });

            LinkedinFilters.findByIdAndUpdate(
              { _id: data._id },
              {
                status: false,
              },
              { new: true }
            )
              .then((updateRes) => {
                console.log("Database updated successfully:", updateRes);
              })
              .catch((err) => {
                console.error("Error updating database:", err);
              });
          })
          .catch((err) => {
            console.log(err);
            console.log("in catch after check task status");
            LinkedinFilters.findByIdAndUpdate(
              { _id: data._id },
              {
                status: false,
              },
              { new: true }
            );
          });
      });

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
    const activeTarget = await LinkedinFilters.findById({ _id: targetId });

    const isError = errorList.getErrorById(activeTarget.userId.toHexString());

    if (isError) {
      return NextResponse.json({ message: isError.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        status: activeTarget.status,
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
