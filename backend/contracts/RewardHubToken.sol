// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardHubToken is ERC20, Ownable {
    constructor(address initialOwner) ERC20("RewardHubToken", "RHT") Ownable(initialOwner) {}

    // ========================
    // = Structs & Mappings   =
    // ========================

    struct Achievement {
        string title;
        uint256 rewardAmount;
        bool isActive;
    }

    struct Perk {
        string title;
        uint256 cost;
        bool isAvailable;
    }

    mapping(address => bool) public isStudent;
    mapping(address => string[]) public studentAchievements;
    mapping(address => mapping(string => bool)) public earned;

    mapping(string => Achievement) public achievements;
    mapping(string => Perk) public perks;

    // ========================
    // = Events               =
    // ========================

    event StudentRegistered(address student);
    event AchievementAdded(string title, uint256 rewardAmount);
    event AchievementGranted(address indexed student, string title, uint256 reward);
    event PerkAdded(string title, uint256 cost);
    event PerkRedeemed(address indexed student, string title, uint256 cost);

    // ========================
    // = Admin Functions      =
    // ========================

    function registerStudent(address student) external onlyOwner {
        require(!isStudent[student], "Already registered");
        isStudent[student] = true;
        emit StudentRegistered(student);
    }

    function addAchievement(string calldata title, uint256 rewardAmount) external onlyOwner {
        achievements[title] = Achievement(title, rewardAmount, true);
        emit AchievementAdded(title, rewardAmount);
    }

    function addPerk(string calldata title, uint256 cost) external onlyOwner {
        perks[title] = Perk(title, cost, true);
        emit PerkAdded(title, cost);
    }

    // ========================
    // = Main Functions       =
    // ========================

    function grantAchievement(address student, string calldata title) external onlyOwner {
        require(isStudent[student], "Student not registered");
        require(achievements[title].isActive, "Achievement not found or inactive");
        require(!earned[student][title], "Already earned");

        uint256 reward = achievements[title].rewardAmount;
        _mint(student, reward * 1e18);

        earned[student][title] = true;
        studentAchievements[student].push(title);

        emit AchievementGranted(student, title, reward);
    }

    function redeemPerk(string calldata title) external {
        require(isStudent[msg.sender], "Not a student");
        require(perks[title].isAvailable, "Perk not available");

        uint256 cost = perks[title].cost;
        require(balanceOf(msg.sender) >= cost, "Not enough tokens");

        _burn(msg.sender, cost);

        emit PerkRedeemed(msg.sender, title, cost);
    }

    function getAchievements(address student) external view returns (string[] memory) {
        return studentAchievements[student];
    }

    function hasEarned(address student, string calldata title) external view returns (bool) {
        return earned[student][title];
    }
}
