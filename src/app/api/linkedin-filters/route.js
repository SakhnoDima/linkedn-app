import { NextResponse } from "next/server";
import LinkedinFilters from "@/app/lib/linkedin-filters-model";
import mongoose from "mongoose";
import { compleatSearchFilters } from "../helpers";
import { TaskService } from "../services/linkedin-cron";
import User from "@/app/lib/user-model";

export const POST = async (req, res) => {
  const { values, userId } = await req.json();
  try {
    const newFilter = await LinkedinFilters.create({
      cronTime: values.cronTime,
      autoBidding: values.autoBidding,
      targetName: values.targetName,
      userId: new mongoose.Types.ObjectId(userId),
      connections: values.connections,
      keyWords: values.keyWords,
      locations: values.locations,
      title: values.title,
      languages: values.languages,
      industries: values.industries,
      serviceCategories: values.serviceCategories,
      status: values.status,
    });

    if (newFilter.autoBidding) {
      try {
        const user = await User.findById({ _id: userId });

        const searchFilters = await compleatSearchFilters(newFilter);

        TaskService.startTask(newFilter._id, newFilter, user, searchFilters);
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    }

    return NextResponse.json(
      { message: "Add filters", filter: newFilter },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const GET = async (req, res) => {
  const { searchParams } = new URL(req.nextUrl);
  const userId = searchParams.get("userId");

  try {
    const filters = await LinkedinFilters.find({ userId: userId });
    if (!filters) {
      return NextResponse.json(
        { message: "Something went wrong try letter" },
        { status: 500 }
      );
    }
    return NextResponse.json(filters);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const PUT = async (req, res) => {
  const { values, fieldId } = await req.json();
  try {
    const updatedField = await LinkedinFilters.findByIdAndUpdate(
      {
        _id: fieldId,
      },
      {
        cronTime: values.cronTime,
        autoBidding: values.autoBidding,
        targetName: values.targetName,
        connections: values.connections,
        keyWords: values.keyWords,
        locations: values.locations,
        title: values.title,
        languages: values.languages,
        industries: values.industries,
        serviceCategories: values.serviceCategories,
        status: values.status,
      },
      { new: true }
    );

    const user = await User.findById({ _id: updatedField.userId });
    if (updatedField.autoBidding) {
      try {
        TaskService.stopTask(user._id.toString(), updatedField._id);

        const searchFilters = await compleatSearchFilters(updatedField);

        TaskService.startTask(
          updatedField._id,
          updatedField,
          user,
          searchFilters
        );
      } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
      }
    } else {
      TaskService.stopTask(user._id.toString(), updatedField._id);
    }

    return NextResponse.json(
      { message: "Add filters", filter: updatedField },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const DELETE = async (req, res) => {
  try {
    const { ids } = await req.json();

    if (ids.length === 0) {
      throw new Error("No IDs provided for deletion");
    }

    const deletionResults = await Promise.all(
      ids.map(async (id) => {
        const targetFilters = await LinkedinFilters.findById({ _id: id });
        if (targetFilters.autoBidding) {
          TaskService.stopTask(
            targetFilters.userId.toString(),
            targetFilters._id
          );
        }
        const isDeleted = await LinkedinFilters.findByIdAndDelete(id);
        return { id, isDeleted };
      })
    );

    const allDeleted = deletionResults.every((result) => result.isDeleted);

    if (!allDeleted) {
      throw new Error("Some items were not deleted. Please try again.");
    }

    return NextResponse.json(
      { message: "Filters deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting filters: ", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
