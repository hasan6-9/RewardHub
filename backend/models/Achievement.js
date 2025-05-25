const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    tokenReward: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Achievement", achievementSchema);
