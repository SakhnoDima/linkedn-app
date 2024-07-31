import mongoose from "mongoose";

const ScannersSchema = new mongoose.Schema({
  autoBidding: {
    type: Boolean,
  },
  scannerName: {
    type: String,
  },
  searchWords: {
    allOfTheseWords: { type: String, default: "" },
    anyOfTheseWords: { type: String, default: "" },
    noneOfTheseWords: { type: String, default: "" },
    theExactPhrase: { type: String, default: "" },
  },
  searchFilters: {
    category: { type: String, default: "" },
    experienceLevel: {
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
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users_collection",
    required: true,
  },
});

const Scanners =
  mongoose.models.Scanners || mongoose.model("Scanners", ScannersSchema);

export default Scanners;
