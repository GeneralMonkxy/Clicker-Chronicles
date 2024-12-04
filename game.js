// Load saved data from localStorage or initialize to default values
let points = localStorage.getItem('points') ? parseInt(localStorage.getItem('points')) : 0;
let pointsPerClick = localStorage.getItem('pointsPerClick') ? parseInt(localStorage.getItem('pointsPerClick')) : 1;
let karma = localStorage.getItem('karma') ? parseInt(localStorage.getItem('karma')) : 0;
let helpers = localStorage.getItem('helpers') ? parseInt(localStorage.getItem('helpers')) : 0;
let upgradeCost = 15; // Starting cost for point upgrade

// DOM Elements
const clickButton = document.getElementById('clickButton');
const donateButton = document.getElementById('donateButton');
const buyHelperButton = document.getElementById('helperButton');
const totalPoints = document.getElementById('totalPoints');
const pointsPerClickDisplay = document.getElementById('pointsPerClick');
const karmaAmount = document.getElementById('karmaAmount');
const helperAmount = document.getElementById('helperAmount');
const upgradeCostDisplay = document.getElementById('upgradeCost');
const donateAmountInput = document.getElementById('donateAmount');

// Functions

// Clicking the button adds points based on pointsPerClick
clickButton.addEventListener('click', () => {
    points += pointsPerClick;
    updateStats();
    saveGameData();
});

// Donate points to get Karma (1 million points = 1 karma)
donateButton.addEventListener('click', () => {
    let donateAmount = parseInt(donateAmountInput.value);
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

// Buy helpers using karma. Each helper increases points per click by 1.
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

// Function to update stats display
function updateStats() {
    totalPoints.textContent = `Points: ${points}`;
    pointsPerClickDisplay.textContent = `Points per Click: ${pointsPerClick}`;
    karmaAmount.textContent = `Karma: ${karma}`;
    helperAmount.textContent = `Helpers: ${helpers}`;
    upgradeCostDisplay.textContent = `Point Upgrade Cost: ${upgradeCost}`;
}

// Function to save game data to localStorage
function saveGameData() {
    localStorage.setItem('points', points);
    localStorage.setItem('pointsPerClick', pointsPerClick);
    localStorage.setItem('karma', karma);
    localStorage.setItem('helpers', helpers);
}

// Load initial stats from localStorage when the page loads
window.onload = updateStats;







