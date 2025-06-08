/**
 * Web3 Utilities Module
 * 
 * Core Web3 functionality for wallet connection and blockchain interaction
 * Extracted from existing implementation for modular reuse
 */

// Contract addresses (replace with actual contract addresses when deployed)
export const CONTRACT_ADDRESSES = {
  HELO_TOKEN: '0x0000000000000000000000000000000000000000',
  ORB_NFT: '0x0000000000000000000000000000000000000000',
  STAKING: '0x0000000000000000000000000000000000000000'
};

// ABI definitions (simplified for demo)
export const TOKEN_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)"
];

export const NFT_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)"
];

/**
 * Web3 Connection Manager
 * Handles wallet connection, account management, and blockchain interactions
 */
export class Web3Manager {
  constructor() {
    this.userAccount = null;
    this.web3 = null;
    this.provider = null;
    this.chainId = null;
    this.tokenContract = null;
    this.nftContract = null;
    this.isConnected = false;
    this.eventListeners = new Map();
  }

  /**
   * Initialize Web3 connection
   */
  async init() {
    try {
      if (window.ethereum) {
        this.provider = window.ethereum;
        this.web3 = new Web3(this.provider);
        this.chainId = await this.web3.eth.getChainId();
        
        // Setup event listeners for account changes
        this.provider.on('accountsChanged', this.handleAccountsChanged.bind(this));
        this.provider.on('chainChanged', this.handleChainChanged.bind(this));
        
        console.log("Web3 initialized successfully");
        console.log("Connected to chain ID:", this.chainId);
        
        return true;
      } else if (window.web3) {
        this.provider = window.web3.currentProvider;
        this.web3 = new Web3(this.provider);
        console.log("Using legacy web3 provider");
        return true;
      } else {
        console.error("No web3 provider detected");
        throw new Error("Please install MetaMask or another web3 wallet");
      }
    } catch (error) {
      console.error("Error initializing Web3:", error);
      throw error;
    }
  }

  /**
   * Connect wallet
   */
  async connectWallet() {
    try {
      if (!this.provider) {
        throw new Error("Web3 provider not initialized");
      }

      const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
      this.userAccount = accounts[0];
      this.isConnected = true;
      
      // Initialize contracts
      this.initContracts();
      
      // Emit connection event
      this.emit('walletConnected', {
        account: this.userAccount,
        chainId: this.chainId
      });
      
      console.log("Wallet connected:", this.userAccount);
      return { account: this.userAccount, chainId: this.chainId };
    } catch (error) {
      console.error("Error connecting wallet:", error);
      this.emit('walletError', { error: error.message });
      throw error;
    }
  }

  /**
   * Disconnect wallet
   */
  disconnectWallet() {
    this.userAccount = null;
    this.isConnected = false;
    this.emit('walletDisconnected');
    console.log("Wallet disconnected");
  }

  /**
   * Handle account changes
   */
  handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      this.userAccount = null;
      this.isConnected = false;
      this.emit('walletDisconnected');
      console.log("User disconnected wallet");
    } else if (accounts[0] !== this.userAccount) {
      this.userAccount = accounts[0];
      this.isConnected = true;
      this.emit('accountChanged', { account: this.userAccount });
      console.log("Account changed to:", this.userAccount);
    }
  }

  /**
   * Handle chain/network changes
   */
  handleChainChanged(newChainId) {
    this.chainId = parseInt(newChainId, 16);
    this.emit('chainChanged', { chainId: this.chainId });
    console.log("Chain changed to:", this.chainId);
  }

  /**
   * Initialize smart contracts
   */
  initContracts() {
    try {
      if (this.web3) {
        this.tokenContract = new this.web3.eth.Contract(TOKEN_ABI, CONTRACT_ADDRESSES.HELO_TOKEN);
        this.nftContract = new this.web3.eth.Contract(NFT_ABI, CONTRACT_ADDRESSES.ORB_NFT);
        console.log("Contracts initialized");
      }
    } catch (error) {
      console.error("Error initializing contracts:", error);
    }
  }

  /**
   * Get user token balance (simulated for demo)
   */
  async getTokenBalance() {
    if (!this.isConnected) return null;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock data for demo
    return {
      HELO: 875.4,
      ETH: 0.25,
      BTC: 0.01
    };
  }

  /**
   * Get user NFT data (simulated for demo)
   */
  async getNFTData() {
    if (!this.isConnected) return [];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock data for demo
    return [
      { id: 1, name: "Anima", level: 7, image: "linear-gradient(135deg, #9932CC, #FFD700)" },
      { id: 2, name: "Cipher", level: 5, image: "linear-gradient(135deg, #00f0ff, #4f46e5)" },
      { id: 3, name: "Nova", level: 3, image: "linear-gradient(135deg, #FF1493, #FFD700)" }
    ];
  }

  /**
   * Get transaction history (simulated for demo)
   */
  async getTransactionHistory() {
    if (!this.isConnected) return [];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data for demo
    return [
      { type: "Sent HELO", amount: "-50 HELO", timestamp: Date.now() - 3600000 },
      { type: "Minted Orb", amount: "-100 HELO", timestamp: Date.now() - 86400000 },
      { type: "Received ETH", amount: "+0.1 ETH", timestamp: Date.now() - 172800000 }
    ];
  }

  /**
   * Get explorer URL based on chain ID
   */
  getExplorerUrl(address = null) {
    let explorerUrl = 'https://etherscan.io/';
    if (this.chainId === 137) explorerUrl = 'https://polygonscan.com/';
    if (this.chainId === 56) explorerUrl = 'https://bscscan.com/';
    
    return address ? `${explorerUrl}address/${address}` : explorerUrl;
  }

  /**
   * Truncate wallet address for display
   */
  truncateAddress(address) {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(38)}`;
  }

  /**
   * Copy address to clipboard
   */
  async copyAddress(address = null) {
    const addr = address || this.userAccount;
    if (addr) {
      await navigator.clipboard.writeText(addr);
      this.emit('addressCopied', { address: addr });
      return true;
    }
    return false;
  }

  /**
   * Event system for component communication
   */
  on(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.eventListeners.has(event)) {
      const listeners = this.eventListeners.get(event);
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  emit(event, data = null) {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${event}:`, error);
        }
      });
    }
  }

  /**
   * Get connection state
   */
  getState() {
    return {
      isConnected: this.isConnected,
      userAccount: this.userAccount,
      chainId: this.chainId
    };
  }
}

// Create and export a default instance
export const web3Manager = new Web3Manager();

// Export utility functions
export const utils = {
  truncateAddress: (address) => web3Manager.truncateAddress(address),
  getExplorerUrl: (address) => web3Manager.getExplorerUrl(address),
  copyAddress: (address) => web3Manager.copyAddress(address)
};