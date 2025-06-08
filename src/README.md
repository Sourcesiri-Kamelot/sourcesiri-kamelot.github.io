# Web3 Wallet Connect Component System

## Overview

A comprehensive, modular Web3 wallet connect component system with neon/cyber aesthetic that matches the SoulCore design system. Built with pure HTML/CSS/JavaScript and ES6 modules for maximum compatibility and reusability.

## Features

- ✅ **Pure HTML/CSS/JS**: No framework dependencies
- ✅ **Modular Architecture**: ES6 modules for clean imports
- ✅ **MetaMask Integration**: Full wallet connection with account detection
- ✅ **Neon/Cyber Aesthetic**: Matches existing SoulCore design with gradients and glows
- ✅ **Responsive Design**: Works across all screen sizes
- ✅ **Error Handling**: Graceful handling of connection failures
- ✅ **Event System**: Component communication through events
- ✅ **Accessibility**: Keyboard navigation and screen reader support

## File Structure

```
src/
├── components/
│   └── WalletConnect/
│       ├── WalletConnect.html      # HTML template
│       ├── WalletConnect.js        # ES6 module with full functionality
│       └── WalletConnect.css       # Component-specific styles
├── utils/
│   └── web3.js                     # Core Web3 utilities and manager
├── styles/
│   └── wallet-theme.css            # Neon/cyber theme CSS variables
└── demo/
    └── wallet-demo.html            # Interactive demo page
```

## Quick Start

### 1. Include Required Dependencies

```html
<!-- Font Awesome for icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

<!-- Web3.js for blockchain interaction -->
<script src="https://cdn.jsdelivr.net/npm/web3@1.8.0/dist/web3.min.js"></script>

<!-- Wallet theme CSS -->
<link rel="stylesheet" href="src/styles/wallet-theme.css">

<!-- Component CSS -->
<link rel="stylesheet" href="src/components/WalletConnect/WalletConnect.css">
```

### 2. Add HTML Container

```html
<!-- Simple container for the wallet component -->
<div id="wallet-container"></div>
```

### 3. Initialize Component

```javascript
import createWalletConnect from './src/components/WalletConnect/WalletConnect.js';

// Create wallet component with options
const wallet = createWalletConnect('#wallet-container', {
    showStatus: true,      // Show connection status indicator
    showBalance: true,     // Show account balance in dropdown
    notifications: true,   // Show success/error notifications
    theme: 'cyber'        // Theme variant
});

// Listen to events
wallet.on('connected', (data) => {
    console.log('Wallet connected:', data.account);
});

wallet.on('disconnected', () => {
    console.log('Wallet disconnected');
});

wallet.on('error', (data) => {
    console.error('Wallet error:', data.error);
});
```

## Integration with Existing Pages

### Dashboard Integration

To integrate with the existing dashboard page, replace the current wallet button:

```javascript
// Replace existing dashboard wallet functionality
import createWalletConnect from './src/components/WalletConnect/WalletConnect.js';

const dashboardWallet = createWalletConnect('.dashboard-header', {
    showStatus: true,
    showBalance: true,
    notifications: true
});

// Integrate with existing dashboard logic
dashboardWallet.on('connected', (data) => {
    // Show dashboard content
    document.querySelectorAll('.requires-connection').forEach(el => {
        el.style.display = 'block';
    });
    
    // Hide placeholder content
    document.querySelectorAll('.placeholder-content').forEach(el => {
        el.style.display = 'none';
    });
});
```

### Site-wide Integration

Add to any page header or navigation:

```html
<!-- In header -->
<nav class="main-nav">
    <div class="nav-brand">SoulCore</div>
    <div class="nav-actions">
        <div id="header-wallet"></div>
    </div>
</nav>

<script type="module">
    import createWalletConnect from './src/components/WalletConnect/WalletConnect.js';
    
    createWalletConnect('#header-wallet', {
        showStatus: false,
        showBalance: false,
        notifications: true
    });
</script>
```

## Component Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `showStatus` | boolean | `true` | Show connection status indicator |
| `showBalance` | boolean | `true` | Show account balance in dropdown |
| `autoInit` | boolean | `true` | Auto-initialize on creation |
| `theme` | string | `'cyber'` | Theme variant |
| `notifications` | boolean | `true` | Show toast notifications |

## Events

| Event | Data | Description |
|-------|------|-------------|
| `initialized` | `null` | Component initialized |
| `connected` | `{account, chainId}` | Wallet connected |
| `disconnected` | `null` | Wallet disconnected |
| `accountChanged` | `{account}` | Account switched |
| `error` | `{error}` | Connection error |
| `addressCopied` | `{address}` | Address copied to clipboard |

## Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `init()` | `none` | Initialize component |
| `connectWallet()` | `none` | Trigger wallet connection |
| `disconnect()` | `none` | Disconnect wallet |
| `getState()` | `none` | Get current connection state |
| `destroy()` | `none` | Cleanup component |

## Styling

The component uses CSS custom properties for easy theming:

```css
:root {
    --wallet-primary: #9932CC;
    --wallet-secondary: #FFD700;
    --wallet-accent: #00FF88;
    --wallet-bg-primary: rgba(10, 0, 20, 0.95);
    /* ... more variables */
}
```

## Browser Support

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+

## Demo

View the interactive demo at `src/demo/wallet-demo.html` to see all features in action.

## Migration from Existing Implementation

The modular system is designed to work alongside the existing `js/web3-connect.js` implementation. You can gradually migrate pages to use the new components:

1. **Keep existing functionality**: The current implementation continues to work
2. **Add new components**: Use the new modular components on new pages
3. **Gradual migration**: Replace existing implementations page by page
4. **Shared utilities**: Both systems can use the same Web3 utilities

## Security Notes

- Always validate user inputs
- Use HTTPS in production
- Keep Web3.js updated
- Implement proper error boundaries
- Validate smart contract interactions

## Performance

- Components are lazy-loaded
- CSS uses efficient selectors
- JavaScript uses modern ES6+ features
- Minimal DOM manipulation
- Optimized for mobile devices