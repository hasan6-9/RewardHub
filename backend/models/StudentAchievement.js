const mongoose = require("mongoose");

const studentAchievementSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  achievementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Achievement",
    required: true,
  },
  dateAwarded: { type: Date, default: Date.now },
  txHash: { type: String }, // Will hold blockchain transaction hash
});

module.exports = mongoose.model("StudentAchievement", studentAchievementSchema);
