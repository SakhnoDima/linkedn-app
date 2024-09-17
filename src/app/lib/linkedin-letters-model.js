import mongoose from "mongoose";
import dbConnect from "./moongose-connect";

const LinkedinLettersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users_collection",
    required: true,
  },
  type: {
    type: String,
    enum: ["invitation", "first-letter", "job-proposal"],
    required: true,
  },
  letterText: {
    type: String,
    required: true,
  },
  includesWords: {
    type: String,
  },
  targetWords: {
    type: String,
  },
  location: {
    type: String,
  },
  topic: {
    type: String,
  },
});

await dbConnect();

const LinkedinLetters =
  mongoose.models.LinkedinLetters ||
  mongoose.model("LinkedinLetters", LinkedinLettersSchema);

export default LinkedinLetters;
