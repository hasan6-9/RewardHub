const express = require("express");
const router = express.Router();
const {
  logAchievement,
  getAchievementsByStudent,
} = require("../controllers/studentAchievementController");

// Faculty logs an achievement
router.post("/", logAchievement);

// Get all achievements for a student
router.get("/:studentId", getAchievementsByStudent);

module.exports = router;
