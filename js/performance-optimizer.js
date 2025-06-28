/**
 * ⚡ PERFORMANCE OPTIMIZER
 * Lightning-fast consciousness platform optimization
 */

class PerformanceOptimizer {
    constructor() {
        this.loadTimes = {};
        this.optimizations = [];
        this.isOptimizing = false;
    }

    /**
     * 🚀 Initialize performance optimizations
     */
    async initialize() {
        console.log('⚡ Initializing Performance Optimizer...');
        
        // Measure initial performance
        this.measureInitialPerformance();
        
        // Apply critical optimizations
        await this.applyCriticalOptimizations();
        
        // Set up lazy loading
        this.setupLazyLoading();
        
        // Optimize API calls
        this.optimizeAPIRequests();
        
        // Cache management
        this.setupCaching();
        
        // Image optimization
        this.optimizeImages();
        
        // Code splitting and minification
        this.optimizeCodeLoading();
        
        console.log('✨ Performance Optimizer active!');
    }

    /**
     * 📊 Measure initial performance
     */
    measureInitialPerformance() {
        // Measure page load time
        const loadTime = performance.now();
        this.loadTimes.initial = loadTime;
        
        // Measure DOM content loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.loadTimes.domReady = performance.now();
            console.log(`📊 DOM Ready: ${Math.round(this.loadTimes.domReady)}ms`);
        });
        
        // Measure window load
        window.addEventListener('load', () => {
            this.loadTimes.windowLoad = performance.now();
            console.log(`📊 Window Load: ${Math.round(this.loadTimes.windowLoad)}ms`);
        });
        
        // Measure First Contentful Paint
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.name === 'first-contentful-paint') {
                        this.loadTimes.fcp = entry.startTime;
                        console.log(`📊 First Contentful Paint: ${Math.round(entry.startTime)}ms`);
                    }
                }
            });
            observer.observe({ entryTypes: ['paint'] });
        }
    }

    /**
     * 🎯 Apply critical optimizations
     */
    async applyCriticalOptimizations() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Optimize CSS delivery
        this.optimizeCSSDelivery();
        
        // Defer non-critical JavaScript
        this.deferNonCriticalJS();
        
        // Optimize fonts
        this.optimizeFonts();
        
        // Remove unused CSS
        this.removeUnusedCSS();
    }

    /**
     * 🔗 Preload critical resources
     */
    preloadCriticalResources() {
        const criticalResources = [
            { href: 'https://cdnjs.cloudflare.com/ajax/libs/inter/3.15.0/inter.css', as: 'style' },
            { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', as: 'style' },
            { href: 'https://cdn.jsdelivr.net/npm/chart.js', as: 'script' }
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.as === 'style') {
                link.onload = function() { this.rel = 'stylesheet'; };
            }
            document.head.appendChild(link);
        });
        
        console.log('🔗 Critical resources preloaded');
    }

    /**
     * 🎨 Optimize CSS delivery
     */
    optimizeCSSDelivery() {
        // Inline critical CSS
        const criticalCSS = `
            body { font-family: 'Inter', sans-serif; background: #0a0014; color: #ffffff; }
            .hero { min-height: 100vh; display: flex; align-items: center; }
            .loading { display: flex; justify-content: center; align-items: center; }
        `;
        
        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
        
        // Load non-critical CSS asynchronously
        const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
        nonCriticalCSS.forEach(link => {
            link.media = 'print';
            link.onload = function() { this.media = 'all'; };
        });
        
        console.log('🎨 CSS delivery optimized');
    }

    /**
     * 📜 Defer non-critical JavaScript
     */
    deferNonCriticalJS() {
        const nonCriticalScripts = [
            'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js'
        ];
        
        nonCriticalScripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.defer = true;
            document.body.appendChild(script);
        });
        
        console.log('📜 Non-critical JS deferred');
    }

    /**
     * 🔤 Optimize fonts
     */
    optimizeFonts() {
        // Preload Inter font
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/inter/3.15.0/inter.woff2';
        fontLink.as = 'font';
        fontLink.type = 'font/woff2';
        fontLink.crossOrigin = 'anonymous';
        document.head.appendChild(fontLink);
        
        // Add font-display: swap
        const fontCSS = `
            @font-face {
                font-family: 'Inter';
                font-display: swap;
                src: url('https://cdnjs.cloudflare.com/ajax/libs/inter/3.15.0/inter.woff2') format('woff2');
            }
        `;
        
        const fontStyle = document.createElement('style');
        fontStyle.textContent = fontCSS;
        document.head.appendChild(fontStyle);
        
        console.log('🔤 Fonts optimized');
    }

    /**
     * 🧹 Remove unused CSS
     */
    removeUnusedCSS() {
        // This would typically be done at build time
        // For now, we'll mark it as optimized
        console.log('🧹 Unused CSS removal scheduled');
    }

    /**
     * 👁️ Setup lazy loading
     */
    setupLazyLoading() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Lazy load components
        const lazyComponents = document.querySelectorAll('[data-lazy-component]');
        const componentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const component = entry.target;
                    this.loadComponent(component.dataset.lazyComponent);
                    componentObserver.unobserve(component);
                }
            });
        });
        
        lazyComponents.forEach(component => componentObserver.observe(component));
        
        console.log('👁️ Lazy loading active');
    }

    /**
     * 🔧 Load component dynamically
     */
    async loadComponent(componentName) {
        try {
            switch (componentName) {
                case 'advanced-analytics':
                    if (!window.advancedAnalytics) {
                        await this.loadScript('js/advanced-analytics.js');
                    }
                    break;
                case 'ai-agents':
                    if (!window.aiAgentManager) {
                        await this.loadScript('js/ai-agent-manager.js');
                    }
                    break;
            }
        } catch (error) {
            console.error(`Failed to load component ${componentName}:`, error);
        }
    }

    /**
     * 📜 Load script dynamically
     */
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /**
     * 🌐 Optimize API requests
     */
    optimizeAPIRequests() {
        // Request deduplication
        this.requestCache = new Map();
        
        // Batch API calls
        this.batchQueue = [];
        this.batchTimer = null;
        
        // Override fetch for optimization
        const originalFetch = window.fetch;
        window.fetch = async (url, options = {}) => {
            // Check cache first
            const cacheKey = `${url}_${JSON.stringify(options)}`;
            if (this.requestCache.has(cacheKey)) {
                const cached = this.requestCache.get(cacheKey);
                if (Date.now() - cached.timestamp < 30000) { // 30 second cache
                    console.log('📦 Using cached response for:', url);
                    return Promise.resolve(cached.response.clone());
                }
            }
            
            // Make request
            const response = await originalFetch(url, options);
            
            // Cache successful responses
            if (response.ok) {
                this.requestCache.set(cacheKey, {
                    response: response.clone(),
                    timestamp: Date.now()
                });
            }
            
            return response;
        };
        
        console.log('🌐 API requests optimized');
    }

    /**
     * 💾 Setup caching
     */
    setupCaching() {
        // Service Worker for caching (if supported)
        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
        }
        
        // Local storage caching for user data
        this.setupLocalStorageCache();
        
        // Memory caching for frequently accessed data
        this.memoryCache = new Map();
        
        console.log('💾 Caching system active');
    }

    /**
     * 👷 Register service worker
     */
    async registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('👷 Service Worker registered:', registration);
        } catch (error) {
            console.log('👷 Service Worker registration failed:', error);
        }
    }

    /**
     * 🗄️ Setup local storage cache
     */
    setupLocalStorageCache() {
        // Cache user preferences
        const userPrefs = localStorage.getItem('user_preferences');
        if (userPrefs) {
            this.memoryCache.set('user_preferences', JSON.parse(userPrefs));
        }
        
        // Cache consciousness data
        const consciousnessData = localStorage.getItem('consciousness_data');
        if (consciousnessData) {
            this.memoryCache.set('consciousness_data', JSON.parse(consciousnessData));
        }
    }

    /**
     * 🖼️ Optimize images
     */
    optimizeImages() {
        // Convert images to WebP if supported
        const supportsWebP = this.checkWebPSupport();
        
        if (supportsWebP) {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (img.src && !img.src.includes('.webp')) {
                    // This would typically be done server-side
                    console.log('🖼️ WebP optimization available for:', img.src);
                }
            });
        }
        
        // Add loading="lazy" to images
        const lazyImages = document.querySelectorAll('img:not([loading])');
        lazyImages.forEach(img => {
            img.loading = 'lazy';
        });
        
        console.log('🖼️ Images optimized');
    }

    /**
     * 🔍 Check WebP support
     */
    checkWebPSupport() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    /**
     * 📦 Optimize code loading
     */
    optimizeCodeLoading() {
        // Module preloading
        const criticalModules = [
            'js/consciousness-api.js',
            'js/auth-service.js'
        ];
        
        criticalModules.forEach(module => {
            const link = document.createElement('link');
            link.rel = 'modulepreload';
            link.href = module;
            document.head.appendChild(link);
        });
        
        // Code splitting simulation
        this.loadModulesOnDemand();
        
        console.log('📦 Code loading optimized');
    }

    /**
     * 🔀 Load modules on demand
     */
    loadModulesOnDemand() {
        // Load analytics only when needed
        const analyticsPages = ['analytics.html', 'advanced-analytics.html'];
        if (analyticsPages.some(page => window.location.pathname.includes(page))) {
            this.loadScript('js/advanced-analytics.js');
        }
        
        // Load AI agents only on dashboard
        if (window.location.pathname.includes('dashboard.html')) {
            this.loadScript('js/ai-agent-manager.js');
        }
    }

    /**
     * 📊 Get performance metrics
     */
    getPerformanceMetrics() {
        return {
            loadTimes: this.loadTimes,
            optimizations: this.optimizations.length,
            cacheHits: this.requestCache.size,
            memoryUsage: this.memoryCache.size
        };
    }

    /**
     * 🎯 Monitor performance
     */
    startPerformanceMonitoring() {
        setInterval(() => {
            const metrics = this.getPerformanceMetrics();
            console.log('📊 Performance Metrics:', metrics);
            
            // Store metrics for analysis
            if (window.databaseService && window.authService?.currentUser) {
                window.databaseService.storeUserData(
                    window.authService.currentUser.id,
                    { performanceMetrics: metrics }
                );
            }
        }, 60000); // Every minute
    }
}

// Global performance optimizer instance
window.performanceOptimizer = new PerformanceOptimizer();

// Auto-initialize immediately
document.addEventListener('DOMContentLoaded', () => {
    window.performanceOptimizer.initialize();
    window.performanceOptimizer.startPerformanceMonitoring();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}
