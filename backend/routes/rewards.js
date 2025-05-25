const express = require("express");
const router = express.Router();
const {
  createReward,
  getAllRewards,
} = require("../controllers/rewardController");

// Admin adds reward
router.post("/", createReward);

// Students view all rewards
router.get("/", getAllRewards);

module.exports = router;
