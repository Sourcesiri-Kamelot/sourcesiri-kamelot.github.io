// Helo I'm AI - Central Configuration
// All API endpoints and URLs in one place

const CONFIG = {
    // Domain Configuration
    domain: 'https://helo-im.ai',
    
    // API Endpoints
    api: {
        // Backend API (Node.js + Ollama)
        backend: 'http://localhost:3000',
        aiTwins: 'http://localhost:3000/api/v1/ai-twins',
        analytics: 'http://localhost:3000/api/v1/analytics',
        
        // Ollama (AI Twins)
        ollama: 'http://localhost:11434',
    },
    
    // Email Configuration
    email: {
        admin: 'heloimai@helo-im.ai',
        formspree: 'https://formspree.io/f/YOUR_FORM_ID', // TODO: Replace with actual Formspree ID
    },
    
    // WebSocket Endpoints (for real-time features)
    websocket: {
        priceFeed: 'wss://helo-im.ai/ws/price-feed',
        analytics: 'wss://helo-im.ai/ws/analytics',
    },
    
    // External APIs
    external: {
        marketData: 'https://helo-im.ai/api/market-data',
        networkStats: 'https://helo-im.ai/api/network-stats',
    },
    
    // Production vs Development
    isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    
    // Get the appropriate API URL based on environment
    getApiUrl() {
        return this.isDevelopment ? this.api.backend : `${this.domain}/api`;
    },
    
    getOllamaUrl() {
        return this.isDevelopment ? this.api.ollama : `${this.domain}/ollama`;
    }
};

// Export for use in other scripts
window.CONFIG = CONFIG;

// Log configuration on load (only in development)
if (CONFIG.isDevelopment) {
    console.log('🔧 Configuration loaded:', {
        environment: 'Development',
        apiUrl: CONFIG.getApiUrl(),
        ollamaUrl: CONFIG.getOllamaUrl(),
        adminEmail: CONFIG.email.admin
    });
}
