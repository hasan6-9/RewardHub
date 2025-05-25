const mongoose = require("mongoose");

const redemptionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rewardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reward",
    required: true,
  },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  txHash: {
    type: String,
  },
});

module.exports = mongoose.model("Redemption", redemptionSchema);
