import mongoose from "mongoose";
import dbConnect from "./moongose-connect";

const ScannersSchema = new mongoose.Schema({
  autoBidding: {
    type: Boolean,
  },
  weeklyStatus: {
    type: Boolean,
    default: false,
  },
  cronTime: {
    min: { type: Number, default: false },
    hour: { type: Number, default: false },
    timeZone: { type: String, default: "" },
  },
  scannerName: {
    type: String,
    required: [true, "Please provide scanner name"],
  },
  searchWords: {
    includeWords: { type: String, default: "" },
    excludeWords: { type: String, default: "" },
  },
  searchFilters: {
    category: { type: String, default: "" },
    contractorTier: {
      1: { type: Boolean, default: false },
      2: { type: Boolean, default: false },
      3: { type: Boolean, default: false },
    },
    jobType: {
      hourlyJobType: {
        enabled: { type: Boolean, default: false },
        min: { type: Number, default: null },
        max: { type: Number, default: null },
      },
      fixedJobType: {
        enabled: { type: Boolean, default: false },

        min: { type: Number, default: null },
        max: { type: Number, default: null },
      },
    },
    durationV3: {
      week: { type: Boolean, default: false },
      month: { type: Boolean, default: false },
      semester: { type: Boolean, default: false },
      ongoing: { type: Boolean, default: false },
    },
    workload: {
      as_needed: { type: Boolean, default: false },
      full_time: { type: Boolean, default: false },
    },
    clientHires: {
      0: { type: Boolean, default: false },
      "1-9": { type: Boolean, default: false },
      "10-": { type: Boolean, default: false },
    },
    clientLocation: { type: String, default: "" },
    clientInfo: {
      all: { type: Boolean, default: false },
      1: { type: Boolean, default: false },
    },
  },
  clientParameters: {
    minAvgFeedback: { type: Number, default: 3 },
    minTotalSpent: { type: String, default: null },
    minHireRate: { type: String, default: null },
    minAvgHourlyRatePaid: { type: Number, default: null },
    maxAvgHourlyRatePaid: { type: Number, default: null },
    clientsWithoutSufficientHistory: { type: Boolean, default: false },
  },
  biddingOptions: {
    team: { type: String, default: "" },
    freelancer: { type: String, default: "" },
    profile: { type: String, default: "" },
  },
  coverLetterOptions: {
    coverLetterTemplate: { type: String, default: "" },
    freelancerSkills: { type: String, default: "" },
    additionalLinks: {
      gitHub: { type: String, default: "" },
      linkedIn: { type: String, default: "" },
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users_collection",
    required: true,
  },
});

await dbConnect();

const Scanners =
  mongoose.models.Scanners || mongoose.model("Scanners", ScannersSchema);

export default Scanners;
