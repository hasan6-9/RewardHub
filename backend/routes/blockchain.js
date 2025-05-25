const express = require("express");
const router = express.Router();
const blockchain = require("../blockchain/contract");

// GET /api/blockchain/balance/:wallet
router.get("/balance/:wallet", async (req, res) => {
  try {
    const balance = await blockchain.getTokenBalance(req.params.wallet);
    res.json({ balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
