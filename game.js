// Game state variables
let clicks = 0;
let points = 0;
let multiplier = 0; // No multiplier at first
let pointUpgradeMultiplier = 1;
let autoClickerActive = false;
let autoClickerInterval = null;

// Cost for upgrades
let pointUpgradeCost = 500;
let autoClickerCost = 1000;

// Track number of upgrades bought
let pointUpgradesBought = 0;
let autoClickerBought = 0;

// HTML Elements
const clickButton = document.getElementById("click-btn");
const prestigeButton = document.getElementById("prestige-btn");
const clicksDisplay = document.getElementById("clicks");
const pointsDisplay = document.getElementById("points");
const multiplierDisplay = document.getElementById("multiplier");
const pointUpgradeInfo = document.getElementById("point-upgrade-info");
const pointUpgradeCostDisplay = document.getElementById("point-upgrade-cost");
const buyPointUpgradeButton = document.getElementById("buy-point-upgrade");
const buyAutoClickerButton = document.getElementById("buy-auto-clicker");

// Update stats on screen
function updateStats() {
    clicksDisplay.textContent = `Clicks: ${clicks}`;
    pointsDisplay.textContent = `Points: ${points}`;
    multiplierDisplay.textContent = `Multiplier: x${multiplier}`;
    pointUpgradeInfo.textContent = `Click Multiplier: x${pointUpgradeMultiplier}`;
    pointUpgradeCostDisplay.textContent = `Cost: ${pointUpgradeCost} Clicks`;

    // Update prestige button
    prestigeButton.disabled = clicks < 1000;
    prestigeButton.textContent = `Prestige (Requires 1000 Clicks)`;
}

// Handle clicking for points
clickButton.addEventListener("click", () => {
    clicks++;
    points += pointUpgradeMultiplier; // Points increase by the point upgrade multiplier
    updateStats();
});

// Handle prestige logic
prestigeButton.addEventListener("click", () => {
    if (clicks >= 1000) {
        const prestigeMultiplier = Math.floor(clicks / 1000);
        multiplier = prestigeMultiplier; // Increase multiplier based on clicks
        pointUpgradeMultiplier = 1; // Reset point multiplier on prestige
        clicks = 0; // Reset clicks
        points = 0; // Reset points
        updateStats();
    }
});

// Handle purchasing point upgrade
buyPointUpgradeButton.addEventListener("click", () => {
    if (clicks >= pointUpgradeCost) {
        clicks -= pointUpgradeCost;
        pointUpgradesBought++;
        pointUpgradeMultiplier++; // Increase click multiplier
        pointUpgradeCost = Math.floor(pointUpgradeCost * 1.5); // Increase cost for next upgrade
        updateStats();
    }
});

// Handle purchasing auto clicker
buyAutoClickerButton.addEventListener("click", () => {
    if (clicks >= autoClickerCost) {
        clicks -= autoClickerCost;
        autoClickerBought++;
        if (!autoClickerActive) {
            autoClickerInterval = setInterval(() => {
                points += pointUpgradeMultiplier; // Auto-clicker adds points based

