const blockchain = require("../blockchain/contract");
const User = require("../models/User");

exports.registerStudentOnChain = async (req, res) => {
  const { name, email, password, walletAddress } = req.body;

  try {
    // Optional: Check if user already exists in DB
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ msg: "Student already registered" });

    // Call smart contract
    const txHash = await blockchain.registerStudent(walletAddress);

    // Save to DB (you may have a hash password flow here too)
    const newUser = await User.create({
      name,
      email,
      password, // ideally hash this first if you're using login
      role: "student",
      walletAddress,
    });

    res.status(201).json({ user: newUser, txHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
