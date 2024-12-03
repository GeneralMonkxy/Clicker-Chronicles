// Initial game state
let clicks = 0; // Number of clicks
let cpc = 1; // Clicks per click (CPC)
let multiplier = 1; // Multiplier based on prestige
let upgradeCost = 100; // Cost of next CPC upgrade
let cpcUpgrades = 0; // Track number of upgrades

// DOM elements
const clickBtn = document.getElementById('click-btn');
const clicksDisplay = document.getElementById('clicks-display');
const cpcDisplay = document.getElementById('cpc-display');
const multiplierDisplay = document.getElementById('multiplier-display');
const buyCpcBtn = document.getElementById('buy-cpc');
const prestigeBtn = document.getElementById('prestige-btn');
const upgradeCostDisplay = document.getElementById('upgrade-cost');

// Event listener for clicking the click button
clickBtn.addEventListener('click', () => {
    clicks += cpc * multiplier; // Add clicks based on CPC and multiplier
    updateUI();
});

// Event listener for buying CPC upgrades
buyCpcBtn.addEventListener('click', () => {
    if (clicks >= upgradeCost) {
        clicks -= upgradeCost;
        cpc += 1;
        upgradeCost *= 1.5; // Increase the cost of the next upgrade
        cpcUpgrades += 1;
        updateUI();
    }
});

// Event listener for prestiging
prestigeBtn.addEventListener('click', () => {
    if (clicks >= 1000) { // Player must have at least 1000 clicks to prestige
        let prestigeMultiplier = Math.floor(clicks / 1000); // Calculate the prestige multiplier
        multiplier = prestigeMultiplier || 1; // Default multiplier to 1 if 0
        clicks = 0; // Reset clicks
        cpc = 1; // Reset CPC to 1
        upgradeCost = 100; // Reset upgrade cost
        cpcUpgrades = 0; // Reset upgrades
        updateUI();
    }
});

// Function to update UI elements
function updateUI() {
    clicksDisplay.textContent = `Clicks: ${Math.floor(clicks)}`;
    cpcDisplay.textContent = `CPC: ${cpc}`;
    multiplierDisplay.textContent = `Multiplier: ${multiplier}`;
    upgradeCostDisplay.textContent = `Next Upgrade Cost: ${Math.floor(upgradeCost)}`;
    
    // Enable or disable prestige button
    prestigeBtn.disabled = clicks < 1000; // Player can prestige only if they have at least 1000 clicks
}

// Initial UI update
updateUI();
