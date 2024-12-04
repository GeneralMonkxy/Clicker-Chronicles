let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;
let pointsPerClick = localStorage.getItem('pointsPerClick') ? parseInt(localStorage.getItem('pointsPerClick')) : 1;
let karma = localStorage.getItem('karma') ? parseInt(localStorage.getItem('karma')) : 0;
let helpers = localStorage.getItem('helpers') ? parseInt(localStorage.getItem('helpers')) : 0;
let upgradeCost = 15; // Cost of point upgrade

// Buttons
const clickButton = document.getElementById('clickButton');
const donateButton = document.getElementById('donateButton');
const buyHelperButton = document.getElementById('helperButton');

// Stats Display
const totalPoints = document.getElementById('totalPoints');
const pointsPerClickDisplay = document.getElementById('pointsPerClick');
const karmaAmount = document.getElementById('karmaAmount');
const helperAmount = document.getElementById('helperAmount');
const upgradeCostDisplay = document.getElementById('upgradeCost');

// Functions

// Clicking gives points
clickButton.addEventListener('click', () => {
    points += pointsPerClick;
    updateStats();
    saveGameData();
});

// Donate Points to Earn Karma
donateButton.addEventListener('click', () => {
    let donateAmount = parseInt(document.getElementById('donateAmount').value);
    if (donateAmount >= 1000000 && donateAmount <= points) {
        let donatedKarma = Math.floor(donateAmount / 1000000); // 1 million points = 1 karma
        karma += donatedKarma;
        points -= donateAmount;
        updateStats();
        saveGameData();
    } else {
        alert("Donate in multiples of 1 million points.");
    }
});

// Buy Helper with Karma
buyHelperButton.addEventListener('click', () => {
    if (karma >= 10) {  // Each helper costs 10 karma
        karma -= 10;
        helpers++;
        pointsPerClick += 1; // Each helper increases points per click
        updateStats();
        saveGameData();
    } else {
        alert("Not enough karma for a helper.");
    }
});

// Update Display
function updateStats() {
    totalPoints.textContent = `Points: ${points}`;
    pointsPerClickDisplay.textContent = `Points per Click: ${pointsPerClick}`;
    karmaAmount.textContent = `Karma: ${karma}`;
    helperAmount.textContent = `Helpers: ${helpers}`;
    upgradeCostDisplay.textContent = `Point Upgrade Cost: ${upgradeCost}`;
}

// Save Game Data to localStorage
function saveGameData() {
    localStorage.setItem('points', points);
    localStorage.setItem('pointsPerClick', pointsPerClick);
    localStorage.setItem('karma', karma);
    localStorage.setItem('helpers', helpers);
}

// Load initial stats on page load
window.onload = updateStats;






