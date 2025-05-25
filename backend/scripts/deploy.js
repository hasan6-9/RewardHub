const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners(); // Get the first account
  const RewardHub = await hre.ethers.getContractFactory("RewardHubToken");

  // Pass deployer.address as the constructor argument (initial owner)
  const contract = await RewardHub.deploy(deployer.address);

  await contract.waitForDeployment();

  console.log("✅ Contract deployed at:", await contract.getAddress());
  console.log("👤 Contract owner (initialOwner):", deployer.address);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
