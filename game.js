let totalPoints = 0;
let pointsPerClick = 1;
let pointsPerSecond = 0;
let pointUpgradeCost = 15;
let autoClickerCost = 20;
let pointBankBalance = 0;
let bankInterestRate = 1; // 1% interest per 5 seconds
let karma = 0;

let pointUpgrades = 0;
let autoClickers = 0;
let prestigeMultiplier = 1;

let pointBankDeposits = 0; // Track total deposit
let pointBankInterest = 0; // Interest accumulated

let autoClickerInterval;

// Initialize elements
const totalPointsElement = document.getElementById("totalPoints");
const pointsPerClickElement = document.getElementById("pointsPerClick");
const pointsPerSecondElement = document.getElementById("pointsPerSecond");
const prestigeMultiplierElement = document.getElementById("prestigeMultiplier");
const karmaAmountElement = document.getElementById("karmaAmount");
const pointBankBalanceElement = document.getElementById("pointBankBalance");
const upgradeCostElement = document.getElementById("upgradeCost");
const autoClickerCostElement = document.getElementById("autoClickerCost");

const clickButton = document.getElementById("clickButton");
const prestigeButton = document.getElementById("prestigeButton");
const upgradeButton = document.getElementById("upgradeButton");
const autoClickerButton = document.getElementById("autoClickerButton");

const depositAmountInput = document.getElementById("depositAmount");
const depositButton = document.getElementById("depositButton");
const withdrawButton = document.getElementById("withdrawButton");
const donateButton = document.getElementById("donateButton");
const donateAmountInput = document.getElementById("donateAmount");

const pointBankSection = document.getElementById("pointBankSection");
const donationSection = document.getElementById("donationSection");
const pointBankTab = document.getElementById("pointBankTab");
const donationTab = document.getElementById("donationTab");

let loginSignupModal = document.getElementById('loginSignupModal');
let closeModal = document.getElementById('closeModal');
let signUpButton = document.getElementById('signUpButton');
let loginButton = document.getElementById('loginButton');

// Event listeners
clickButton.addEventListener("click", handleClick);
prestigeButton.addEventListener("click", prestige);
upgradeButton.addEventListener("click", upgradePoints);
autoClickerButton.addEventListener("click", buyAutoClicker);

depositButton.addEventListener("click", depositPoints);
withdrawButton.addEventListener("click", withdrawPoints);
donateButton.addEventListener("click", donatePoints);

pointBankTab.addEventListener("click", showPointBank);
donationTab.addEventListener("click", showDonation);

signUpButton.addEventListener("click", signUp);
loginButton.addEventListener("click", login);
closeModal.addEventListener("click", closeModalFunction);

// Initial game state updates
updateGameUI();

// Handle clicking (gains points)
function handleClick() {
    totalPoints += pointsPerClick * prestigeMultiplier;
    updateGameUI();
}

// Update game UI
function updateGameUI() {
    totalPointsElement.innerText = `Total Points: ${totalPoints}`;
    pointsPerClickElement.innerText = `Points per Click: ${pointsPerClick}`;
    pointsPerSecondElement.innerText = `Points per Second: ${pointsPerSecond}`;
    prestigeMultiplierElement.innerText = `Prestige Multiplier: ${prestigeMultiplier}x`;
    karmaAmountElement.innerText = `Karma: ${karma}`;
    pointBankBalanceElement.innerText = `Point Bank Balance: ${pointBankBalance}`;
    upgradeCostElement.innerText = `Point Upgrade Cost: ${pointUpgradeCost}`;
    autoClickerCostElement.innerText = `Auto Clicker Cost: ${autoClickerCost}`;
}

// Prestige Functionality
function prestige() {
    if (totalPoints >= 1000) {
        let multiplier = Math.floor(totalPoints / 1000);
        prestigeMultiplier = multiplier;
        totalPoints = 0;
        pointUpgrades = 0;
        autoClickers = 0;
        pointUpgradeCost = 15;
        autoClickerCost = 20;
        pointBankBalance = 0;
        pointBankInterest = 0;
        updateGameUI();
    }
}

// Upgrade Points Functionality
function upgradePoints() {
    if (totalPoints >= pointUpgradeCost) {
        pointUpgrades++;
        pointsPerClick++;
        totalPoints -= pointUpgradeCost;
        pointUpgradeCost *= 2; // Cost doubles after each upgrade
        updateGameUI();
    }
}

// Auto Clicker Purchase Functionality
function buyAutoClicker() {
    if (totalPoints >= autoClickerCost) {
        autoClickers++;
        pointsPerSecond += pointsPerClick;
        totalPoints -= autoClickerCost;
        autoClickerCost *= 2; // Cost doubles after each purchase
        updateGameUI();
    }
}

// Point Bank - Deposit Points
function depositPoints() {
    let amount = parseInt(depositAmountInput.value);
    if (amount <= totalPoints) {
        totalPoints -= amount;
        pointBankBalance += amount;
        pointBankDeposits += amount;
        depositAmountInput.value = "";
        updateGameUI();
    }
}

// Point Bank - Withdraw Points
function withdrawPoints() {
    let amount = parseInt(depositAmountInput.value);
    if (amount <= pointBankBalance) {
        totalPoints += amount;
        pointBankBalance -= amount;
        updateGameUI();
    }
}

// Donation Functionality - Donate Points
function donatePoints() {
    let amount = parseInt(donateAmountInput.value);
    if (amount <= totalPoints) {
        totalPoints -= amount;
        karma += Math.floor(amount / 1000000); // For every million points donated, get 1 Karma
        donateAmountInput.value = "";
        updateGameUI();
    }
}

// Point Bank Tab
function showPointBank() {
    pointBankSection.classList.remove("hidden");
    donationSection.classList.add("hidden");
}

// Donation Tab
function showDonation() {
    donationSection.classList.remove("hidden");
    pointBankSection.classList.add("hidden");
}

// Update Interest on Bank Balance
function updateBankInterest() {
    if (pointBankDeposits > 0) {
        pointBankInterest += (pointBankDeposits * (bankInterestRate / 100));
        pointBankBalance += pointBankInterest;
        pointBankInterest = 0; // Reset interest tracker after it is added
        updateGameUI();
    }
}

// Auto clicker (every second)
function startAutoClickers() {
    if (autoClickers > 0) {
        autoClickerInterval = setInterval(() => {
            totalPoints += pointsPerSecond;
            updateGameUI();
        }, 1000);
    } else {
        clearInterval(autoClickerInterval);
    }
}

// Handle Sign Up and Login
function signUp() {
    console.log('Sign up logic will go here');
    closeModalFunction();
}

function login() {
    console.log('Login logic will go here');
    closeModalFunction();
}

// Close Modal
function closeModalFunction() {
    loginSignupModal.style.display = 'none';
}

function openModal() {
    loginSignupModal.style.display = 'flex';
}



