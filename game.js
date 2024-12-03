let clicks = 0;
let points = 0;
let multiplier = 1;
let pointUpgradeCost = 100;
let prestigeClicks = 0;
let prestigeMultiplier = 1;
let pointUpgradeLevel = 0;

const clickButton = document.getElementById("click-button");
const prestigeButton = document.getElementById("prestige-button");
const pointUpgradeButton = document.getElementById("point-upgrade-button");
const clicksDisplay = document.getElementById("clicks");
const pointsDisplay = document.getElementById("points");
const multiplierDisplay = document.getElementById("multiplier");
const pointUpgradeCostDisplay = document.getElementById("point-upgrade-cost");
const prestigeCostDisplay = document.getElementById("prestige-cost");

clickButton.addEventListener("click", () => {
    // Increase clicks by 1 * multiplier
    clicks += multiplier;
    points += multiplier;
    updateDisplay();
});

prestigeButton.addEventListener("click", () => {
    if (clicks >= 1000) {
        prestige();
    } else {
        alert("You need at least 1000 clicks to prestige!");
    }
});

pointUpgradeButton.addEventListener("click", () => {
    if (points >= pointUpgradeCost) {
        points -= pointUpgradeCost;
        pointUpgradeLevel++;
        multiplier += 1; // Increase multiplier for each point upgrade
        pointUpgradeCost = Math.floor(pointUpgradeCost * 1.5); // Increase cost for the next upgrade
        updateDisplay();
    } else {
        alert("Not enough points for Point Upgrade!");
    }
});

function prestige() {
    prestigeClicks = clicks;
    clicks = 0;
    points = 0;
    multiplier = 1;
    pointUpgradeLevel = 0;
    pointUpgradeCost = 100;
    prestigeMultiplier = Math.floor(prestigeClicks / 1000);
    if (prestigeMultiplier < 1) prestigeMultiplier = 1; // Prevent negative multiplier
    updateDisplay();
    alert(`Prestige successful! You now have a multiplier of x${prestigeMultiplier}`);
}

function updateDisplay() {
    clicksDisplay.textContent = `Clicks: ${clicks}`;
    pointsDisplay.textContent = `Points: ${points}`;
    multiplierDisplay.textContent = `Multiplier: x${multiplier}`;
    pointUpgradeCostDisplay.textContent = `Point Upgrade Cost: ${pointUpgradeCost} points`;
    prestigeCostDisplay.textContent = `Prestige Cost: 1000 clicks (multiplier: x${prestigeMultiplier})`;
}

// Initial update of the display
updateDisplay();


