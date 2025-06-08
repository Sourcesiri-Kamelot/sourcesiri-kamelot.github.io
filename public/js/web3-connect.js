// Web3 Wallet Connection and Blockchain Integration
// This script handles wallet connections, blockchain data fetching, and real-time analytics

// Global variables
let userAccount = null;
let web3 = null;
let provider = null;
let chainId = null;
let tokenContract = null;
let isConnected = false;

// Contract addresses (replace with actual contract addresses when deployed)
const CONTRACT_ADDRESSES = {
  HELO_TOKEN: '0x0000000000000000000000000000000000000000', // Replace with actual token contract
  ORB_NFT: '0x0000000000000000000000000000000000000000',   // Replace with actual NFT contract
  STAKING: '0x0000000000000000000000000000000000000000'    // Replace with actual staking contract
};

// ABI definitions (simplified for demo)
const TOKEN_ABI = [
  // ERC-20 standard functions
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)"
];

const NFT_ABI = [
  // ERC-721 standard functions
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)"
];

// Initialize Web3 connection
async function initWeb3() {
  // Check if MetaMask is installed
  if (window.ethereum) {
    try {
      // Request account access
      provider = window.ethereum;
      web3 = new Web3(provider);
      
      // Get the current chain ID
      chainId = await web3.eth.getChainId();
      
      console.log("Web3 initialized successfully");
      console.log("Connected to chain ID:", chainId);
      
      // Setup event listeners for account changes
      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      
      // Initialize the connect wallet button
      setupConnectWalletButton();
      
      return true;
    } catch (error) {
      console.error("User denied account access:", error);
      showError("Please allow access to your wallet to use this dApp.");
      return false;
    }
  } 
  // Check for other web3 providers
  else if (window.web3) {
    provider = window.web3.currentProvider;
    web3 = new Web3(provider);
    console.log("Using legacy web3 provider");
    setupConnectWalletButton();
    return true;
  } 
  // No web3 provider found
  else {
    console.error("No web3 provider detected");
    showError("Please install MetaMask or another web3 wallet to use this dApp.");
    
    // Update UI to show wallet installation options
    document.querySelector('.connect-wallet-btn').textContent = "Install Wallet";
    document.querySelector('.connect-wallet-btn').addEventListener('click', () => {
      window.open('https://metamask.io/download/', '_blank');
    });
    
    return false;
  }
}

// Handle account changes
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // User logged out
    userAccount = null;
    isConnected = false;
    updateUIOnDisconnect();
    console.log("User disconnected wallet");
  } else if (accounts[0] !== userAccount) {
    // Account changed
    userAccount = accounts[0];
    isConnected = true;
    updateUIOnConnect();
    fetchUserData();
    console.log("Account changed to:", userAccount);
  }
}

// Handle chain/network changes
function handleChainChanged(newChainId) {
  // Reload the page when chain changes
  window.location.reload();
}

// Setup connect wallet button
function setupConnectWalletButton() {
  const connectWalletBtn = document.querySelector('.connect-wallet-btn');
  
  connectWalletBtn.addEventListener('click', async () => {
    if (!isConnected) {
      await connectWallet();
    } else {
      // Show wallet info/disconnect options
      toggleWalletMenu();
    }
  });
}

// Connect wallet function
async function connectWallet() {
  try {
    // Request accounts access
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    userAccount = accounts[0];
    isConnected = true;
    
    // Update UI
    updateUIOnConnect();
    
    // Fetch user data
    await fetchUserData();
    
    // Initialize contracts
    initContracts();
    
    // Start real-time data updates
    startRealTimeUpdates();
    
    console.log("Wallet connected:", userAccount);
    showSuccess("Wallet connected successfully!");
    
    return true;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    showError("Failed to connect wallet. Please try again.");
    return false;
  }
}

// Initialize smart contracts
function initContracts() {
  try {
    // Initialize token contract
    tokenContract = new web3.eth.Contract(TOKEN_ABI, CONTRACT_ADDRESSES.HELO_TOKEN);
    
    // Initialize NFT contract
    nftContract = new web3.eth.Contract(NFT_ABI, CONTRACT_ADDRESSES.ORB_NFT);
    
    console.log("Contracts initialized");
  } catch (error) {
    console.error("Error initializing contracts:", error);
  }
}

// Fetch user data from blockchain
async function fetchUserData() {
  if (!userAccount) return;
  
  try {
    // Show loading state
    showLoading(true);
    
    // Fetch token balance (simulated for now)
    const tokenBalance = await fetchTokenBalance();
    
    // Fetch NFT data (simulated for now)
    const nftData = await fetchNFTData();
    
    // Fetch transaction history (simulated for now)
    const txHistory = await fetchTransactionHistory();
    
    // Update UI with fetched data
    updateBalanceUI(tokenBalance);
    updateNFTUI(nftData);
    updateActivityUI(txHistory);
    
    // Hide loading state
    showLoading(false);
  } catch (error) {
    console.error("Error fetching user data:", error);
    showError("Failed to load your blockchain data. Please try again.");
    showLoading(false);
  }
}

// Simulated function to fetch token balance
// Replace with actual blockchain calls when contracts are deployed
async function fetchTokenBalance() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, return mock data
  // In production, use: const balance = await tokenContract.methods.balanceOf(userAccount).call();
  return {
    HELO: 875.4,
    ETH: 0.25,
    BTC: 0.01
  };
}

// Simulated function to fetch NFT data
// Replace with actual blockchain calls when contracts are deployed
async function fetchNFTData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demo purposes, return mock data
  // In production, use NFT contract to fetch actual owned NFTs
  return [
    { id: 1, name: "Anima", level: 7, image: "linear-gradient(135deg, #9932CC, #FFD700)" },
    { id: 2, name: "Cipher", level: 5, image: "linear-gradient(135deg, #00f0ff, #4f46e5)" },
    { id: 3, name: "Nova", level: 3, image: "linear-gradient(135deg, #FF1493, #FFD700)" },
    { id: 4, name: "Quantum", level: 2, image: "linear-gradient(135deg, #00FF00, #00FFFF)" }
  ];
}

// Simulated function to fetch transaction history
// Replace with actual blockchain calls when contracts are deployed
async function fetchTransactionHistory() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // For demo purposes, return mock data
  // In production, use web3.eth.getPastLogs or a subgraph to fetch actual transaction history
  return [
    { type: "Sent HELO", amount: "-50 HELO", timestamp: Date.now() - 3600000 },
    { type: "Minted Orb", amount: "-100 HELO", timestamp: Date.now() - 86400000 },
    { type: "Received ETH", amount: "+0.1 ETH", timestamp: Date.now() - 172800000 }
  ];
}

// Update UI when wallet is connected
function updateUIOnConnect() {
  const connectWalletBtn = document.querySelector('.connect-wallet-btn');
  connectWalletBtn.textContent = `${userAccount.substring(0, 6)}...${userAccount.substring(38)}`;
  connectWalletBtn.classList.add('connected');
  
  // Show user dashboard elements
  document.querySelectorAll('.requires-connection').forEach(el => {
    el.style.display = 'block';
  });
  
  // Hide placeholder content
  document.querySelectorAll('.placeholder-content').forEach(el => {
    el.style.display = 'none';
  });
}

// Update UI when wallet is disconnected
function updateUIOnDisconnect() {
  const connectWalletBtn = document.querySelector('.connect-wallet-btn');
  connectWalletBtn.textContent = "Connect Wallet";
  connectWalletBtn.classList.remove('connected');
  
  // Hide user dashboard elements
  document.querySelectorAll('.requires-connection').forEach(el => {
    el.style.display = 'none';
  });
  
  // Show placeholder content
  document.querySelectorAll('.placeholder-content').forEach(el => {
    el.style.display = 'block';
  });
}

// Update balance UI with fetched data
function updateBalanceUI(balances) {
  // Update total balance (sum of all tokens in USD)
  const totalBalanceElement = document.querySelector('#total-balance');
  if (totalBalanceElement) {
    totalBalanceElement.textContent = '$1,234.56'; // Replace with actual calculation
  }
  
  // Update individual token balances
  const tokenListElement = document.querySelector('#token-list');
  if (tokenListElement) {
    // Clear existing content
    tokenListElement.innerHTML = '';
    
    // Add each token
    for (const [token, amount] of Object.entries(balances)) {
      const tokenElement = document.createElement('div');
      tokenElement.className = 'token-item';
      
      // Determine token icon background
      let tokenBg = '#627EEA'; // Default
      if (token === 'HELO') tokenBg = 'linear-gradient(135deg, #9932CC, #FFD700)';
      if (token === 'BTC') tokenBg = '#F7931A';
      
      tokenElement.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <div style="display: flex; align-items: center;">
            <div style="width: 24px; height: 24px; border-radius: 50%; background: ${tokenBg}; margin-right: 0.5rem;"></div>
            <div>${token}</div>
          </div>
          <div>${amount}</div>
        </div>
      `;
      
      tokenListElement.appendChild(tokenElement);
    }
  }
}

// Update NFT UI with fetched data
function updateNFTUI(nfts) {
  const orbCollectionElement = document.querySelector('.orb-collection');
  if (orbCollectionElement) {
    // Clear existing content
    orbCollectionElement.innerHTML = '';
    
    // Add each NFT
    nfts.forEach(nft => {
      const nftElement = document.createElement('div');
      nftElement.className = 'orb-item';
      nftElement.innerHTML = `
        <div class="orb-icon" style="background: ${nft.image};"></div>
        <div class="orb-name">${nft.name}</div>
        <div class="orb-level">Level ${nft.level}</div>
      `;
      
      orbCollectionElement.appendChild(nftElement);
    });
    
    // Add "New Orb" button
    const newOrbElement = document.createElement('div');
    newOrbElement.className = 'orb-item';
    newOrbElement.innerHTML = `
      <div class="orb-icon" style="background: rgba(255, 255, 255, 0.1); border: 2px dashed rgba(255, 255, 255, 0.3);"></div>
      <div class="orb-name">+ New Orb</div>
      <div class="orb-level">Mint</div>
    `;
    
    newOrbElement.addEventListener('click', () => {
      mintNewOrb();
    });
    
    orbCollectionElement.appendChild(newOrbElement);
  }
}

// Update activity UI with fetched data
function updateActivityUI(transactions) {
  const activityElement = document.querySelector('#activity-list');
  if (activityElement) {
    // Clear existing content
    activityElement.innerHTML = '';
    
    // Add each transaction
    transactions.forEach((tx, index) => {
      const txElement = document.createElement('div');
      
      // Determine if this is the last item
      const isLast = index === transactions.length - 1;
      
      txElement.style.display = 'flex';
      txElement.style.justifyContent = 'space-between';
      txElement.style.marginBottom = isLast ? '0' : '0.5rem';
      txElement.style.paddingBottom = isLast ? '0' : '0.5rem';
      txElement.style.borderBottom = isLast ? 'none' : '1px solid rgba(255, 255, 255, 0.1)';
      
      // Determine color based on transaction type
      const isNegative = tx.amount.startsWith('-');
      const amountColor = isNegative ? '#FF6B6B' : '#4ECB71';
      
      txElement.innerHTML = `
        <div>${tx.type}</div>
        <div style="color: ${amountColor};">${tx.amount}</div>
      `;
      
      activityElement.appendChild(txElement);
    });
  }
}

// Start real-time data updates
function startRealTimeUpdates() {
  // Update price chart with real-time data
  startPriceUpdates();
  
  // Update activity chart with real-time data
  startActivityUpdates();
  
  // Poll for balance updates every 30 seconds
  setInterval(async () => {
    if (isConnected) {
      const tokenBalance = await fetchTokenBalance();
      updateBalanceUI(tokenBalance);
    }
  }, 30000);
}

// Simulate real-time price updates
function startPriceUpdates() {
  // Get the price chart
  const priceChart = Chart.getChart('priceChart');
  if (!priceChart) return;
  
  // Update price every 10 seconds
  setInterval(() => {
    // Get current price
    const currentPrice = priceChart.data.datasets[0].data;
    const lastPrice = currentPrice[currentPrice.length - 1];
    
    // Generate new price with small random change
    const change = (Math.random() - 0.5) * 0.05; // -0.025 to +0.025
    const newPrice = Math.max(0, lastPrice + change);
    
    // Remove first data point and add new one
    currentPrice.shift();
    currentPrice.push(newPrice.toFixed(2));
    
    // Update chart
    priceChart.update();
    
    // Update price display
    document.querySelectorAll('.metric-value')[0].textContent = `$${newPrice.toFixed(2)}`;
    
    // Update 24h change
    const priceChange = ((newPrice - currentPrice[0]) / currentPrice[0] * 100).toFixed(1);
    const changeElement = document.querySelectorAll('.metric-value')[1];
    changeElement.textContent = `${priceChange > 0 ? '+' : ''}${priceChange}%`;
    changeElement.style.color = priceChange >= 0 ? '#4ECB71' : '#FF6B6B';
    
  }, 10000);
}

// Simulate real-time activity updates
function startActivityUpdates() {
  // Get the activity chart
  const activityChart = Chart.getChart('activityChart');
  if (!activityChart) return;
  
  // Update activity every 60 seconds
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
    
    // Update total members metric with small increase
    const membersElement = document.querySelectorAll('.metrics-grid .metric-value')[4];
    if (membersElement) {
      const currentMembers = parseInt(membersElement.textContent.replace(',', ''));
      const newMembers = currentMembers + Math.floor(Math.random() * 10);
      membersElement.textContent = newMembers.toLocaleString();
    }
    
  }, 60000);
}

// Function to mint a new NFT orb
async function mintNewOrb() {
  if (!isConnected) {
    showError("Please connect your wallet first");
    return;
  }
  
  try {
    showLoading(true);
    
    // In production, call the actual contract method
    // await nftContract.methods.mintOrb().send({ from: userAccount });
    
    // For demo, simulate minting delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add new orb to UI (simulated)
    const newOrb = {
      id: Math.floor(Math.random() * 1000),
      name: "Genesis",
      level: 1,
      image: "linear-gradient(135deg, #FF6B6B, #FFD700)"
    };
    
    // Update NFT UI
    const currentNfts = await fetchNFTData();
    currentNfts.push(newOrb);
    updateNFTUI(currentNfts);
    
    // Update transaction history
    const txHistory = await fetchTransactionHistory();
    txHistory.unshift({
      type: "Minted Orb",
      amount: "-100 HELO",
      timestamp: Date.now()
    });
    updateActivityUI(txHistory);
    
    showLoading(false);
    showSuccess("New AI Orb minted successfully!");
  } catch (error) {
    console.error("Error minting new orb:", error);
    showError("Failed to mint new orb. Please try again.");
    showLoading(false);
  }
}

// Toggle wallet menu
function toggleWalletMenu() {
  const walletMenu = document.querySelector('#wallet-menu');
  if (walletMenu) {
    walletMenu.classList.toggle('open');
  } else {
    // Create wallet menu if it doesn't exist
    createWalletMenu();
  }
}

// Create wallet menu
function createWalletMenu() {
  const menu = document.createElement('div');
  menu.id = 'wallet-menu';
  menu.className = 'wallet-menu open';
  
  menu.innerHTML = `
    <div class="wallet-menu-header">
      <div class="wallet-address">${userAccount}</div>
      <button class="copy-address" title="Copy Address">
        <i class="fas fa-copy"></i>
      </button>
    </div>
    <div class="wallet-menu-option" id="view-on-explorer">
      <i class="fas fa-external-link-alt"></i> View on Explorer
    </div>
    <div class="wallet-menu-option" id="disconnect-wallet">
      <i class="fas fa-sign-out-alt"></i> Disconnect
    </div>
  `;
  
  document.body.appendChild(menu);
  
  // Position the menu
  const connectBtn = document.querySelector('.connect-wallet-btn');
  const rect = connectBtn.getBoundingClientRect();
  menu.style.top = `${rect.bottom + 10}px`;
  menu.style.right = `${window.innerWidth - rect.right}px`;
  
  // Add event listeners
  document.querySelector('#view-on-explorer').addEventListener('click', () => {
    // Open explorer based on current chain
    let explorerUrl = 'https://etherscan.io/address/';
    if (chainId === 137) explorerUrl = 'https://polygonscan.com/address/';
    if (chainId === 56) explorerUrl = 'https://bscscan.com/address/';
    
    window.open(explorerUrl + userAccount, '_blank');
    toggleWalletMenu();
  });
  
  document.querySelector('#disconnect-wallet').addEventListener('click', () => {
    disconnectWallet();
    toggleWalletMenu();
  });
  
  document.querySelector('.copy-address').addEventListener('click', () => {
    navigator.clipboard.writeText(userAccount);
    showSuccess("Address copied to clipboard!");
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const menu = document.querySelector('#wallet-menu');
    const connectBtn = document.querySelector('.connect-wallet-btn');
    
    if (menu && !menu.contains(e.target) && e.target !== connectBtn) {
      menu.classList.remove('open');
    }
  });
}

// Disconnect wallet
function disconnectWallet() {
  userAccount = null;
  isConnected = false;
  updateUIOnDisconnect();
  
  // Remove wallet menu
  const menu = document.querySelector('#wallet-menu');
  if (menu) {
    menu.remove();
  }
  
  showSuccess("Wallet disconnected");
}

// Show loading state
function showLoading(isLoading) {
  // Find or create loading overlay
  let loadingOverlay = document.querySelector('#loading-overlay');
  
  if (isLoading) {
    if (!loadingOverlay) {
      loadingOverlay = document.createElement('div');
      loadingOverlay.id = 'loading-overlay';
      loadingOverlay.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">Loading...</div>
      `;
      document.body.appendChild(loadingOverlay);
    }
    loadingOverlay.style.display = 'flex';
  } else if (loadingOverlay) {
    loadingOverlay.style.display = 'none';
  }
}

// Show error message
function showError(message) {
  showNotification(message, 'error');
}

// Show success message
function showSuccess(message) {
  showNotification(message, 'success');
}

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  // Set icon based on type
  let icon = 'info-circle';
  if (type === 'error') icon = 'exclamation-circle';
  if (type === 'success') icon = 'check-circle';
  
  notification.innerHTML = `
    <i class="fas fa-${icon}"></i>
    <span>${message}</span>
  `;
  
  // Add to document
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Remove after delay
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  // Add Web3 CSS
  addWeb3CSS();
  
  // Initialize Web3
  await initWeb3();
});

// Add Web3 CSS styles
function addWeb3CSS() {
  const style = document.createElement('style');
  style.textContent = `
    /* Wallet connection styles */
    .connect-wallet-btn.connected {
      background: linear-gradient(135deg, #9932CC, #FFD700);
    }
    
    /* Wallet menu styles */
    .wallet-menu {
      position: absolute;
      background: rgba(10, 0, 20, 0.95);
      border: 1px solid rgba(153, 50, 204, 0.5);
      border-radius: 12px;
      padding: 1rem;
      min-width: 250px;
      z-index: 1000;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(10px);
      transform: translateY(-10px);
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s ease;
    }
    
    .wallet-menu.open {
      transform: translateY(0);
      opacity: 1;
      pointer-events: all;
    }
    
    .wallet-menu-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .wallet-address {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.7);
      word-break: break-all;
    }
    
    .copy-address {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      padding: 5px;
      transition: all 0.3s ease;
    }
    
    .copy-address:hover {
      color: rgba(255, 255, 255, 0.9);
    }
    
    .wallet-menu-option {
      padding: 0.75rem 0;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
    }
    
    .wallet-menu-option i {
      margin-right: 0.5rem;
    }
    
    .wallet-menu-option:hover {
      color: rgba(0, 255, 136, 0.8);
    }
    
    /* Loading overlay */
    #loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      backdrop-filter: blur(5px);
    }
    
    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(255, 255, 255, 0.1);
      border-top: 5px solid rgba(153, 50, 204, 1);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }
    
    .loading-text {
      color: white;
      font-size: 1.2rem;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* Notification styles */
    .notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(10, 0, 20, 0.9);
      border-left: 4px solid #4F46E5;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      transform: translateX(120%);
      transition: transform 0.3s ease;
      z-index: 1000;
      max-width: 350px;
    }
    
    .notification.show {
      transform: translateX(0);
    }
    
    .notification i {
      margin-right: 0.75rem;
      font-size: 1.2rem;
    }
    
    .notification.success {
      border-left-color: #4ECB71;
    }
    
    .notification.success i {
      color: #4ECB71;
    }
    
    .notification.error {
      border-left-color: #FF6B6B;
    }
    
    .notification.error i {
      color: #FF6B6B;
    }
    
    /* Token list styles */
    #token-list {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    
    /* Activity list styles */
    #activity-list {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      padding: 1rem;
    }
  `;
  
  document.head.appendChild(style);
}
