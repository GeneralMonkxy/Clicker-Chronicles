// Global Variables
let totalPoints = 0;
let karma = 0;
let pointBankBalance = 0;
let pointsPerClick = 1;
let pointsPerSecond = 0;
let interestRate = 1; // 1% interest every 5 seconds
let upgrades = 0;
let autoClickers = 0;

// Pricing Variables
let pointUpgradeCost = 15;  // Starting cost for Point Upgrade
let autoClickerCost = 20;   // Starting cost for Auto Clicker

// Get Elements
const totalPointsEl = document.getElementById('totalPoints');
const karmaEl = document.getElementById('karmaAmount');
const pointBankBalanceEl = document.getElementById('pointBankBalance');
const pointUpgradeCostEl = document.getElementById('upgradeCost');
const autoClickerCostEl = document.getElementById('autoClickerCost');
const depositAmountEl = document.getElementById('depositAmount');
const withdrawAmountEl = document.getElementById('withdrawAmount');

// Event Listeners
document.getElementById('depositButton').addEventListener('click', depositPoints);
document.getElementById('withdrawButton').addEventListener('click', withdrawPoints);

// Update UI
function updateUI() {
    totalPointsEl.innerText = `Total Points: ${totalPoints}`;
    karmaEl.innerText = `Karma: ${karma}`;
    pointBankBalanceEl.innerText = `Point Bank Balance: ${pointBankBalance}`;
    pointUpgradeCostEl.innerText = `Upgrade Cost: ${pointUpgradeCost}`;
    autoClickerCostEl.innerText = `Auto Clicker Cost: ${autoClickerCost}`;
}

// Deposit Points
function depositPoints() {
    let depositAmount = parseInt(depositAmountEl.value);
    if (depositAmount <= totalPoints && depositAmount > 0) {
        totalPoints -= depositAmount;
        pointBankBalance += depositAmount;
        updateUI();
    } else {
        alert("Invalid deposit amount!");
    }
}

// Withdraw Points
function withdrawPoints() {
    let withdrawAmount = parseInt(withdrawAmountEl.value);
    if (withdrawAmount <= pointBankBalance && withdrawAmount > 0) {
        pointBankBalance -= withdrawAmount;
        totalPoints += withdrawAmount;
        updateUI();
    } else {
        alert("Invalid withdraw amount or insufficient funds in the bank!");
    }
}

// Call updateUI to set initial values on page load
updateUI();


