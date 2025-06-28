/**
 * 📱 MOBILE OPTIMIZER
 * Perfect mobile experience for consciousness revolutionaries
 */

class MobileOptimizer {
    constructor() {
        this.isMobile = this.detectMobile();
        this.touchSupport = 'ontouchstart' in window;
        this.orientation = this.getOrientation();
        this.optimizations = [];
    }

    /**
     * 🚀 Initialize mobile optimizations
     */
    async initialize() {
        console.log('📱 Initializing Mobile Optimizer...');
        
        if (this.isMobile) {
            console.log('📱 Mobile device detected - applying optimizations');
            
            // Apply mobile-specific optimizations
            this.optimizeTouchInteractions();
            this.optimizeViewport();
            this.optimizeMobileUI();
            this.optimizeMobilePerformance();
            this.setupMobileGestures();
            this.optimizeMobileCharts();
            this.setupMobileKeyboard();
            this.optimizeMobileNavigation();
            
            console.log('✨ Mobile optimizations complete!');
        } else {
            console.log('🖥️ Desktop device - mobile optimizations skipped');
        }
        
        // Universal mobile-friendly features
        this.setupResponsiveImages();
        this.optimizeForAllDevices();
    }

    /**
     * 📱 Detect mobile device
     */
    detectMobile() {
        const userAgent = navigator.userAgent.toLowerCase();
        const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'tablet', 'phone'];
        
        const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
        const isMobileScreen = window.innerWidth <= 768;
        const isTouchDevice = 'ontouchstart' in window;
        
        return isMobileUA || (isMobileScreen && isTouchDevice);
    }

    /**
     * 📐 Get device orientation
     */
    getOrientation() {
        return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    }

    /**
     * 👆 Optimize touch interactions
     */
    optimizeTouchInteractions() {
        // Increase touch target sizes
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                button, .btn, .cta-primary, .cta-secondary {
                    min-height: 44px !important;
                    min-width: 44px !important;
                    padding: 12px 20px !important;
                    font-size: 16px !important;
                }
                
                input, textarea, select {
                    min-height: 44px !important;
                    font-size: 16px !important;
                    padding: 12px !important;
                }
                
                .agent-selector {
                    min-height: 48px !important;
                    padding: 12px 16px !important;
                }
                
                .quick-action-btn {
                    min-height: 56px !important;
                    min-width: 56px !important;
                }
                
                .nav-item, .sidebar-nav a {
                    min-height: 48px !important;
                    padding: 12px 16px !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add touch feedback
        this.addTouchFeedback();
        
        // Prevent zoom on input focus
        this.preventZoomOnInput();
        
        console.log('👆 Touch interactions optimized');
    }

    /**
     * ✨ Add touch feedback
     */
    addTouchFeedback() {
        const touchElements = document.querySelectorAll('button, .btn, .agent-selector, .quick-action-btn');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.95)';
                element.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('touchend', () => {
                element.style.transform = 'scale(1)';
            });
            
            element.addEventListener('touchcancel', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }

    /**
     * 🔍 Prevent zoom on input focus
     */
    preventZoomOnInput() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Ensure font-size is at least 16px to prevent zoom
            if (window.getComputedStyle(input).fontSize < '16px') {
                input.style.fontSize = '16px';
            }
        });
    }

    /**
     * 📐 Optimize viewport
     */
    optimizeViewport() {
        // Ensure proper viewport meta tag
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
        
        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.orientation = this.getOrientation();
                this.handleOrientationChange();
            }, 100);
        });
        
        console.log('📐 Viewport optimized');
    }

    /**
     * 🔄 Handle orientation change
     */
    handleOrientationChange() {
        // Adjust layout for orientation
        document.body.classList.toggle('landscape', this.orientation === 'landscape');
        document.body.classList.toggle('portrait', this.orientation === 'portrait');
        
        // Recalculate chart sizes
        if (window.advancedAnalytics) {
            setTimeout(() => {
                Object.values(window.advancedAnalytics.charts).forEach(chart => {
                    if (chart && chart.resize) {
                        chart.resize();
                    }
                });
            }, 300);
        }
        
        console.log(`🔄 Orientation changed to: ${this.orientation}`);
    }

    /**
     * 🎨 Optimize mobile UI
     */
    optimizeMobileUI() {
        const mobileStyles = document.createElement('style');
        mobileStyles.textContent = `
            @media (max-width: 768px) {
                /* Hero section mobile optimization */
                .hero-title {
                    font-size: 2.5rem !important;
                    line-height: 1.2 !important;
                }
                
                .hero-stats {
                    flex-direction: column !important;
                    gap: 1rem !important;
                }
                
                .stat-item {
                    display: flex !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                    padding: 1rem !important;
                    background: rgba(255,255,255,0.05) !important;
                    border-radius: 10px !important;
                }
                
                .stat-number {
                    font-size: 1.8rem !important;
                }
                
                /* Dashboard mobile optimization */
                .dashboard-grid {
                    grid-template-columns: 1fr !important;
                    gap: 1rem !important;
                }
                
                .dashboard-card {
                    padding: 1.5rem !important;
                }
                
                /* AI Chat mobile optimization */
                .ai-chat {
                    margin: 1rem 0 !important;
                }
                
                .chat-messages {
                    height: 250px !important;
                    max-height: 40vh !important;
                }
                
                .agent-selector {
                    flex: 1 !important;
                    text-align: center !important;
                }
                
                /* Analytics mobile optimization */
                .analytics-grid {
                    grid-template-columns: 1fr !important;
                }
                
                .chart-card {
                    height: 300px !important;
                }
                
                /* Navigation mobile optimization */
                .sidebar {
                    transform: translateX(-100%) !important;
                    transition: transform 0.3s ease !important;
                }
                
                .sidebar.mobile-open {
                    transform: translateX(0) !important;
                }
                
                .main-content {
                    margin-left: 0 !important;
                    padding: 1rem !important;
                }
                
                /* Consciousness orb mobile */
                .consciousness-orb {
                    width: 200px !important;
                    height: 200px !important;
                }
                
                .agent-bubble {
                    padding: 0.5rem !important;
                    font-size: 0.8rem !important;
                }
                
                /* Modal mobile optimization */
                .onboarding-content, .demo-content {
                    margin: 1rem !important;
                    padding: 1.5rem !important;
                    max-height: 90vh !important;
                    overflow-y: auto !important;
                }
            }
        `;
        document.head.appendChild(mobileStyles);
        
        // Add mobile navigation toggle
        this.addMobileNavigation();
        
        console.log('🎨 Mobile UI optimized');
    }

    /**
     * 🧭 Add mobile navigation
     */
    addMobileNavigation() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) return;
        
        // Add mobile menu toggle
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-nav-toggle';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileToggle.style.cssText = `
            position: fixed;
            top: 1rem;
            left: 1rem;
            z-index: 1001;
            background: var(--gradient-consciousness);
            border: none;
            color: white;
            width: 44px;
            height: 44px;
            border-radius: 8px;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            cursor: pointer;
        `;
        
        // Show on mobile
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleMediaQuery = (e) => {
            mobileToggle.style.display = e.matches ? 'flex' : 'none';
        };
        mediaQuery.addListener(handleMediaQuery);
        handleMediaQuery(mediaQuery);
        
        // Toggle functionality
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
            const isOpen = sidebar.classList.contains('mobile-open');
            mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        document.body.appendChild(mobileToggle);
    }

    /**
     * ⚡ Optimize mobile performance
     */
    optimizeMobilePerformance() {
        // Reduce animation complexity on mobile
        if (this.isMobile) {
            const style = document.createElement('style');
            style.textContent = `
                @media (max-width: 768px) {
                    * {
                        animation-duration: 0.3s !important;
                        transition-duration: 0.3s !important;
                    }
                    
                    .orb-ring {
                        animation: none !important;
                    }
                    
                    .agent-bubble {
                        animation-duration: 2s !important;
                    }
                    
                    .particles-js-canvas-el {
                        opacity: 0.3 !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Optimize images for mobile
        this.optimizeMobileImages();
        
        console.log('⚡ Mobile performance optimized');
    }

    /**
     * 🖼️ Optimize mobile images
     */
    optimizeMobileImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading="lazy" if not present
            if (!img.hasAttribute('loading')) {
                img.loading = 'lazy';
            }
            
            // Optimize image sizes for mobile
            if (this.isMobile && img.src) {
                // This would typically be done server-side
                console.log('🖼️ Mobile image optimization available for:', img.src);
            }
        });
    }

    /**
     * 👆 Setup mobile gestures
     */
    setupMobileGestures() {
        if (!this.touchSupport) return;
        
        // Swipe gestures for navigation
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Horizontal swipe
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - could open sidebar
                    console.log('👆 Swipe left detected');
                } else {
                    // Swipe right - could close sidebar
                    console.log('👆 Swipe right detected');
                    const sidebar = document.querySelector('.sidebar');
                    if (sidebar && sidebar.classList.contains('mobile-open')) {
                        sidebar.classList.remove('mobile-open');
                    }
                }
            }
            
            startX = 0;
            startY = 0;
        });
        
        console.log('👆 Mobile gestures enabled');
    }

    /**
     * 📊 Optimize mobile charts
     */
    optimizeMobileCharts() {
        // Wait for charts to be available
        setTimeout(() => {
            if (window.advancedAnalytics && window.advancedAnalytics.charts) {
                Object.values(window.advancedAnalytics.charts).forEach(chart => {
                    if (chart && chart.options) {
                        // Mobile-specific chart options
                        chart.options.responsive = true;
                        chart.options.maintainAspectRatio = false;
                        
                        if (chart.options.plugins && chart.options.plugins.legend) {
                            chart.options.plugins.legend.position = 'bottom';
                        }
                        
                        if (chart.options.scales) {
                            Object.values(chart.options.scales).forEach(scale => {
                                if (scale.ticks) {
                                    scale.ticks.maxTicksLimit = 5;
                                }
                            });
                        }
                        
                        chart.update();
                    }
                });
            }
        }, 2000);
        
        console.log('📊 Mobile charts optimized');
    }

    /**
     * ⌨️ Setup mobile keyboard handling
     */
    setupMobileKeyboard() {
        // Handle virtual keyboard
        let initialViewportHeight = window.innerHeight;
        
        window.addEventListener('resize', () => {
            const currentHeight = window.innerHeight;
            const heightDiff = initialViewportHeight - currentHeight;
            
            // Keyboard is likely open if height decreased significantly
            if (heightDiff > 150) {
                document.body.classList.add('keyboard-open');
                
                // Scroll active input into view
                const activeElement = document.activeElement;
                if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
                    setTimeout(() => {
                        activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                }
            } else {
                document.body.classList.remove('keyboard-open');
            }
        });
        
        // Add keyboard-specific styles
        const keyboardStyles = document.createElement('style');
        keyboardStyles.textContent = `
            @media (max-width: 768px) {
                .keyboard-open .hero {
                    min-height: 50vh !important;
                }
                
                .keyboard-open .chat-messages {
                    height: 150px !important;
                }
                
                .keyboard-open .onboarding-content {
                    max-height: 60vh !important;
                }
            }
        `;
        document.head.appendChild(keyboardStyles);
        
        console.log('⌨️ Mobile keyboard handling enabled');
    }

    /**
     * 🧭 Optimize mobile navigation
     */
    optimizeMobileNavigation() {
        // Add bottom navigation for mobile
        if (this.isMobile) {
            this.addBottomNavigation();
        }
        
        // Optimize breadcrumbs for mobile
        const breadcrumbs = document.querySelector('.breadcrumbs');
        if (breadcrumbs && this.isMobile) {
            breadcrumbs.style.fontSize = '0.8rem';
            breadcrumbs.style.padding = '0.5rem';
        }
    }

    /**
     * 📱 Add bottom navigation
     */
    addBottomNavigation() {
        const bottomNav = document.createElement('div');
        bottomNav.className = 'mobile-bottom-nav';
        bottomNav.innerHTML = `
            <a href="index.html" class="bottom-nav-item">
                <i class="fas fa-home"></i>
                <span>Home</span>
            </a>
            <a href="dashboard.html" class="bottom-nav-item">
                <i class="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </a>
            <a href="analytics.html" class="bottom-nav-item">
                <i class="fas fa-chart-line"></i>
                <span>Analytics</span>
            </a>
            <a href="advanced-analytics.html" class="bottom-nav-item">
                <i class="fas fa-chart-bar"></i>
                <span>Advanced</span>
            </a>
        `;
        
        const bottomNavStyles = document.createElement('style');
        bottomNavStyles.textContent = `
            .mobile-bottom-nav {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: var(--card-bg);
                backdrop-filter: blur(20px);
                border-top: 1px solid var(--border-consciousness);
                display: flex;
                justify-content: space-around;
                padding: 0.5rem;
                z-index: 1000;
                display: none;
            }
            
            @media (max-width: 768px) {
                .mobile-bottom-nav {
                    display: flex;
                }
                
                body {
                    padding-bottom: 70px;
                }
            }
            
            .bottom-nav-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.25rem;
                padding: 0.5rem;
                color: var(--text-secondary);
                text-decoration: none;
                font-size: 0.8rem;
                transition: color 0.3s ease;
                min-width: 60px;
            }
            
            .bottom-nav-item:hover,
            .bottom-nav-item.active {
                color: var(--accent-solar);
            }
            
            .bottom-nav-item i {
                font-size: 1.2rem;
            }
        `;
        document.head.appendChild(bottomNavStyles);
        document.body.appendChild(bottomNav);
        
        // Highlight current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = bottomNav.querySelectorAll('.bottom-nav-item');
        navItems.forEach(item => {
            if (item.getAttribute('href') === currentPage) {
                item.classList.add('active');
            }
        });
    }

    /**
     * 🖼️ Setup responsive images
     */
    setupResponsiveImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Make images responsive
            if (!img.style.maxWidth) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            }
        });
    }

    /**
     * 🌐 Optimize for all devices
     */
    optimizeForAllDevices() {
        // Add device-specific classes
        document.body.classList.add(this.isMobile ? 'mobile-device' : 'desktop-device');
        document.body.classList.add(this.touchSupport ? 'touch-device' : 'no-touch');
        document.body.classList.add(this.orientation);
        
        // Log device info
        console.log('📱 Device Info:', {
            isMobile: this.isMobile,
            touchSupport: this.touchSupport,
            orientation: this.orientation,
            screenSize: `${window.innerWidth}x${window.innerHeight}`,
            userAgent: navigator.userAgent
        });
    }

    /**
     * 📊 Get mobile optimization status
     */
    getOptimizationStatus() {
        return {
            isMobile: this.isMobile,
            touchSupport: this.touchSupport,
            orientation: this.orientation,
            optimizations: this.optimizations.length,
            screenSize: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
    }
}

// Global mobile optimizer instance
window.mobileOptimizer = new MobileOptimizer();

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    window.mobileOptimizer.initialize();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileOptimizer;
}
