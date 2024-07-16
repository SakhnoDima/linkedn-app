import { NextResponse } from "next/server";
import linkedinFilters from "@/app/lib/linkedin-filters-model";
import dbConnect from "@/app/lib/moongose-connect";
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

export const DELETE = async (req, res) => {
  try {
    const { id } = await req.json();

    const isDeleted = await linkedinFilters.findOneAndDelete({ _id: id });

    if (!isDeleted) {
      throw new Error("Item not deleted. Please try again. ");
    }

    return NextResponse.json(
      { message: "Filter deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting filter: ", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
