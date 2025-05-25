const express = require("express");
const router = express.Router();
const {
  redeemReward,
  getRedemptionsByStudent,
  getAllRedemptions,
} = require("../controllers/redemptionController");

// Student redeems a reward
router.post("/", redeemReward);

// Student views their redemptions
router.get("/student/:studentId", getRedemptionsByStudent);

// Admin views all redemptions
router.get("/", getAllRedemptions);

module.exports = router;
