// Game State Variables
let totalPoints = 0;
let pointsPerClick = 1;
let pointsPerSecond = 0;
let prestigeMultiplier = 0;
let karma = 0;
let pointBankBalance = 0;
let pointBankInterestRate = 1;
let pointUpgradeCost = 15;
let autoClickerCost = 20;
let pointUpgrades = 0;
let autoClickers = 0;
let depositAmount = 0;
let donateAmount = 0;

// DOM Elements
const totalPointsElem = document.getElementById("totalPoints");
const pointsPerClickElem = document.getElementById("pointsPerClick");
const pointsPerSecondElem = document.getElementById("pointsPerSecond");
const prestigeMultiplierElem = document.getElementById("prestigeMultiplier");
const karmaAmountElem = document.getElementById("karmaAmount");
const pointBankBalanceElem = document.getElementById("pointBankBalance");
const upgradeCostElem = document.getElementById("upgradeCost");
const autoClickerCostElem = document.getElementById("autoClickerCost");
const depositAmountInput = document.getElementById("depositAmount");
const donateAmountInput = document.getElementById("donateAmount");

// Game Functions
function updateUI() {
    totalPointsElem.textContent = `Total Points: ${totalPoints}`;
    pointsPerClickElem.textContent = `Points per Click: ${pointsPerClick}`;
    pointsPerSecondElem.textContent = `Points per Second: ${pointsPerSecond}`;
    prestigeMultiplierElem.textContent = `Prestige Multiplier: ${prestigeMultiplier}x`;
    karmaAmountElem.textContent = `Karma: ${karma}`;
    pointBankBalanceElem.textContent = `Point Bank Balance: ${pointBankBalance}`;
    upgradeCostElem.textContent = `Point Upgrade Cost: ${pointUpgradeCost}`;
    autoClickerCostElem.textContent = `Auto Clicker Cost: ${autoClickerCost}`;
}

// Actions
document.getElementById("clickButton").addEventListener("click", () => {
    totalPoints += pointsPerClick * prestigeMultiplier;
    updateUI();
});

document.getElementById("prestigeButton").addEventListener("click", () => {
    if (totalPoints >= 1000) {
        prestigeMultiplier = Math.floor(totalPoints / 1000);
        totalPoints = 0;
        updateUI();
    }
});

document.getElementById("upgradeButton").addEventListener("click", () => {
    if (totalPoints >= pointUpgradeCost) {
        totalPoints -= pointUpgradeCost;
        pointsPerClick++;
        pointUpgradeCost *= 2; // Doubling the cost
        updateUI();
    }
});

document.getElementById("autoClickerButton").addEventListener("click", () => {
    if (totalPoints >= autoClickerCost) {
        totalPoints -= autoClickerCost;
        autoClickers++;
        autoClickerCost *= 2; // Doubling the cost
        updateUI();
    }
});

// Point Bank System
document.getElementById("depositButton").addEventListener("click", () => {
    const amount = parseInt(depositAmountInput.value);
    if (amount <= totalPoints) {
        totalPoints -= amount;
        pointBankBalance += amount;
        updateUI();
    }
});

document.getElementById("withdrawButton").addEventListener("click", () => {
    const amount = parseInt(depositAmountInput.value);
    if (amount <= pointBankBalance) {
        totalPoints += amount;
        pointBankBalance -= amount;
        updateUI();
    }
});

// Donation System
document.getElementById("donateButton").addEventListener("click", () => {
    const amount = parseInt(donateAmountInput.value);
    if (amount <= totalPoints) {
        totalPoints -= amount;
        karma += Math.floor(amount / 1000000); // For every 1 million points, get 1 karma
        updateUI();
    }
});

// Auto Clicker Logic
setInterval(() => {
    totalPoints += pointsPerSecond;
    updateUI();
}, 1000);

setInterval(() => {
    pointBankBalance += pointBankBalance * (pointBankInterestRate / 100);
    updateUI();
}, 500




