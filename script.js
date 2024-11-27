let balance = 1000;
let portfolio = {
  weazel: 0,
  maze: 0,
  lifeinvader: 0
};

const stockPrices = {
  weazel: 100,
  maze: 150,
  lifeinvader: 200
};

// Function to switch between tabs
function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  document.getElementById(tabName).classList.add('active');
}

// Function to update the balance on the page
function updateBalance() {
  document.getElementById('balance').innerText = balance;
}

// Function to buy a stock
function buyStock(stock) {
  const stockPrice = stockPrices[stock];
  if (balance >= stockPrice) {
    balance -= stockPrice;
    portfolio[stock]++;
    stockPrices[stock] *= 1.1; // Increase stock price by 10%
    updateBalance();
    updatePortfolio();
    updateStockPriceDisplay();
  } else {
    alert('Not enough funds!');
  }
}

// Function to sell a stock
function sellStock(stock) {
  if (portfolio[stock] > 0) {
    const stockPrice = stockPrices[stock];
    balance += stockPrice * 0.8; // Decrease stock price by 20%
    portfolio[stock]--;
    updateBalance();
    updatePortfolio();
    updateStockPriceDisplay();
  } else {
    alert('You don\'t own any of this stock!');
  }
}

// Function to update the portfolio display
function updatePortfolio() {
  const portfolioList = document.getElementById('portfolio-list');
  portfolioList.innerHTML = '';

  for (let stock in portfolio) {
    if (portfolio[stock] > 0) {
      const portfolioItem = document.createElement('div');
      portfolioItem.classList.add('portfolio-item');
      portfolioItem.innerHTML = `${stock}: ${portfolio[stock]} shares`;
      portfolioList.appendChild(portfolioItem);
    }
  }

  if (Object.values(portfolio).every(amount => amount === 0)) {
    portfolioList.innerHTML = '<p>No stocks bought yet.</p>';
  }
}

// Function to update the stock price display
function updateStockPriceDisplay() {
  document.getElementById('price-weazel').innerText = stockPrices.weazel.toFixed(2);
  document.getElementById('price-maze').innerText = stockPrices.maze.toFixed(2);
  document.getElementById('price-lifeinvader').innerText = stockPrices.lifeinvader.toFixed(2);
}

// Initialize the page
showTab('marketplace');
updateBalance();
updateStockPriceDisplay();
