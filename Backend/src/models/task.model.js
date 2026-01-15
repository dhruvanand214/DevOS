const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    priority: { type: Number, default: 2 },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
