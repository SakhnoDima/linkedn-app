import mongoose from "mongoose";
import dbConnect from "./moongose-connect";

const UserSchema = new mongoose.Schema({
  accountUsOnly: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  linkedinData: {
    login: { type: String },
    password: { type: String },
  },
  isLinkedinAuth: {
    type: Boolean,
    default: false,
  },
  isUpWorkAuth: {
    type: Boolean,
    default: false,
  },
  tempPass: {
    type: String,
  },
  isTelegramNotifications: {
    type: Boolean,
    default: false,
  },
  isGreetingMessage: {
    type: Boolean,
    default: false,
  },
  chatId: {
    type: [String],
  },
  status: {
    type: String,
    unique: true,
  },
});

await dbConnect();

const User =
  mongoose.models.User ||
  mongoose.model("User", UserSchema, "users_collection");

export default User;
