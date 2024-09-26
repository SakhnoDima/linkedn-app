import { NextResponse } from "next/server";
import LinkedinFilters from "@/app/lib/linkedin-filters-model";
import mongoose from "mongoose";
import { compleatSearchFilters } from "../helpers";
import { LinkedinTaskService } from "../services/linkedin-cron";
import User from "@/app/lib/user-model";

export const POST = async (req, res) => {
  const { values, userId } = await req.json();

  try {
    const newFilter = await LinkedinFilters.create({
      userId: new mongoose.Types.ObjectId(userId),
      ...values,
    });

    const user = await User.findById({ _id: userId });
    const searchFilters = await compleatSearchFilters(newFilter);

    if (newFilter.autoBidding && newFilter.event === "connects") {
      console.log("Start task for connects in POST");
      LinkedinTaskService.startConnectionsTask(
        newFilter._id,
        newFilter,
        user,
        searchFilters
      );
    } else if (
      newFilter.autoBidding &&
      newFilter.event === "companies invite"
    ) {
      console.log("Start task for company in POST");
      LinkedinTaskService.startCompaniesTask(
        newFilter._id,
        newFilter,
        user,
        searchFilters
      );
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
        ...values,
      },
      { new: true }
    );

    const user = await User.findById({ _id: updatedField.userId });
    LinkedinTaskService.stopTask(user._id.toString(), updatedField._id);

    const searchFilters = await compleatSearchFilters(updatedField);
    if (updatedField.autoBidding && updatedField.event === "connects") {
      console.log("Start task for connects in PUT");
      LinkedinTaskService.startConnectionsTask(
        updatedField._id,
        updatedField,
        user,
        searchFilters
      );
    } else if (
      updatedField.autoBidding &&
      updatedField.event === "companies invite"
    ) {
      console.log("Start task for company in PUT");
      LinkedinTaskService.startCompaniesTask(
        updatedField._id,
        updatedField,
        user,
        searchFilters
      );
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
          LinkedinTaskService.stopTask(
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
