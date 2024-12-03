// Game variables
let totalPoints = 0;  // Total points
let pointsPerClick = 1;  // Points gained per click
let pointsPerSecond = 0;  // Points gained per second (auto clicker)
let prestigeMultiplier = 0;  // Multiplier after prestige
let pointsUpgradeCost = 100;  // Cost of each point upgrade
let pointUpgradeLevel = 1;  // Initial point upgrade level

// Update the display
function updateDisplay() {
    document.getElementById("totalPoints").innerText = `Total Points: ${totalPoints}`;
    document.getElementById("pointsPerClick").innerText = `Points per Click: ${pointsPerClick}`;
    document.getElementById("pointsPerSecond").innerText = `Points per Second: ${pointsPerSecond}`;
    document.getElementById("prestigeMultiplier").innerText = `Prestige Multiplier: ${prestigeMultiplier}x`;
    document.getElementById("upgradeCost").innerText = `Point Upgrade Cost: ${pointsUpgradeCost}`;
}

// Add points when the player clicks
function addPoints() {
    totalPoints += pointsPerClick;
    updateDisplay();
}

// Prestige function
function prestige() {
    // Calculate the new prestige multiplier based on points
    prestigeMultiplier = Math.floor(totalPoints / 1000);  // 1x per 1000 points
    totalPoints = 0;  // Reset points after prestige
    pointsPerClick = 1;  // Reset points per click after prestige
    pointsPerSecond = 0;  // Reset points per second after prestige
    updateDisplay();
}

// Point upgrade function
function buyPointUpgrade() {
    if (totalPoints >= pointsUpgradeCost) {
        totalPoints -= pointsUpgradeCost;
        pointsPerClick += pointUpgradeLevel;
        pointsUpgradeCost *= 1.5;  // Increase the upgrade cost for the next level
        updateDisplay();
    } else {
        alert("Not enough points for this upgrade!");
    }
}

// Simulate points per second
function startAutoClicker() {
    setInterval(() => {
        totalPoints += pointsPerSecond;
        updateDisplay();
    }, 1000); // Gain points per second every 1 second
}

// Buy auto clicker upgrade (increases points per second)
function buyAutoClickerUpgrade() {
    if (totalPoints >= 1000) {
        totalPoints -= 1000;
        pointsPerSecond += 1;
        updateDisplay();
    } else {
        alert("Not enough points for this upgrade!");
    }
}

// Initialize the game
function initGame() {
    updateDisplay();
    startAutoClicker();  // Start the auto clicker
}

document.getElementById("clickButton").addEventListener("click", addPoints);
document.getElementById("prestigeButton").addEventListener("click", prestige);
document.getElementById("upgradeButton").addEventListener("click", buyPointUpgrade);
document.getElementById("autoClickerButton").addEventListener("click", buyAutoClickerUpgrade);

initGame();


