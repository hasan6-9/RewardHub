const { ethers } = require("ethers");
require("dotenv").config();

const abi = require("../blockchain/RewardHubTokenABI.json");
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

(async () => {
  const title = "Blockchain Test Achievement";
  const reward = 50;

  try {
    const tx = await contract.addAchievement(title, reward);
    await tx.wait();
    console.log("✅ On-chain achievement added:", title);
  } catch (err) {
    console.error("❌ Failed to add achievement:", err.reason || err.message);
  }
})();
