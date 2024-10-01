import mongoose from "mongoose";
import dbConnect from "./moongose-connect";

const events = {
  connects: "connects",
  companies: "companies invite",
};

const LinkedinFiltersSchema = new mongoose.Schema({
  topic: {
    type: String,
    default: "",
  },
  letterText: {
    type: String,
    default: "",
  },
  event: {
    type: String,
    enum: [events.connects, events.companies],
    default: events.connects,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users_collection",
    required: true,
  },
  autoBidding: {
    type: Boolean,
  },
  cronTime: {
    min: { type: Number, default: false },
    hour: { type: Number, default: false },
    timeZone: { type: String },
  },
  targetName: {
    type: String,
    required: [true, "Pleas provide Name of this targets"],
  },
  connections: {
    type: Number,
    required: [true, "Pleas provide numbers of connections"],
  },
  keyWords: {
    type: String,
    required: [true, "Pleas provide keywords"],
  },
  locations: {
    type: Array,
  },
  title: {
    type: String,
  },
  languages: {
    type: Array,
  },
  industries: {
    type: Array,
  },
  serviceCategories: {
    type: Array,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

await dbConnect();

const LinkedinFilters =
  mongoose.models.LinkedinFilters ||
  mongoose.model("LinkedinFilters", LinkedinFiltersSchema);

export default LinkedinFilters;
