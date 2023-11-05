const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  isCompleted: {
    type: Boolean,
    default: false,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userCollection",
    required: true,
  },

  createAt: {
    type: Date,
    default: Date.now,
  },
});

const taskCollection = mongoose.model("taskData", taskSchema);

module.exports = taskCollection;
