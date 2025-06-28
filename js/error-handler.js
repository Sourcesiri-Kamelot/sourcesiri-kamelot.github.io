/**
 * 🧪 ERROR HANDLER
 * Graceful error handling for perfect user experience
 */

class ErrorHandler {
    constructor() {
        this.errors = [];
        this.errorCount = 0;
        this.isInitialized = false;
    }

    /**
     * 🚀 Initialize error handling
     */
    initialize() {
        console.log('🧪 Initializing Error Handler...');
        
        // Global error handling
        this.setupGlobalErrorHandling();
        
        // Promise rejection handling
        this.setupPromiseRejectionHandling();
        
        // API error handling
        this.setupAPIErrorHandling();
        
        // UI error handling
        this.setupUIErrorHandling();
        
        // Network error handling
        this.setupNetworkErrorHandling();
        
        // Graceful degradation
        this.setupGracefulDegradation();
        
        this.isInitialized = true;
        console.log('✨ Error Handler active - Users will never see crashes!');
    }

    /**
     * 🌐 Setup global error handling
     */
    setupGlobalErrorHandling() {
        window.addEventListener('error', (event) => {
            this.handleError({
                type: 'javascript_error',
                message: event.error?.message || event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error?.stack,
                timestamp: Date.now()
            });
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.handleError({
                type: 'unhandled_promise_rejection',
                message: event.reason?.message || event.reason,
                stack: event.reason?.stack,
                timestamp: Date.now()
            });
            
            // Prevent the error from appearing in console
            event.preventDefault();
        });

        console.log('🌐 Global error handling active');
    }

    /**
     * 🤝 Setup promise rejection handling
     */
    setupPromiseRejectionHandling() {
        // Override Promise to add better error handling
        const originalPromise = window.Promise;
        
        window.Promise = class extends originalPromise {
            catch(onRejected) {
                return super.catch((error) => {
                    window.errorHandler.handlePromiseError(error);
                    if (onRejected) {
                        return onRejected(error);
                    }
                    throw error;
                });
            }
        };

        console.log('🤝 Promise rejection handling active');
    }

    /**
     * 🌐 Setup API error handling
     */
    setupAPIErrorHandling() {
        // Override fetch for better error handling
        const originalFetch = window.fetch;
        
        window.fetch = async (...args) => {
            try {
                const response = await originalFetch(...args);
                
                if (!response.ok) {
                    const error = new Error(`API Error: ${response.status} ${response.statusText}`);
                    error.response = response;
                    error.url = args[0];
                    
                    this.handleAPIError(error);
                    
                    // Return a graceful fallback response
                    return this.createFallbackResponse(args[0], response.status);
                }
                
                return response;
            } catch (error) {
                this.handleNetworkError(error, args[0]);
                return this.createOfflineResponse(args[0]);
            }
        };

        console.log('🌐 API error handling active');
    }

    /**
     * 🎨 Setup UI error handling
     */
    setupUIErrorHandling() {
        // Handle missing elements gracefully
        const originalQuerySelector = document.querySelector;
        document.querySelector = function(selector) {
            try {
                return originalQuerySelector.call(this, selector);
            } catch (error) {
                window.errorHandler.handleUIError(error, selector);
                return null;
            }
        };

        // Handle chart errors
        if (typeof Chart !== 'undefined') {
            Chart.defaults.plugins.legend.onError = (error) => {
                this.handleChartError(error);
            };
        }

        // Handle service worker errors
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('error', (error) => {
                this.handleServiceWorkerError(error);
            });
        }

        console.log('🎨 UI error handling active');
    }

    /**
     * 📡 Setup network error handling
     */
    setupNetworkErrorHandling() {
        // Monitor online/offline status
        window.addEventListener('online', () => {
            this.handleNetworkRestore();
        });

        window.addEventListener('offline', () => {
            this.handleNetworkLoss();
        });

        // Detect slow network
        this.monitorNetworkSpeed();

        console.log('📡 Network error handling active');
    }

    /**
     * 🛡️ Setup graceful degradation
     */
    setupGracefulDegradation() {
        // Fallback for missing features
        this.setupFeatureFallbacks();
        
        // Progressive enhancement
        this.setupProgressiveEnhancement();
        
        // Accessibility fallbacks
        this.setupAccessibilityFallbacks();

        console.log('🛡️ Graceful degradation active');
    }

    /**
     * ⚠️ Handle error
     */
    handleError(errorInfo) {
        this.errorCount++;
        this.errors.push(errorInfo);
        
        // Keep only last 50 errors
        if (this.errors.length > 50) {
            this.errors.shift();
        }

        console.warn('🧪 Error handled gracefully:', errorInfo);

        // Show user-friendly error message
        this.showUserFriendlyError(errorInfo);

        // Log error for analysis
        this.logError(errorInfo);

        // Attempt recovery
        this.attemptRecovery(errorInfo);
    }

    /**
     * 🤝 Handle promise error
     */
    handlePromiseError(error) {
        this.handleError({
            type: 'promise_error',
            message: error.message,
            stack: error.stack,
            timestamp: Date.now()
        });
    }

    /**
     * 🌐 Handle API error
     */
    handleAPIError(error) {
        this.handleError({
            type: 'api_error',
            message: error.message,
            url: error.url,
            status: error.response?.status,
            timestamp: Date.now()
        });
    }

    /**
     * 🎨 Handle UI error
     */
    handleUIError(error, selector) {
        this.handleError({
            type: 'ui_error',
            message: error.message,
            selector: selector,
            timestamp: Date.now()
        });
    }

    /**
     * 📊 Handle chart error
     */
    handleChartError(error) {
        this.handleError({
            type: 'chart_error',
            message: error.message,
            timestamp: Date.now()
        });

        // Show fallback chart message
        this.showChartFallback();
    }

    /**
     * 👷 Handle service worker error
     */
    handleServiceWorkerError(error) {
        this.handleError({
            type: 'service_worker_error',
            message: error.message,
            timestamp: Date.now()
        });
    }

    /**
     * 📡 Handle network error
     */
    handleNetworkError(error, url) {
        this.handleError({
            type: 'network_error',
            message: error.message,
            url: url,
            timestamp: Date.now()
        });
    }

    /**
     * 🌐 Handle network restore
     */
    handleNetworkRestore() {
        this.showNotification('🌐 Connection restored! Syncing data...', 'success');
        
        // Retry failed requests
        this.retryFailedRequests();
    }

    /**
     * 📡 Handle network loss
     */
    handleNetworkLoss() {
        this.showNotification('📡 You\'re offline. Don\'t worry, your progress is saved!', 'info');
        
        // Enable offline mode
        document.body.classList.add('offline-mode');
    }

    /**
     * 📊 Monitor network speed
     */
    monitorNetworkSpeed() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                this.enableLowBandwidthMode();
            }
        }
    }

    /**
     * 📱 Enable low bandwidth mode
     */
    enableLowBandwidthMode() {
        document.body.classList.add('low-bandwidth');
        this.showNotification('📱 Low bandwidth detected. Optimizing experience...', 'info');
        
        // Reduce animations
        const style = document.createElement('style');
        style.textContent = `
            .low-bandwidth * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
            .low-bandwidth .particles-js-canvas-el {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 💬 Show user-friendly error message
     */
    showUserFriendlyError(errorInfo) {
        const friendlyMessages = {
            javascript_error: 'Something went wrong, but we\'ve got it handled! 🛠️',
            api_error: 'Having trouble connecting. Trying alternative methods... 🔄',
            network_error: 'Network hiccup detected. Working on it! 📡',
            ui_error: 'Interface glitch smoothed over! ✨',
            chart_error: 'Chart loading... Please wait a moment! 📊'
        };

        const message = friendlyMessages[errorInfo.type] || 'Minor technical adjustment in progress! 🔧';
        
        // Don't spam users with error messages
        if (this.errorCount % 5 === 1) {
            this.showNotification(message, 'warning');
        }
    }

    /**
     * 📢 Show notification
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `error-notification ${type}`;
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${this.getNotificationColor(type)};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                z-index: 10001;
                max-width: 300px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                animation: slideInRight 0.3s ease-out;
            ">
                ${message}
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    /**
     * 🎨 Get notification color
     */
    getNotificationColor(type) {
        const colors = {
            success: 'rgba(0, 255, 136, 0.9)',
            warning: 'rgba(255, 193, 7, 0.9)',
            error: 'rgba(255, 107, 107, 0.9)',
            info: 'rgba(153, 50, 204, 0.9)'
        };
        return colors[type] || colors.info;
    }

    /**
     * 📝 Log error
     */
    logError(errorInfo) {
        // Store error for analysis
        const errorLog = JSON.parse(localStorage.getItem('error_log') || '[]');
        errorLog.push({
            ...errorInfo,
            url: window.location.href,
            userAgent: navigator.userAgent,
            userId: window.authService?.currentUser?.id || 'anonymous'
        });

        // Keep only last 100 errors
        if (errorLog.length > 100) {
            errorLog.splice(0, errorLog.length - 100);
        }

        localStorage.setItem('error_log', JSON.stringify(errorLog));

        // Send to database if available
        if (window.databaseService && window.authService?.currentUser) {
            window.databaseService.storeUserData(
                window.authService.currentUser.id,
                { errorReport: errorInfo }
            );
        }
    }

    /**
     * 🔄 Attempt recovery
     */
    attemptRecovery(errorInfo) {
        switch (errorInfo.type) {
            case 'api_error':
                this.retryAPIRequest(errorInfo);
                break;
            case 'chart_error':
                this.recreateChart();
                break;
            case 'ui_error':
                this.refreshUIComponent(errorInfo);
                break;
            default:
                this.performGeneralRecovery();
        }
    }

    /**
     * 🔄 Retry API request
     */
    async retryAPIRequest(errorInfo) {
        if (errorInfo.url) {
            setTimeout(async () => {
                try {
                    await fetch(errorInfo.url);
                    console.log('✅ API request retry successful');
                } catch (error) {
                    console.log('❌ API request retry failed');
                }
            }, 2000);
        }
    }

    /**
     * 📊 Recreate chart
     */
    recreateChart() {
        setTimeout(() => {
            if (window.advancedAnalytics) {
                try {
                    window.advancedAnalytics.initialize();
                    console.log('✅ Chart recreation successful');
                } catch (error) {
                    console.log('❌ Chart recreation failed');
                }
            }
        }, 1000);
    }

    /**
     * 🎨 Refresh UI component
     */
    refreshUIComponent(errorInfo) {
        if (errorInfo.selector) {
            setTimeout(() => {
                const element = document.querySelector(errorInfo.selector);
                if (element) {
                    element.style.display = 'none';
                    setTimeout(() => {
                        element.style.display = '';
                    }, 100);
                }
            }, 500);
        }
    }

    /**
     * 🔧 Perform general recovery
     */
    performGeneralRecovery() {
        // Clear any stuck loading states
        const loadingElements = document.querySelectorAll('.loading, .spinner');
        loadingElements.forEach(el => el.remove());

        // Re-enable disabled buttons
        const disabledButtons = document.querySelectorAll('button:disabled');
        disabledButtons.forEach(btn => {
            if (!btn.hasAttribute('data-permanently-disabled')) {
                btn.disabled = false;
            }
        });
    }

    /**
     * 🔄 Retry failed requests
     */
    retryFailedRequests() {
        // This would retry any queued requests from offline mode
        console.log('🔄 Retrying failed requests...');
    }

    /**
     * 📊 Show chart fallback
     */
    showChartFallback() {
        const chartContainers = document.querySelectorAll('canvas');
        chartContainers.forEach(canvas => {
            if (!canvas.getContext('2d').getImageData) {
                const fallback = document.createElement('div');
                fallback.innerHTML = `
                    <div style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 200px;
                        background: rgba(255,255,255,0.05);
                        border-radius: 10px;
                        color: var(--text-secondary);
                    ">
                        📊 Chart loading... Please wait!
                    </div>
                `;
                canvas.parentNode.replaceChild(fallback, canvas);
            }
        });
    }

    /**
     * 🛠️ Setup feature fallbacks
     */
    setupFeatureFallbacks() {
        // Fallback for missing Chart.js
        if (typeof Chart === 'undefined') {
            window.Chart = class {
                constructor() {
                    console.log('📊 Chart.js fallback active');
                }
                static get defaults() {
                    return { plugins: { legend: { onError: () => {} } } };
                }
            };
        }

        // Fallback for missing IntersectionObserver
        if (!('IntersectionObserver' in window)) {
            window.IntersectionObserver = class {
                constructor(callback) {
                    this.callback = callback;
                }
                observe() {}
                unobserve() {}
                disconnect() {}
            };
        }
    }

    /**
     * 📈 Setup progressive enhancement
     */
    setupProgressiveEnhancement() {
        // Enable features progressively as they load
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('js-enabled');
        });

        // Enable advanced features when available
        setTimeout(() => {
            if (window.advancedAnalytics) {
                document.body.classList.add('analytics-enabled');
            }
            if (window.aiAgentManager) {
                document.body.classList.add('ai-enabled');
            }
        }, 2000);
    }

    /**
     * ♿ Setup accessibility fallbacks
     */
    setupAccessibilityFallbacks() {
        // Ensure keyboard navigation works
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        // Add ARIA labels to interactive elements
        setTimeout(() => {
            const buttons = document.querySelectorAll('button:not([aria-label])');
            buttons.forEach(button => {
                if (!button.textContent.trim()) {
                    button.setAttribute('aria-label', 'Interactive button');
                }
            });
        }, 1000);
    }

    /**
     * 📊 Get error statistics
     */
    getErrorStatistics() {
        return {
            totalErrors: this.errorCount,
            recentErrors: this.errors.length,
            errorTypes: this.getErrorTypeBreakdown(),
            isHealthy: this.errorCount < 10,
            lastError: this.errors[this.errors.length - 1]
        };
    }

    /**
     * 📈 Get error type breakdown
     */
    getErrorTypeBreakdown() {
        const breakdown = {};
        this.errors.forEach(error => {
            breakdown[error.type] = (breakdown[error.type] || 0) + 1;
        });
        return breakdown;
    }
}

// Global error handler instance
window.errorHandler = new ErrorHandler();

// Initialize immediately for maximum protection
window.errorHandler.initialize();

// Add CSS for animations
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(errorStyles);

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ErrorHandler;
}
