import mongoose from "mongoose";

const LinkedinCompletedTasksSchema = new mongoose.Schema({
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
    type: [String],
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

const LinkedinCompletedTasks =
  mongoose.models.LinkedinCompletedTasks ||
  mongoose.model("LinkedinCompletedTasks", LinkedinCompletedTasksSchema);

export default LinkedinCompletedTasks;
