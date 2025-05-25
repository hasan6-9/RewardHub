const express = require("express");
const router = express.Router();
const { registerStudentOnChain } = require("../controllers/studentController");

// POST /api/students/register
router.post("/register", registerStudentOnChain);

module.exports = router;
