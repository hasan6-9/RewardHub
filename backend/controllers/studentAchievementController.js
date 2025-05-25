const StudentAchievement = require("../models/StudentAchievement");
const Achievement = require("../models/Achievement");
const blockchain = require("../blockchain/contract");

// POST /api/student-achievements
exports.logAchievement = async (req, res) => {
  const { studentId, achievementId, walletAddress } = req.body;

  try {
    const achievement = await Achievement.findById(achievementId);
    if (!achievement)
      return res.status(404).json({ msg: "Achievement not found" });

    // Call the smart contract to grant the achievement (mint tokens)
    const txHash = await blockchain.grantAchievement(
      walletAddress,
      achievement.title
    );

    // Save the achievement to the DB
    const newLog = await StudentAchievement.create({
      studentId,
      achievementId,
      txHash,
    });

    res.status(201).json(newLog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/student-achievements/:studentId
exports.getAchievementsByStudent = async (req, res) => {
  try {
    const achievements = await StudentAchievement.find({
      studentId: req.params.studentId,
    })
      .populate("achievementId")
      .sort({ dateAwarded: -1 });

    res.json(achievements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
