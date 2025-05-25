const express = require("express");
const router = express.Router();
const {
  createAchievement,
  getAchievements,
} = require("../controllers/achievementController");

// POST /api/achievements
router.post("/", createAchievement);

// GET /api/achievements
router.get("/", getAchievements);

module.exports = router;
