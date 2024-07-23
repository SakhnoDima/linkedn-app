import mongoose from "mongoose";

const LinkedinTasksSchema = new mongoose.Schema({
  targetsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LinkedinFilters",
    required: true,
  },
  status: {
    type: String,
  },
  message: {
    type: String,
  },
});

const LinkedinTasks =
  mongoose.models.LinkedinTasks ||
  mongoose.model("LinkedinTasks", LinkedinTasksSchema);

export default LinkedinTasks;
