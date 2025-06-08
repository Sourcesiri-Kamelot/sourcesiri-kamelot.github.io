// WalletConnect Component
// This component handles wallet connection UI and interactions

class WalletConnect {
  constructor(options = {}) {
    this.options = {
      buttonSelector: '.connect-wallet-btn',
      containerSelector: '#wallet-container',
      onConnect: null,
      onDisconnect: null,
      theme: 'dark',
      ...options
    };
    
    this.isConnected = false;
    this.userAccount = null;
    this.provider = null;
    this.chainId = null;
    
    this.init();
  }
  
  async init() {
    // Find button element
    this.buttonElement = document.querySelector(this.options.buttonSelector);
    if (!this.buttonElement) {
      console.error('Wallet connect button not found');
      return;
    }
    
    // Initialize Web3
    if (await this.initWeb3()) {
      // Setup event listeners
      this.setupEventListeners();
    }
  }
  
  async initWeb3() {
    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // Request account access
        this.provider = window.ethereum;
        this.web3 = new Web3(this.provider);
        
        // Get the current chain ID
        this.chainId = await this.web3.eth.getChainId();
        
        console.log("Web3 initialized successfully");
        console.log("Connected to chain ID:", this.chainId);
        
        // Setup event listeners for account changes
        this.provider.on('accountsChanged', this.handleAccountsChanged.bind(this));
        this.provider.on('chainChanged', this.handleChainChanged.bind(this));
        
        return true;
      } catch (error) {
        console.error("User denied account access:", error);
        this.showError("Please allow access to your wallet to use this dApp.");
        return false;
      }
    } 
    // Check for other web3 providers
    else if (window.web3) {
      this.provider = window.web3.currentProvider;
      this.web3 = new Web3(this.provider);
      console.log("Using legacy web3 provider");
      return true;
    } 
    // No web3 provider found
    else {
      console.error("No web3 provider detected");
      this.showError("Please install MetaMask or another web3 wallet to use this dApp.");
      
      // Update UI to show wallet installation options
      this.buttonElement.textContent = "Install Wallet";
      this.buttonElement.addEventListener('click', () => {
        window.open('https://metamask.io/download/', '_blank');
      });
      
      return false;
    }
  }
  
  setupEventListeners() {
    this.buttonElement.addEventListener('click', async () => {
      if (!this.isConnected) {
        await this.connectWallet();
      } else {
        // Show wallet info/disconnect options
        this.toggleWalletMenu();
      }
    });
    
    // Close wallet menu when clicking outside
    document.addEventListener('click', (e) => {
      const menu = document.querySelector('#wallet-menu');
      
      if (menu && !menu.contains(e.target) && e.target !== this.buttonElement) {
        menu.classList.remove('open');
      }
    });
  }
  
  async connectWallet() {
    try {
      // Request accounts access
      const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
      this.userAccount = accounts[0];
      this.isConnected = true;
      
      // Update UI
      this.updateUIOnConnect();
      
      // Call onConnect callback if provided
      if (typeof this.options.onConnect === 'function') {
        this.options.onConnect(this.userAccount, this.chainId);
      }
      
      console.log("Wallet connected:", this.userAccount);
      this.showSuccess("Wallet connected successfully!");
      
      return true;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      this.showError("Failed to connect wallet. Please try again.");
      return false;
    }
  }
  
  disconnectWallet() {
    this.userAccount = null;
    this.isConnected = false;
    this.updateUIOnDisconnect();
    
    // Remove wallet menu
    const menu = document.querySelector('#wallet-menu');
    if (menu) {
      menu.remove();
    }
    
    // Call onDisconnect callback if provided
    if (typeof this.options.onDisconnect === 'function') {
      this.options.onDisconnect();
    }
    
    this.showSuccess("Wallet disconnected");
  }
  
  handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      // User logged out
      this.userAccount = null;
      this.isConnected = false;
      this.updateUIOnDisconnect();
      console.log("User disconnected wallet");
      
      // Call onDisconnect callback if provided
      if (typeof this.options.onDisconnect === 'function') {
        this.options.onDisconnect();
      }
    } else if (accounts[0] !== this.userAccount) {
      // Account changed
      this.userAccount = accounts[0];
      this.isConnected = true;
      this.updateUIOnConnect();
      console.log("Account changed to:", this.userAccount);
      
      // Call onConnect callback if provided
      if (typeof this.options.onConnect === 'function') {
        this.options.onConnect(this.userAccount, this.chainId);
      }
    }
  }
  
  handleChainChanged(newChainId) {
    // Update chainId
    this.chainId = parseInt(newChainId, 16);
    console.log("Chain changed to:", this.chainId);
    
    // Call onConnect callback if provided to update chain info
    if (this.isConnected && typeof this.options.onConnect === 'function') {
      this.options.onConnect(this.userAccount, this.chainId);
    }
  }
  
  updateUIOnConnect() {
    this.buttonElement.textContent = `${this.userAccount.substring(0, 6)}...${this.userAccount.substring(38)}`;
    this.buttonElement.classList.add('connected');
    
    // Show user dashboard elements
    document.querySelectorAll('.requires-connection').forEach(el => {
      el.style.display = 'block';
    });
    
    // Hide placeholder content
    document.querySelectorAll('.placeholder-content').forEach(el => {
      el.style.display = 'none';
    });
  }
  
  updateUIOnDisconnect() {
    this.buttonElement.textContent = "Connect Wallet";
    this.buttonElement.classList.remove('connected');
    
    // Hide user dashboard elements
    document.querySelectorAll('.requires-connection').forEach(el => {
      el.style.display = 'none';
    });
    
    // Show placeholder content
    document.querySelectorAll('.placeholder-content').forEach(el => {
      el.style.display = 'block';
    });
  }
  
  toggleWalletMenu() {
    const walletMenu = document.querySelector('#wallet-menu');
    if (walletMenu) {
      walletMenu.classList.toggle('open');
    } else {
      // Create wallet menu if it doesn't exist
      this.createWalletMenu();
    }
  }
  
  createWalletMenu() {
    const menu = document.createElement('div');
    menu.id = 'wallet-menu';
    menu.className = 'wallet-menu open';
    
    menu.innerHTML = `
      <div class="wallet-menu-header">
        <div class="wallet-address">${this.userAccount}</div>
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
    const rect = this.buttonElement.getBoundingClientRect();
    menu.style.top = `${rect.bottom + 10}px`;
    menu.style.right = `${window.innerWidth - rect.right}px`;
    
    // Add event listeners
    document.querySelector('#view-on-explorer').addEventListener('click', () => {
      // Open explorer based on current chain
      let explorerUrl = 'https://etherscan.io/address/';
      if (this.chainId === 137) explorerUrl = 'https://polygonscan.com/address/';
      if (this.chainId === 56) explorerUrl = 'https://bscscan.com/address/';
      
      window.open(explorerUrl + this.userAccount, '_blank');
      this.toggleWalletMenu();
    });
    
    document.querySelector('#disconnect-wallet').addEventListener('click', () => {
      this.disconnectWallet();
      this.toggleWalletMenu();
    });
    
    document.querySelector('.copy-address').addEventListener('click', () => {
      navigator.clipboard.writeText(this.userAccount);
      this.showSuccess("Address copied to clipboard!");
    });
  }
  
  showError(message) {
    this.showNotification(message, 'error');
  }
  
  showSuccess(message) {
    this.showNotification(message, 'success');
  }
  
  showNotification(message, type = 'info') {
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
  
  // Get current account
  getAccount() {
    return this.userAccount;
  }
  
  // Get current chain ID
  getChainId() {
    return this.chainId;
  }
  
  // Get web3 instance
  getWeb3() {
    return this.web3;
  }
  
  // Check if wallet is connected
  isWalletConnected() {
    return this.isConnected;
  }
}

// Export the component
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = WalletConnect;
}
