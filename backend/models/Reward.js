const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    tokenCost: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reward", rewardSchema);
