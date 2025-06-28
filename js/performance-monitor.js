/**
 * 📊 PERFORMANCE MONITOR
 * Real-time performance tracking and optimization
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoad: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            firstInputDelay: 0,
            cumulativeLayoutShift: 0,
            apiResponseTimes: [],
            memoryUsage: 0,
            networkSpeed: 'unknown'
        };
        this.thresholds = {
            pageLoad: 3000, // 3 seconds
            fcp: 1800, // 1.8 seconds
            lcp: 2500, // 2.5 seconds
            fid: 100, // 100ms
            cls: 0.1 // 0.1
        };
    }

    /**
     * 🚀 Initialize performance monitoring
     */
    initialize() {
        console.log('📊 Initializing Performance Monitor...');
        
        // Measure Core Web Vitals
        this.measureCoreWebVitals();
        
        // Monitor API performance
        this.monitorAPIPerformance();
        
        // Track memory usage
        this.trackMemoryUsage();
        
        // Monitor network speed
        this.estimateNetworkSpeed();
        
        // Set up real-time monitoring
        this.startRealTimeMonitoring();
        
        console.log('✨ Performance Monitor active!');
    }

    /**
     * 🎯 Measure Core Web Vitals
     */
    measureCoreWebVitals() {
        // First Contentful Paint
        if ('PerformanceObserver' in window) {
            const paintObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.name === 'first-contentful-paint') {
                        this.metrics.firstContentfulPaint = entry.startTime;
                        this.evaluateMetric('fcp', entry.startTime);
                        console.log(`🎨 First Contentful Paint: ${Math.round(entry.startTime)}ms`);
                    }
                }
            });
            paintObserver.observe({ entryTypes: ['paint'] });

            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.largestContentfulPaint = lastEntry.startTime;
                this.evaluateMetric('lcp', lastEntry.startTime);
                console.log(`🖼️ Largest Contentful Paint: ${Math.round(lastEntry.startTime)}ms`);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
                    this.evaluateMetric('fid', this.metrics.firstInputDelay);
                    console.log(`⚡ First Input Delay: ${Math.round(this.metrics.firstInputDelay)}ms`);
                }
            });
            fidObserver.observe({ entryTypes: ['first-input'] });

            // Cumulative Layout Shift
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                this.metrics.cumulativeLayoutShift = clsValue;
                this.evaluateMetric('cls', clsValue);
                console.log(`📐 Cumulative Layout Shift: ${clsValue.toFixed(3)}`);
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }

        // Page Load Time
        window.addEventListener('load', () => {
            this.metrics.pageLoad = performance.now();
            this.evaluateMetric('pageLoad', this.metrics.pageLoad);
            console.log(`📄 Page Load: ${Math.round(this.metrics.pageLoad)}ms`);
        });
    }

    /**
     * 🌐 Monitor API performance
     */
    monitorAPIPerformance() {
        const originalFetch = window.fetch;
        
        window.fetch = async (...args) => {
            const startTime = performance.now();
            
            try {
                const response = await originalFetch(...args);
                const endTime = performance.now();
                const responseTime = endTime - startTime;
                
                this.metrics.apiResponseTimes.push({
                    url: args[0],
                    responseTime,
                    status: response.status,
                    timestamp: Date.now()
                });
                
                // Keep only last 50 API calls
                if (this.metrics.apiResponseTimes.length > 50) {
                    this.metrics.apiResponseTimes.shift();
                }
                
                // Log slow API calls
                if (responseTime > 2000) {
                    console.warn(`🐌 Slow API call: ${args[0]} took ${Math.round(responseTime)}ms`);
                }
                
                return response;
            } catch (error) {
                const endTime = performance.now();
                const responseTime = endTime - startTime;
                
                this.metrics.apiResponseTimes.push({
                    url: args[0],
                    responseTime,
                    status: 'error',
                    error: error.message,
                    timestamp: Date.now()
                });
                
                throw error;
            }
        };
    }

    /**
     * 💾 Track memory usage
     */
    trackMemoryUsage() {
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                this.metrics.memoryUsage = {
                    used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
                    total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
                    limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
                };
                
                // Warn if memory usage is high
                const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
                if (usagePercent > 80) {
                    console.warn(`🧠 High memory usage: ${usagePercent.toFixed(1)}%`);
                }
            }, 30000); // Every 30 seconds
        }
    }

    /**
     * 🌐 Estimate network speed
     */
    async estimateNetworkSpeed() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            this.metrics.networkSpeed = {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt
            };
            
            console.log(`📡 Network: ${connection.effectiveType}, ${connection.downlink}Mbps`);
        }
        
        // Perform speed test with small resource
        try {
            const startTime = performance.now();
            await fetch('/favicon.ico?' + Date.now());
            const endTime = performance.now();
            
            const latency = endTime - startTime;
            this.metrics.networkLatency = latency;
            
            console.log(`📡 Network latency: ${Math.round(latency)}ms`);
        } catch (error) {
            console.warn('📡 Network speed test failed:', error);
        }
    }

    /**
     * ⏱️ Start real-time monitoring
     */
    startRealTimeMonitoring() {
        setInterval(() => {
            this.generatePerformanceReport();
        }, 60000); // Every minute
        
        // Monitor for performance issues
        this.watchForPerformanceIssues();
    }

    /**
     * 👀 Watch for performance issues
     */
    watchForPerformanceIssues() {
        // Monitor long tasks
        if ('PerformanceObserver' in window) {
            const longTaskObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) {
                        console.warn(`⏰ Long task detected: ${Math.round(entry.duration)}ms`);
                        this.reportPerformanceIssue('long-task', {
                            duration: entry.duration,
                            startTime: entry.startTime
                        });
                    }
                }
            });
            longTaskObserver.observe({ entryTypes: ['longtask'] });
        }
        
        // Monitor resource loading issues
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                console.warn('📦 Resource loading error:', event.target.src || event.target.href);
                this.reportPerformanceIssue('resource-error', {
                    resource: event.target.src || event.target.href,
                    type: event.target.tagName
                });
            }
        });
    }

    /**
     * 📊 Evaluate metric against threshold
     */
    evaluateMetric(metricName, value) {
        const threshold = this.thresholds[metricName];
        if (!threshold) return;
        
        const status = value <= threshold ? 'good' : 'needs-improvement';
        const color = status === 'good' ? '🟢' : '🟡';
        
        console.log(`${color} ${metricName}: ${Math.round(value)}ms (threshold: ${threshold}ms)`);
        
        if (status === 'needs-improvement') {
            this.suggestOptimization(metricName, value);
        }
    }

    /**
     * 💡 Suggest optimization
     */
    suggestOptimization(metricName, value) {
        const suggestions = {
            pageLoad: 'Consider optimizing images, minifying CSS/JS, or using a CDN',
            fcp: 'Optimize critical rendering path and reduce render-blocking resources',
            lcp: 'Optimize largest content element (images, videos, or text blocks)',
            fid: 'Reduce JavaScript execution time and break up long tasks',
            cls: 'Ensure images and ads have dimensions, avoid inserting content above existing content'
        };
        
        const suggestion = suggestions[metricName];
        if (suggestion) {
            console.log(`💡 Optimization suggestion for ${metricName}: ${suggestion}`);
        }
    }

    /**
     * 📋 Generate performance report
     */
    generatePerformanceReport() {
        const report = {
            timestamp: new Date().toISOString(),
            metrics: { ...this.metrics },
            score: this.calculatePerformanceScore(),
            recommendations: this.getRecommendations()
        };
        
        console.log('📊 Performance Report:', report);
        
        // Store report for analysis
        if (window.databaseService && window.authService?.currentUser) {
            window.databaseService.storeUserData(
                window.authService.currentUser.id,
                { performanceReport: report }
            );
        }
        
        return report;
    }

    /**
     * 🎯 Calculate performance score
     */
    calculatePerformanceScore() {
        let score = 100;
        
        // Deduct points for poor metrics
        if (this.metrics.firstContentfulPaint > this.thresholds.fcp) {
            score -= 20;
        }
        if (this.metrics.largestContentfulPaint > this.thresholds.lcp) {
            score -= 25;
        }
        if (this.metrics.firstInputDelay > this.thresholds.fid) {
            score -= 20;
        }
        if (this.metrics.cumulativeLayoutShift > this.thresholds.cls) {
            score -= 15;
        }
        if (this.metrics.pageLoad > this.thresholds.pageLoad) {
            score -= 20;
        }
        
        return Math.max(0, score);
    }

    /**
     * 📝 Get recommendations
     */
    getRecommendations() {
        const recommendations = [];
        
        if (this.metrics.firstContentfulPaint > this.thresholds.fcp) {
            recommendations.push('Optimize critical rendering path');
        }
        if (this.metrics.largestContentfulPaint > this.thresholds.lcp) {
            recommendations.push('Optimize largest content element');
        }
        if (this.metrics.firstInputDelay > this.thresholds.fid) {
            recommendations.push('Reduce JavaScript execution time');
        }
        if (this.metrics.cumulativeLayoutShift > this.thresholds.cls) {
            recommendations.push('Stabilize layout shifts');
        }
        
        const avgApiTime = this.getAverageApiResponseTime();
        if (avgApiTime > 1000) {
            recommendations.push('Optimize API response times');
        }
        
        return recommendations;
    }

    /**
     * 📊 Get average API response time
     */
    getAverageApiResponseTime() {
        if (this.metrics.apiResponseTimes.length === 0) return 0;
        
        const total = this.metrics.apiResponseTimes.reduce((sum, api) => sum + api.responseTime, 0);
        return total / this.metrics.apiResponseTimes.length;
    }

    /**
     * 🚨 Report performance issue
     */
    reportPerformanceIssue(type, details) {
        const issue = {
            type,
            details,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        console.warn('🚨 Performance issue reported:', issue);
        
        // Store issue for analysis
        if (window.databaseService && window.authService?.currentUser) {
            window.databaseService.storeUserData(
                window.authService.currentUser.id,
                { performanceIssue: issue }
            );
        }
    }

    /**
     * 📊 Get current metrics
     */
    getCurrentMetrics() {
        return {
            ...this.metrics,
            score: this.calculatePerformanceScore(),
            avgApiResponseTime: this.getAverageApiResponseTime()
        };
    }
}

// Global performance monitor instance
window.performanceMonitor = new PerformanceMonitor();

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    window.performanceMonitor.initialize();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitor;
}
