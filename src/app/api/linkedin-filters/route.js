import { NextResponse } from "next/server";
import linkedinFilters from "@/app/lib/linkedin-filters-model";
import LinkedinFilters from "@/app/lib/linkedin-filters-model";
import mongoose from "mongoose";

export const POST = async (req, res) => {
  const { values, userId } = await req.json();
  try {
    const newFilter = await LinkedinFilters.create({
      targetName: values.targetName,
      userId: new mongoose.Types.ObjectId(userId),
      connections: values.connections,
      keyWords: values.keyWords,
      locations: values.locations,
      title: values.title,
      languages: values.languages,
      industries: values.industries,
      serviceCategories: values.serviceCategories,
    });

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
        targetName: values.targetName,
        connections: values.connections,
        keyWords: values.keyWords,
        locations: values.locations,
        title: values.title,
        languages: values.languages,
        industries: values.industries,
        serviceCategories: values.serviceCategories,
      },
      { new: true }
    );

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
    console.log(ids);
    if (ids.length === 0) {
      throw new Error("No IDs provided for deletion");
    }

    const deletionResults = await Promise.all(
      ids.map(async (id) => {
        const isDeleted = await linkedinFilters.findByIdAndDelete(id);
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
