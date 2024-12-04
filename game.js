// Game variables
let totalPoints = 0;
let pointsPerClick = 1;
let pointsPerSecond = 0;
let prestigeMultiplier = 1;
let karma = 0;
let pointBankBalance = 0;
let pointBankInterestRate = 1; // Initial interest rate (1%)
let pointUpgradeCost = 15; // Starting point upgrade cost
let autoClickerCost = 20; // Starting auto-clicker cost
let pointUpgradeCount = 0; // Number of upgrades
let autoClickerCount = 0; // Number of auto-clickers

// UI Elements
const totalPointsElem = document.getElementById("totalPoints");
const pointsPerClickElem = document.getElementById("pointsPerClick");
const pointsPerSecondElem = document.getElementById("pointsPerSecond");
const prestigeMultiplierElem = document.getElementById("prestigeMultiplier");
const karmaElem = document.getElementById("karmaAmount");
const pointBankBalanceElem = document.getElementById("pointBankBalance");
const pointUpgradeCostElem = document.getElementById("upgradeCost");
const autoClickerCostElem = document.getElementById("autoClickerCost");

const clickButton = document.getElementById("clickButton");
const prestigeButton = document.getElementById("prestigeButton");
const upgradeButton = document.getElementById("upgradeButton");
const autoClickerButton = document.getElementById("autoClickerButton");
const depositButton = document.getElementById("depositButton");
const withdrawButton = document.getElementById("withdrawButton");
const depositAmountInput = document.getElementById("depositAmount");
const donateButton = document.getElementById("donateButton");
const donateAmountInput = document.getElementById("donateAmount");

const pointBankTab = document.getElementById("pointBankTab");
const donationTab = document.getElementById("donationTab");
const pointBankSection = document.getElementById("pointBank");
const donationSection = document.getElementById("donationSection");

const actionFeedback = document.getElementById("actionFeedback");
const prestigeFeedback = document.getElementById("prestigeFeedback");
const upgradeFeedback = document.getElementById("upgradeFeedback");
const autoClickerFeedback = document.getElementById("autoClickerFeedback");

// Update UI with game stats
function updateUI() {
    totalPointsElem.textContent = `Total Points: ${totalPoints}`;
    pointsPerClickElem.textContent = `Points per Click: ${pointsPerClick}`;
    pointsPerSecondElem.textContent = `Points per Second: ${pointsPerSecond}`;
    prestigeMultiplierElem.textContent = `Prestige Multiplier: ${prestigeMultiplier}x`;
    karmaElem.textContent = `Karma: ${karma}`;
    pointBankBalanceElem.textContent = `Point Bank Balance: ${pointBankBalance}`;
    pointUpgradeCostElem.textContent = `Point Upgrade Cost: ${pointUpgradeCost}`;
    autoClickerCostElem.textContent = `Auto Clicker Cost: ${autoClickerCost}`;
}

// Point Click Function
clickButton.addEventListener("click", () => {
    totalPoints += pointsPerClick * prestigeMultiplier;
    updateUI();
});

// Prestige Function
prestigeButton.addEventListener("click", () => {
    if (totalPoints >= 1000) {
        // Calculate multiplier based on points
        prestigeMultiplier = Math.floor(totalPoints / 1000);
        totalPoints = 0; // Reset points after prestige
        pointUpgradeCount = 0; // Reset point upgrades
        autoClickerCount = 0; // Reset auto-clickers
        pointUpgradeCost = 15; // Reset point upgrade cost
        autoClickerCost = 20; // Reset auto-clicker cost
        pointBankBalance = 0; // Reset point bank balance
        pointBankInterestRate = 1; // Reset interest rate
        karma += Math.floor(totalPoints / 1000000); // Gain karma for points
        prestigeFeedback.textContent = `Prestige Successful! Multiplier: ${prestigeMultiplier}x`;
    } else {
        prestigeFeedback.textContent = `You need at least 1000 points to prestige.`;
    }
    updateUI();
});

// Buy Point Upgrade
upgradeButton.addEventListener("click", () => {
    if (totalPoints >= pointUpgradeCost) {
        totalPoints -= pointUpgradeCost;
        pointsPerClick++;
        pointUpgradeCount++;
        pointUpgradeCost *= 2; // Increase upgrade cost by x2
        upgradeFeedback.textContent = `Point Upgrade Purchased! Points per Click: ${pointsPerClick}`;
    } else {
        upgradeFeedback.textContent = `Not enough points to buy point upgrade.`;
    }
    updateUI();
});

// Buy Auto Clicker
autoClickerButton.addEventListener("click", () => {
    if (totalPoints >= autoClickerCost) {
        totalPoints -= autoClickerCost;
        autoClickerCount++;
        autoClickerCost *= 2; // Increase auto-clicker cost by x2
        autoClickerFeedback.textContent = `Auto Clicker Purchased! Total Auto Clickers: ${autoClickerCount}`;
    } else {
        autoClickerFeedback.textContent = `Not enough points to buy auto clicker.`;
    }
    updateUI();
});

// Deposit Points into Point Bank
depositButton.addEventListener("click", () => {
    let depositAmount = parseInt(depositAmountInput.value);
    if (depositAmount <= totalPoints && depositAmount > 0) {
        totalPoints -= depositAmount;
        pointBankBalance += depositAmount;
        updateUI();
        depositAmountInput.value = ''; // Reset deposit input field
    } else {
        actionFeedback.textContent = "Invalid deposit amount.";
    }
});

// Withdraw Points from Point Bank
withdrawButton.addEventListener("click", () => {
    let withdrawAmount = parseInt(depositAmountInput.value);
    if (withdrawAmount <= pointBankBalance && withdrawAmount > 0) {
        totalPoints += withdrawAmount;
        pointBankBalance -= withdrawAmount;
        updateUI();
        depositAmountInput.value = ''; // Reset deposit input field
    } else {
        actionFeedback.textContent = "Invalid withdraw amount.";
    }
});

// Donate Points to gain Karma
donateButton.addEventListener("click", () => {
    let donateAmount = parseInt(donateAmountInput.value);
    if (donateAmount <= totalPoints && donateAmount >= 1000000) {
        let karmaGained = Math.floor(donateAmount / 1000000);
        karma += karmaGained;
        totalPoints -= donateAmount;
        actionFeedback.textContent = `You donated ${donateAmount} points and gained ${karmaGained} Karma.`;
    } else {
        actionFeedback.textContent = "You need to donate at least 1 million points.";
    }
    donateAmountInput.value = ''; // Reset donation input field
    updateUI();
});

// Toggle between different tabs (Point Bank, Donation)
pointBankTab.addEventListener("click", () => {
    pointBankSection.classList.remove("hidden");
    donationSection.classList.add("hidden");
});

donationTab.addEventListener("click", () => {
    donationSection.classList.remove("hidden");
    pointBankSection.classList.add("hidden");
});

// Update points per second based on auto-clickers
setInterval(() => {
    pointsPerSecond = autoClickerCount;
    totalPoints += pointsPerSecond; // Add points per second to total points
    updateUI();
}, 1000);

// Update point bank balance with interest every 5 seconds
setInterval(() => {
    if (pointBankBalance > 0) {
        let interest = Math.floor(pointBankBalance * (pointBankInterestRate / 100));
        pointBankBalance += interest;
        pointBankInterestRate *= 1.01; // Increase interest rate slightly every 5 seconds
    }
    updateUI();
}, 5000);

// Initial call to update UI
updateUI();




