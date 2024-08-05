import mongoose from "mongoose";
import dbConnect from "./moongose-connect";

const LinkedinFiltersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users_collection",
    required: true,
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
