const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly", "custom"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  progress: [
    {
      date: { type: Date, required: true },
      completed: { type: Boolean, default: false },
    },
  ],
  goalCount: {
    type: Number,
    default: 1, // For habits that need a count, like "drink 8 glasses of water"
  },
  completedCount: {
    type: Number,
    default: 0, // Track how many times the user has completed this habit
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Habit", habitSchema);
