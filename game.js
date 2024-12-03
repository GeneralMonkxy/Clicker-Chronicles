// Game variables
let totalPoints = 0;
let pointsPerClick = 1;
let pointsPerSecond = 0;
let prestigeMultiplier = 0;
let pointsUpgradeCost = 100;
let pointUpgradeLevel = 1;
let pointBankBalance = 0;
let pointBankInterestRate = 1;  // Starts at 1%
let karma = 0;
let autoClickerCost = 1000;

// Point Bank
let pointBankInterval = setInterval(updatePointBank, 5000);  // Update every 5 seconds

// Functions
function updateDisplay() {
    document.getElementById("totalPoints").innerText = `Total Points: ${totalPoints}`;
    document.getElementById("pointsPerClick").innerText = `Points per Click: ${pointsPerClick}`;
    document.getElementById("pointsPerSecond").innerText = `Points per Second: ${pointsPerSecond}`;
    document.getElementById("prestigeMultiplier").innerText = `Prestige Multiplier: ${prestigeMultiplier}x`;
    document.getElementById("karmaAmount").innerText = `Karma: ${karma}`;
    document.getElementById("pointBankBalance").innerText = `Point Bank Balance: ${pointBankBalance}`;
    document.getElementById("upgradeCost").innerText = `Point Upgrade Cost: ${pointsUpgradeCost}`;
    document.getElementById("autoClickerCost").innerText = `Auto Clicker Cost: ${autoClickerCost}`;
}

// Click button
document.getElementById("clickButton").addEventListener("click", function() {
    totalPoints += pointsPerClick;
    updateDisplay();
});

// Prestige button
document.getElementById("prestigeButton").addEventListener("click", function() {
    prestige();
});

// Point Upgrade button
document.getElementById("upgradeButton").addEventListener("click", function() {
    buyPointUpgrade(1);
});

// Auto Clicker button
document.getElementById("autoClickerButton").addEventListener("click", function() {
    buyAutoClicker();
});

// Deposit points into the bank
document.getElementById("depositButton").addEventListener("click", function() {
    const depositAmount = parseInt(document.getElementById("depositAmount").value);
    if (depositAmount <= totalPoints && depositAmount > 0) {
        totalPoints -= depositAmount;
        pointBankBalance += depositAmount;
        updateDisplay();
    }
});

// Donate points to earn Karma
document.getElementById("donateButton").addEventListener("click", function() {
    const donateAmount = parseInt(document.getElementById("donateAmount").value);
    if (donateAmount <= totalPoints && donateAmount > 0) {
        totalPoints -= donateAmount;
        karma += Math.floor(donateAmount / 1000000);  // 1 Karma per million points
        updateDisplay();
    }
});

// Show Point Bank tab
document.getElementById("pointBankTab").addEventListener("click", function() {
    document.getElementById("pointBank").classList.remove("hidden");
    document.getElementById("donationSection").classList.add("hidden");
});

// Show Donation tab
document.getElementById("donationTab").addEventListener("click", function() {
    document.getElementById("donationSection").classList.remove("hidden");
    document.getElementById("pointBank").classList.add("hidden");
});

// Point Bank Interest Update
function updatePointBank() {
    if (pointBankBalance > 0) {
        let interestEarned = pointBankBalance * (pointBankInterestRate / 100);
        pointBankBalance += interestEarned;
        pointBankInterestRate += 0.5;  // Increase interest by 0.5% every 5 seconds
    }
    updateDisplay();
}

// Prestige functionality
function prestige() {
    prestigeMultiplier = Math.floor(totalPoints / 1000);
    totalPoints = 0;
    pointsPerClick = 1;
    pointsPerSecond = 0;
    updateDisplay();
    document.getElementById("prestigeFeedback").innerText = "Prestige Completed ✔";
    setTimeout(() => { document.getElementById("prestigeFeedback").innerText = ""; }, 3000);
}

// Point Upgrade
function buyPointUpgrade(amount) {
    let totalCost = pointsUpgradeCost * amount;
    if (totalPoints >= totalCost) {
        totalPoints -= totalCost;
        pointsPerClick += amount;
        updateDisplay();
        document.getElementById("upgradeFeedback").innerText = `Upgraded ${amount} times ✔`;
        setTimeout(() => { document.getElementById("upgradeFeedback").innerText = ""; }, 3000);
    }
}

// Auto Clicker
function buyAutoClicker() {
    if (totalPoints >= autoClickerCost) {
        totalPoints -= autoClickerCost;
        pointsPerSecond += 1;  // Start adding 1 point per second with the auto clicker
        updateDisplay();
    }
}


