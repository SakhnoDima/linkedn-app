import mongoose from "mongoose";
import dbConnect from "./moongose-connect";

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
});

await dbConnect();

const User =
  mongoose.models.User ||
  mongoose.model("User", UserSchema, "users_collection");

export default User;
