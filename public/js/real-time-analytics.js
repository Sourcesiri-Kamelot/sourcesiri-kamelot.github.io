// Real-time Analytics for Web3 Dashboard
// This script handles fetching and displaying real-time blockchain and market data

// Global variables
let priceSocket = null;
let analyticsSocket = null;
let marketDataInterval = null;
let networkStatsInterval = null;

// API endpoints (replace with actual endpoints)
const API_ENDPOINTS = {
  PRICE_FEED: 'wss://api.example.com/price-feed',
  ANALYTICS: 'wss://api.example.com/analytics',
  MARKET_DATA: 'https://api.example.com/market-data',
  NETWORK_STATS: 'https://api.example.com/network-stats'
};

// Initialize real-time data feeds
function initRealTimeData() {
  // Start simulated data if no wallet is connected
  if (!window.isConnected) {
    startSimulatedDataFeeds();
  } else {
    // Connect to real data feeds
    connectToPriceFeeds();
    connectToAnalytics();
    fetchMarketData();
    fetchNetworkStats();
  }
  
  // Setup refresh intervals
  setupRefreshIntervals();
}

// Connect to price WebSocket feed
function connectToPriceFeeds() {
  try {
    // In a real implementation, connect to actual WebSocket
    // priceSocket = new WebSocket(API_ENDPOINTS.PRICE_FEED);
    
    // For demo, we'll simulate WebSocket with intervals
    console.log("Connected to price feed");
    
    // Simulate incoming price data
    simulatePriceUpdates();
  } catch (error) {
    console.error("Error connecting to price feed:", error);
    // Fall back to simulation
    simulatePriceUpdates();
  }
}

// Connect to analytics WebSocket feed
function connectToAnalytics() {
  try {
    // In a real implementation, connect to actual WebSocket
    // analyticsSocket = new WebSocket(API_ENDPOINTS.ANALYTICS);
    
    // For demo, we'll simulate WebSocket with intervals
    console.log("Connected to analytics feed");
    
    // Simulate incoming analytics data
    simulateAnalyticsUpdates();
  } catch (error) {
    console.error("Error connecting to analytics feed:", error);
    // Fall back to simulation
    simulateAnalyticsUpdates();
  }
}

// Fetch market data from API
async function fetchMarketData() {
  try {
    // In a real implementation, fetch from actual API
    // const response = await fetch(API_ENDPOINTS.MARKET_DATA);
    // const data = await response.json();
    
    // For demo, use simulated data
    const data = generateMarketData();
    
    // Update UI with market data
    updateMarketDataUI(data);
    
    console.log("Market data updated");
  } catch (error) {
    console.error("Error fetching market data:", error);
    // Use fallback data
    updateMarketDataUI(generateMarketData());
  }
}

// Fetch network statistics from API
async function fetchNetworkStats() {
  try {
    // In a real implementation, fetch from actual API
    // const response = await fetch(API_ENDPOINTS.NETWORK_STATS);
    // const data = await response.json();
    
    // For demo, use simulated data
    const data = generateNetworkStats();
    
    // Update UI with network stats
    updateNetworkStatsUI(data);
    
    console.log("Network stats updated");
  } catch (error) {
    console.error("Error fetching network stats:", error);
    // Use fallback data
    updateNetworkStatsUI(generateNetworkStats());
  }
}

// Setup refresh intervals for data that needs periodic updates
function setupRefreshIntervals() {
  // Refresh market data every 2 minutes
  marketDataInterval = setInterval(fetchMarketData, 120000);
  
  // Refresh network stats every 5 minutes
  networkStatsInterval = setInterval(fetchNetworkStats, 300000);
}

// Start simulated data feeds when no real connections are available
function startSimulatedDataFeeds() {
  console.log("Starting simulated data feeds");
  
  // Simulate price updates
  simulatePriceUpdates();
  
  // Simulate analytics updates
  simulateAnalyticsUpdates();
  
  // Generate initial market data
  updateMarketDataUI(generateMarketData());
  
  // Generate initial network stats
  updateNetworkStatsUI(generateNetworkStats());
}

// Simulate price updates
function simulatePriceUpdates() {
  // Get the price chart
  const priceChart = Chart.getChart('priceChart');
  if (!priceChart) return;
  
  // Update price every 10 seconds
  setInterval(() => {
    // Get current price
    const currentPrice = priceChart.data.datasets[0].data;
    const lastPrice = parseFloat(currentPrice[currentPrice.length - 1]);
    
    // Generate new price with small random change
    const change = (Math.random() - 0.5) * 0.05; // -0.025 to +0.025
    const newPrice = Math.max(0, lastPrice + change);
    
    // Remove first data point and add new one
    currentPrice.shift();
    currentPrice.push(newPrice.toFixed(2));
    
    // Update chart
    priceChart.update();
    
    // Update price display
    const priceElement = document.querySelector('.metric-value');
    if (priceElement) {
      priceElement.textContent = `$${newPrice.toFixed(2)}`;
    }
    
    // Update 24h change
    const priceChange = ((newPrice - currentPrice[0]) / currentPrice[0] * 100).toFixed(1);
    const changeElement = document.querySelectorAll('.metric-value')[1];
    if (changeElement) {
      changeElement.textContent = `${priceChange > 0 ? '+' : ''}${priceChange}%`;
      changeElement.style.color = priceChange >= 0 ? '#4ECB71' : '#FF6B6B';
    }
    
  }, 10000);
}

// Simulate analytics updates
function simulateAnalyticsUpdates() {
  // Get the activity chart
  const activityChart = Chart.getChart('activityChart');
  if (!activityChart) return;
  
  // Update activity every 30 seconds
  setInterval(() => {
    // Get current data
    const currentData = activityChart.data.datasets[0].data;
    
    // Generate new data point with random change
    const lastValue = currentData[currentData.length - 1];
    const change = Math.floor(Math.random() * 400) - 200; // -200 to +200
    const newValue = Math.max(500, lastValue + change);
    
    // Remove first data point and add new one
    currentData.shift();
    currentData.push(newValue);
    
    // Update chart
    activityChart.update();
    
    // Update metrics with small increases
    updateAnalyticsMetrics();
    
  }, 30000);
}

// Update analytics metrics with small increases
function updateAnalyticsMetrics() {
  // Find all metric values in the analytics card
  const metricElements = document.querySelectorAll('.dashboard-card:nth-child(3) .metric-value');
  
  // Update each metric with a small increase
  metricElements.forEach((element, index) => {
    // Parse current value
    let currentValue = element.textContent;
    let suffix = '';
    
    // Handle values with suffixes (K, M, %)
    if (currentValue.includes('K')) {
      currentValue = parseFloat(currentValue) * 1000;
      suffix = 'K';
    } else if (currentValue.includes('M')) {
      currentValue = parseFloat(currentValue) * 1000000;
      suffix = 'M';
    } else if (currentValue.includes('%')) {
      currentValue = parseFloat(currentValue);
      suffix = '%';
    } else {
      currentValue = parseFloat(currentValue.replace(/,/g, ''));
    }
    
    // Generate increase based on metric type
    let increase = 0;
    switch (index) {
      case 0: // Total Members
        increase = Math.floor(Math.random() * 10); // 0-10 new members
        break;
      case 1: // AI Orbs Created
        increase = Math.floor(Math.random() * 50); // 0-50 new orbs
        break;
      case 2: // Interactions
        increase = Math.floor(Math.random() * 10000); // 0-10000 new interactions
        break;
      case 3: // Growth Rate
        increase = (Math.random() * 0.5) - 0.1; // -0.1% to +0.4%
        break;
    }
    
    // Calculate new value
    let newValue = currentValue + increase;
    
    // Format the value based on its magnitude and suffix
    if (suffix === 'M') {
      element.textContent = (newValue / 1000000).toFixed(1) + suffix;
    } else if (suffix === 'K') {
      element.textContent = (newValue / 1000).toFixed(1) + suffix;
    } else if (suffix === '%') {
      element.textContent = newValue.toFixed(1) + suffix;
    } else {
      element.textContent = newValue.toLocaleString();
    }
  });
}

// Generate simulated market data
function generateMarketData() {
  return {
    price: 1.40,
    priceChange24h: 5.2,
    marketCap: 14200000,
    volume24h: 3500000,
    circulatingSupply: 10000000,
    totalSupply: 100000000
  };
}

// Generate simulated network stats
function generateNetworkStats() {
  return {
    totalMembers: 2847,
    activeMembers24h: 1253,
    totalOrbs: 12392,
    orbsMinted24h: 342,
    totalInteractions: 5200000,
    interactionsPerDay: 120000,
    growthRate: 87
  };
}

// Update UI with market data
function updateMarketDataUI(data) {
  // Update price
  const priceElement = document.querySelector('.metric-value');
  if (priceElement) {
    priceElement.textContent = `$${data.price.toFixed(2)}`;
  }
  
  // Update 24h change
  const changeElement = document.querySelectorAll('.metric-value')[1];
  if (changeElement) {
    changeElement.textContent = `${data.priceChange24h > 0 ? '+' : ''}${data.priceChange24h.toFixed(1)}%`;
    changeElement.style.color = data.priceChange24h >= 0 ? '#4ECB71' : '#FF6B6B';
  }
  
  // Update market cap
  const marketCapElement = document.querySelectorAll('.metric-value')[2];
  if (marketCapElement) {
    marketCapElement.textContent = `$${(data.marketCap / 1000000).toFixed(1)}M`;
  }
}

// Update UI with network stats
function updateNetworkStatsUI(data) {
  // Find all metric values in the analytics card
  const metricElements = document.querySelectorAll('.dashboard-card:nth-child(3) .metric-value');
  
  // Update metrics if elements exist
  if (metricElements.length >= 4) {
    metricElements[0].textContent = data.totalMembers.toLocaleString();
    metricElements[1].textContent = data.totalOrbs.toLocaleString();
    metricElements[2].textContent = `${(data.totalInteractions / 1000000).toFixed(1)}M`;
    metricElements[3].textContent = `${data.growthRate}%`;
  }
}

// Clean up resources when page is unloaded
function cleanupDataFeeds() {
  // Close WebSocket connections
  if (priceSocket) priceSocket.close();
  if (analyticsSocket) analyticsSocket.close();
  
  // Clear intervals
  clearInterval(marketDataInterval);
  clearInterval(networkStatsInterval);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize real-time data
  initRealTimeData();
  
  // Setup cleanup on page unload
  window.addEventListener('beforeunload', cleanupDataFeeds);
});
