const mongoose = require("mongoose");

const TaskSchemma = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  taskState: {
    type: Boolean,
    default: false,
  },
  taskDate: {
    type: Date,
    default: Date.now(),
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

module.exports = mongoose.model("Task", TaskSchemma);
