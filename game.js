// Initialize game variables
let points = 10000;
let pointsPerClick = 1;
let pointsPerSecond = 0;
let prestigeMultiplier = 1;
let karma = 0;

let upgradeCost = 15;
let autoClickerCost = 20;

let upgradeAmount = 0;
let autoClickers = 0;

let pointBankBalance = 0;
let interestRate = 0.01; // 1% interest every 5 seconds

// Elements
const totalPoints = document.getElementById("totalPoints");
const pointsPerClickDisplay = document.getElementById("pointsPerClick");
const pointsPerSecondDisplay = document.getElementById("pointsPerSecond");
const prestigeMultiplierDisplay = document.getElementById("prestigeMultiplier");
const karmaAmount = document.getElementById("karmaAmount");

const upgradeCostDisplay = document.getElementById("upgradeCost");
const autoClickerCostDisplay = document.getElementById("autoClickerCost");

const upgradeButton = document.getElementById("upgradeButton");
const autoClickerButton = document.getElementById("autoClickerButton");
const clickButton = document.getElementById("clickButton");
const prestigeButton = document.getElementById("prestigeButton");

// Game loop to update points per second from auto-clickers
setInterval(() => {
    points += pointsPerSecond * prestigeMultiplier;
    totalPoints.textContent = `Points: ${Math.floor(points)}`;
}, 1000);

// Click button function
clickButton.onclick = () => {
    points += pointsPerClick * prestigeMultiplier;
    totalPoints.textContent = `Points: ${Math.floor(points)}`;
};

// Prestige button function
prestigeButton.onclick = () => {
    if (points >= 1000) {
        points = 0;
        karma += Math.floor(points / 1000000);
        prestigeMultiplier *= 2;
        totalPoints.textContent = `Points: ${points}`;
        karmaAmount.textContent = `Karma: ${karma}`;
        prestigeMultiplierDisplay.textContent = `Prestige Multiplier: ${prestigeMultiplier}x`;
    }
};

// Upgrade button function
upgradeButton.onclick = () => {
    if (points >= upgradeCost) {
        points -= upgradeCost;
        pointsPerClick++;
        upgradeAmount++;
        upgradeCost *= 2; // Double the cost for the next upgrade
        totalPoints.textContent = `Points: ${Math.floor(points)}`;
        pointsPerClickDisplay.textContent = `Points per Click: ${pointsPerClick}`;
        upgradeCostDisplay.textContent = `Point Upgrade Cost: ${upgradeCost}`;
    }
};

// Auto-clicker button function
autoClickerButton.onclick = () => {
    if (points >= autoClickerCost) {
        points -= autoClickerCost;
        autoClickers++;
        pointsPerSecond += 1;
        autoClickerCost *= 2; // Double the cost for the next auto-clicker
        totalPoints.textContent = `Points: ${Math.floor(points)}`;
        pointsPerSecondDisplay.textContent = `Points per Second: ${pointsPerSecond}`;
        autoClickerCostDisplay.textContent = `Auto Clicker Cost: ${autoClickerCost}`;
    }
};

// Tabs to switch between Point Bank and Donation
const pointBankTab = document.getElementById("pointBankTab");
const donationTab = document.getElementById("donationTab");
const pointBank = document.getElementById("pointBank");
const donationSection = document.getElementById("donationSection");

pointBankTab.onclick = () => {
    pointBank.classList.remove("hidden");
    donationSection.classList.add("hidden");
};

donationTab.onclick = () => {
    donationSection.classList.remove("hidden");
    pointBank.classList.add("hidden");
};

// Point Bank deposit/withdraw functions
const depositButton = document.getElementById("depositButton");
const withdrawButton = document.getElementById("withdrawButton");

depositButton.onclick = () => {
    const depositAmount = parseInt(document.getElementById("depositAmount").value);
    if (depositAmount <= points) {
        points -= depositAmount;
        pointBankBalance += depositAmount;
        totalPoints.textContent = `Points: ${Math.floor(points)}`;
    }
};

withdrawButton.onclick = () => {
    const withdrawAmount = parseInt(document.getElementById("depositAmount").value);
    if (withdrawAmount <= pointBankBalance) {
        points += withdrawAmount;
        pointBankBalance -= withdrawAmount;
        totalPoints.textContent = `Points: ${Math.floor(points)}`;
    }
};

// Donation functionality
const donateButton = document.getElementById("donateButton");
const donateAmount = document.getElementById("donateAmount");

donateButton.onclick = () => {
    const donation = parseInt(donateAmount.value);
    if (donation <= points) {
        points -= donation;
        karma += Math.floor(donation / 1000000);
        karmaAmount.textContent = `Karma: ${karma}`;
        totalPoints.textContent = `Points: ${Math.floor(points)}`;
    }
};





