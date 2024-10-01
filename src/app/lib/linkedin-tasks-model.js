import mongoose from "mongoose";
import dbConnect from "./moongose-connect";
import { EVENTS } from "../api/services/constants";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const invitedCompanies = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  likedPosts: {
    type: Number,
  },
  follow: {
    type: Boolean,
  },
  messageSent: {
    type: Boolean,
  },
});

const LinkedinCompletedTasksSchema = new mongoose.Schema({
  taskType: {
    type: String,
    enum: [
      EVENTS.linkedin.taskType.companiesMessages,
      EVENTS.linkedin.taskType.sendConnections,
    ],
  },
  invitedCompanies: {
    type: [invitedCompanies],
  },
  targetTaskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LinkedinFilters",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users_collection",
    required: true,
  },
  taskName: {
    type: String,
  },
  error: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  levelOfTarget: {
    type: Number,
  },
  totalClicks: {
    type: Number,
  },
  totalLettersPerDay: {
    type: Number,
  },
  totalInvitationSent: {
    type: Number,
  },
  searchTags: {
    type: String,
  },
  searchFilters: {
    type: String,
  },
  userNames: {
    type: [userSchema],
  },
  searchFilters: {
    Locations: {
      type: [String],
    },
    "Profile language": {
      type: [String],
    },
    Keywords: {
      type: String,
    },
    Industry: {
      type: [String],
    },
    "Service categories": {
      type: [String],
    },
  },
});

await dbConnect();

const LinkedinCompletedTasks =
  mongoose.models.LinkedinCompletedTasks ||
  mongoose.model("LinkedinCompletedTasks", LinkedinCompletedTasksSchema);

export default LinkedinCompletedTasks;
