const { ethers } = require("ethers");
require("dotenv").config();

// Load contract ABI and address
const abi = require("./RewardHubTokenABI.json"); // You will create this file next
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Connect to blockchain using Sepolia RPC
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

// ======================
// Blockchain Functions
// ======================

const registerStudent = async (studentWalletAddress) => {
  const address = ethers.getAddress(studentWalletAddress);
  const tx = await contract.registerStudent(address);
  await tx.wait();
  return tx.hash;
};

const grantAchievement = async (studentAddress, achievementName) => {
  const tx = await contract.grantAchievement(studentAddress, achievementName);
  await tx.wait();
  return tx.hash;
};

const redeemPerk = async (perkName) => {
  const tx = await contract.redeemPerk(perkName);
  await tx.wait();
  return tx.hash;
};

const getTokenBalance = async (walletAddress) => {
  const balance = await contract.balanceOf(walletAddress);
  return ethers.formatEther(balance); // if decimals were used; we used whole numbers, so format manually
};

module.exports = {
  registerStudent,
  grantAchievement,
  redeemPerk,
  getTokenBalance,
};
