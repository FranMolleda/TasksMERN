const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  projectAuthor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  projectDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
