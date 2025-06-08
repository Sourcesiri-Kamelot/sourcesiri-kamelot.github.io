/**
 * WalletConnect Component
 * 
 * Modular Web3 wallet connect component with full MetaMask integration
 * Supports account detection, change handling, and responsive design
 */

import { web3Manager, utils } from '../../utils/web3.js';

export class WalletConnectComponent {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' 
      ? document.querySelector(container) 
      : container;
    
    if (!this.container) {
      throw new Error('WalletConnect: Container element not found');
    }

    // Component options with defaults
    this.options = {
      showStatus: true,
      showBalance: true,
      autoInit: true,
      theme: 'cyber',
      notifications: true,
      ...options
    };

    // Component state
    this.isInitialized = false;
    this.isConnecting = false;
    this.elements = {};
    this.loadingOverlay = null;
    
    // Bind methods
    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.handleCopyAddress = this.handleCopyAddress.bind(this);
    this.handleViewExplorer = this.handleViewExplorer.bind(this);
    this.handleRefreshData = this.handleRefreshData.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    
    // Web3 event handlers
    this.onWalletConnected = this.onWalletConnected.bind(this);
    this.onWalletDisconnected = this.onWalletDisconnected.bind(this);
    this.onAccountChanged = this.onAccountChanged.bind(this);
    this.onWalletError = this.onWalletError.bind(this);
    this.onAddressCopied = this.onAddressCopied.bind(this);

    if (this.options.autoInit) {
      this.init();
    }
  }

  /**
   * Initialize the component
   */
  async init() {
    try {
      // Load HTML template
      await this.loadTemplate();
      
      // Setup DOM references
      this.setupElements();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Initialize Web3
      await web3Manager.init();
      
      // Setup Web3 event listeners
      this.setupWeb3Listeners();
      
      // Update initial state
      this.updateConnectionState();
      
      this.isInitialized = true;
      this.emit('initialized');
      
      console.log('WalletConnect component initialized');
    } catch (error) {
      console.error('Error initializing WalletConnect component:', error);
      this.showError('Failed to initialize wallet component');
    }
  }

  /**
   * Load HTML template
   */
  async loadTemplate() {
    try {
      const response = await fetch('./src/components/WalletConnect/WalletConnect.html');
      if (!response.ok) {
        throw new Error(`Failed to load template: ${response.status}`);
      }
      
      const html = await response.text();
      this.container.innerHTML = html;
    } catch (error) {
      console.error('Error loading template:', error);
      // Fallback to inline template
      this.createInlineTemplate();
    }
  }

  /**
   * Create inline template as fallback
   */
  createInlineTemplate() {
    this.container.innerHTML = `
      <div class="wallet-component wallet-connect-container">
        <button class="wallet-connect-btn" id="wallet-connect-btn">
          <i class="fas fa-wallet" id="wallet-connect-icon"></i>
          <span id="wallet-connect-text">Connect Wallet</span>
        </button>
        
        ${this.options.showStatus ? `
        <div class="wallet-status" id="wallet-status" style="display: none;">
          <div class="wallet-status-indicator"></div>
          <span id="wallet-status-text">Connected</span>
        </div>
        ` : ''}
        
        <div class="wallet-dropdown" id="wallet-dropdown">
          <div class="wallet-dropdown-header">
            <div class="wallet-address" id="wallet-address"></div>
            <button class="wallet-copy-btn" id="wallet-copy-btn" title="Copy Address">
              <i class="fas fa-copy"></i>
            </button>
          </div>
          
          ${this.options.showBalance ? `
          <div class="wallet-account-info" id="wallet-account-info" style="display: none;">
            <div class="wallet-account-balance" id="wallet-balance">$0.00</div>
            <div class="wallet-account-network" id="wallet-network">Ethereum</div>
          </div>
          ` : ''}
          
          <div class="wallet-menu-option" id="wallet-view-explorer">
            <i class="fas fa-external-link-alt"></i>
            <span>View on Explorer</span>
          </div>
          
          <div class="wallet-menu-option" id="wallet-refresh-data">
            <i class="fas fa-sync-alt"></i>
            <span>Refresh Data</span>
          </div>
          
          <div class="wallet-menu-option" id="wallet-disconnect">
            <i class="fas fa-sign-out-alt"></i>
            <span>Disconnect</span>
          </div>
        </div>

        <div class="wallet-error" id="wallet-error" style="display: none;">
          <i class="fas fa-exclamation-triangle"></i>
          <span id="wallet-error-text"></span>
        </div>
      </div>
    `;
  }

  /**
   * Setup DOM element references
   */
  setupElements() {
    this.elements = {
      connectBtn: this.container.querySelector('#wallet-connect-btn'),
      connectIcon: this.container.querySelector('#wallet-connect-icon'),
      connectText: this.container.querySelector('#wallet-connect-text'),
      status: this.container.querySelector('#wallet-status'),
      statusText: this.container.querySelector('#wallet-status-text'),
      dropdown: this.container.querySelector('#wallet-dropdown'),
      address: this.container.querySelector('#wallet-address'),
      copyBtn: this.container.querySelector('#wallet-copy-btn'),
      accountInfo: this.container.querySelector('#wallet-account-info'),
      balance: this.container.querySelector('#wallet-balance'),
      network: this.container.querySelector('#wallet-network'),
      viewExplorer: this.container.querySelector('#wallet-view-explorer'),
      refreshData: this.container.querySelector('#wallet-refresh-data'),
      disconnect: this.container.querySelector('#wallet-disconnect'),
      error: this.container.querySelector('#wallet-error'),
      errorText: this.container.querySelector('#wallet-error-text')
    };

    // Validate required elements
    if (!this.elements.connectBtn) {
      throw new Error('WalletConnect: Required elements not found in template');
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Connect button
    this.elements.connectBtn.addEventListener('click', this.handleConnect);
    
    // Dropdown options
    if (this.elements.copyBtn) {
      this.elements.copyBtn.addEventListener('click', this.handleCopyAddress);
    }
    
    if (this.elements.viewExplorer) {
      this.elements.viewExplorer.addEventListener('click', this.handleViewExplorer);
    }
    
    if (this.elements.refreshData) {
      this.elements.refreshData.addEventListener('click', this.handleRefreshData);
    }
    
    if (this.elements.disconnect) {
      this.elements.disconnect.addEventListener('click', this.handleDisconnect);
    }
    
    // Outside click to close dropdown
    document.addEventListener('click', this.handleOutsideClick);
    
    // Keyboard navigation
    this.elements.connectBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.handleConnect();
      }
    });
  }

  /**
   * Setup Web3 event listeners
   */
  setupWeb3Listeners() {
    web3Manager.on('walletConnected', this.onWalletConnected);
    web3Manager.on('walletDisconnected', this.onWalletDisconnected);
    web3Manager.on('accountChanged', this.onAccountChanged);
    web3Manager.on('walletError', this.onWalletError);
    web3Manager.on('addressCopied', this.onAddressCopied);
  }

  /**
   * Handle connect button click
   */
  async handleConnect() {
    if (this.isConnecting) return;
    
    const state = web3Manager.getState();
    
    if (state.isConnected) {
      // Toggle dropdown
      this.toggleDropdown();
    } else {
      // Connect wallet
      await this.connectWallet();
    }
  }

  /**
   * Connect wallet
   */
  async connectWallet() {
    try {
      this.isConnecting = true;
      this.setLoadingState(true);
      this.hideError();
      
      await web3Manager.connectWallet();
      
    } catch (error) {
      console.error('Connection error:', error);
      this.showError(error.message || 'Failed to connect wallet');
    } finally {
      this.isConnecting = false;
      this.setLoadingState(false);
    }
  }

  /**
   * Handle disconnect
   */
  handleDisconnect() {
    web3Manager.disconnectWallet();
    this.closeDropdown();
  }

  /**
   * Handle copy address
   */
  async handleCopyAddress() {
    try {
      const success = await web3Manager.copyAddress();
      if (success && this.options.notifications) {
        this.showNotification('Address copied to clipboard!', 'success');
      }
    } catch (error) {
      console.error('Error copying address:', error);
      if (this.options.notifications) {
        this.showNotification('Failed to copy address', 'error');
      }
    }
  }

  /**
   * Handle view on explorer
   */
  handleViewExplorer() {
    const state = web3Manager.getState();
    if (state.userAccount) {
      const explorerUrl = web3Manager.getExplorerUrl(state.userAccount);
      window.open(explorerUrl, '_blank');
      this.closeDropdown();
    }
  }

  /**
   * Handle refresh data
   */
  async handleRefreshData() {
    if (this.options.showBalance) {
      try {
        const balance = await web3Manager.getTokenBalance();
        this.updateBalance(balance);
        
        if (this.options.notifications) {
          this.showNotification('Data refreshed', 'success');
        }
      } catch (error) {
        console.error('Error refreshing data:', error);
        if (this.options.notifications) {
          this.showNotification('Failed to refresh data', 'error');
        }
      }
    }
  }

  /**
   * Handle outside click
   */
  handleOutsideClick(event) {
    if (!this.container.contains(event.target)) {
      this.closeDropdown();
    }
  }

  /**
   * Web3 event handlers
   */
  onWalletConnected(data) {
    this.updateConnectionState();
    this.loadAccountData();
    
    if (this.options.notifications) {
      this.showNotification('Wallet connected successfully!', 'success');
    }
    
    this.emit('connected', data);
  }

  onWalletDisconnected() {
    this.updateConnectionState();
    this.closeDropdown();
    
    if (this.options.notifications) {
      this.showNotification('Wallet disconnected', 'info');
    }
    
    this.emit('disconnected');
  }

  onAccountChanged(data) {
    this.updateConnectionState();
    this.loadAccountData();
    this.emit('accountChanged', data);
  }

  onWalletError(data) {
    this.showError(data.error);
    this.emit('error', data);
  }

  onAddressCopied(data) {
    if (this.options.notifications) {
      this.showNotification('Address copied!', 'success');
    }
    this.emit('addressCopied', data);
  }

  /**
   * Update connection state
   */
  updateConnectionState() {
    const state = web3Manager.getState();
    
    if (state.isConnected) {
      // Connected state
      this.elements.connectBtn.classList.add('connected');
      this.elements.connectText.textContent = utils.truncateAddress(state.userAccount);
      
      if (this.elements.status && this.options.showStatus) {
        this.elements.status.style.display = 'inline-flex';
        this.elements.statusText.textContent = 'Connected';
      }
      
      if (this.elements.address) {
        this.elements.address.textContent = state.userAccount;
      }
      
      this.updateNetworkInfo(state.chainId);
      
    } else {
      // Disconnected state
      this.elements.connectBtn.classList.remove('connected');
      this.elements.connectText.textContent = 'Connect Wallet';
      
      if (this.elements.status) {
        this.elements.status.style.display = 'none';
      }
      
      if (this.elements.accountInfo) {
        this.elements.accountInfo.style.display = 'none';
      }
    }
  }

  /**
   * Load account data
   */
  async loadAccountData() {
    if (!this.options.showBalance) return;
    
    try {
      const balance = await web3Manager.getTokenBalance();
      this.updateBalance(balance);
      
      if (this.elements.accountInfo) {
        this.elements.accountInfo.style.display = 'block';
      }
    } catch (error) {
      console.error('Error loading account data:', error);
    }
  }

  /**
   * Update balance display
   */
  updateBalance(balances) {
    if (!this.elements.balance || !balances) return;
    
    // Calculate total USD value (simplified)
    const total = Object.values(balances).reduce((sum, val) => sum + (parseFloat(val) || 0), 0);
    this.elements.balance.textContent = `$${total.toFixed(2)}`;
  }

  /**
   * Update network info
   */
  updateNetworkInfo(chainId) {
    if (!this.elements.network) return;
    
    const networks = {
      1: 'Ethereum',
      137: 'Polygon',
      56: 'BSC',
      42161: 'Arbitrum',
      10: 'Optimism'
    };
    
    this.elements.network.textContent = networks[chainId] || `Chain ${chainId}`;
  }

  /**
   * Toggle dropdown
   */
  toggleDropdown() {
    if (this.elements.dropdown.classList.contains('open')) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  /**
   * Open dropdown
   */
  openDropdown() {
    this.elements.dropdown.classList.add('open');
    this.emit('dropdownOpen');
  }

  /**
   * Close dropdown
   */
  closeDropdown() {
    this.elements.dropdown.classList.remove('open');
    this.emit('dropdownClose');
  }

  /**
   * Set loading state
   */
  setLoadingState(isLoading) {
    if (isLoading) {
      this.elements.connectBtn.classList.add('loading');
      this.elements.connectBtn.disabled = true;
      this.showLoadingOverlay();
    } else {
      this.elements.connectBtn.classList.remove('loading');
      this.elements.connectBtn.disabled = false;
      this.hideLoadingOverlay();
    }
  }

  /**
   * Show loading overlay
   */
  showLoadingOverlay() {
    if (this.loadingOverlay) return;
    
    this.loadingOverlay = document.createElement('div');
    this.loadingOverlay.className = 'wallet-loading-overlay';
    this.loadingOverlay.innerHTML = `
      <div class="wallet-loading-spinner"></div>
      <div class="wallet-loading-text">Connecting to wallet...</div>
    `;
    
    document.body.appendChild(this.loadingOverlay);
  }

  /**
   * Hide loading overlay
   */
  hideLoadingOverlay() {
    if (this.loadingOverlay) {
      this.loadingOverlay.remove();
      this.loadingOverlay = null;
    }
  }

  /**
   * Show error
   */
  showError(message) {
    if (this.elements.error && this.elements.errorText) {
      this.elements.errorText.textContent = message;
      this.elements.error.style.display = 'block';
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        this.hideError();
      }, 5000);
    }
  }

  /**
   * Hide error
   */
  hideError() {
    if (this.elements.error) {
      this.elements.error.style.display = 'none';
    }
  }

  /**
   * Show notification
   */
  showNotification(message, type = 'info') {
    if (!this.options.notifications) return;
    
    const notification = document.createElement('div');
    notification.className = `wallet-notification ${type}`;
    
    const iconMap = {
      success: 'check-circle',
      error: 'exclamation-circle',
      info: 'info-circle'
    };
    
    notification.innerHTML = `
      <i class="wallet-notification-icon fas fa-${iconMap[type] || 'info-circle'}"></i>
      <span class="wallet-notification-text">${message}</span>
    `;
    
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
    }, 3000);
  }

  /**
   * Event system
   */
  on(event, callback) {
    if (!this.eventListeners) {
      this.eventListeners = new Map();
    }
    
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    
    this.eventListeners.get(event).push(callback);
  }

  emit(event, data = null) {
    if (this.eventListeners && this.eventListeners.has(event)) {
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
   * Cleanup
   */
  destroy() {
    // Remove event listeners
    document.removeEventListener('click', this.handleOutsideClick);
    
    // Remove Web3 listeners
    web3Manager.off('walletConnected', this.onWalletConnected);
    web3Manager.off('walletDisconnected', this.onWalletDisconnected);
    web3Manager.off('accountChanged', this.onAccountChanged);
    web3Manager.off('walletError', this.onWalletError);
    web3Manager.off('addressCopied', this.onAddressCopied);
    
    // Clear loading overlay
    this.hideLoadingOverlay();
    
    // Clear container
    this.container.innerHTML = '';
    
    this.isInitialized = false;
    this.emit('destroyed');
  }
}

// Export default factory function
export default function createWalletConnect(container, options) {
  return new WalletConnectComponent(container, options);
}