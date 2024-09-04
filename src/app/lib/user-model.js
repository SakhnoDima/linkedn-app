import mongoose from "mongoose";
import dbConnect from "./moongose-connect";
import { string } from "yup";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide a email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
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
  chatId: {
    type: String,
    unique: true,
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
