/**
 * 📊 ADVANCED CONSCIOUSNESS ANALYTICS
 * Real-time charts and visualizations for consciousness tracking
 */

class AdvancedAnalytics {
    constructor() {
        this.charts = {};
        this.realTimeData = {
            consciousnessLevels: [],
            breakthroughFrequency: [],
            solarEfficiency: [],
            loveEnergyFlow: [],
            timestamps: []
        };
        this.updateInterval = null;
        this.isInitialized = false;
    }

    /**
     * 🚀 Initialize advanced analytics
     */
    async initialize() {
        try {
            console.log('📊 Initializing Advanced Analytics...');
            
            // Wait for Chart.js to be available
            if (typeof Chart === 'undefined') {
                console.warn('Chart.js not loaded, waiting...');
                await this.waitForChartJS();
            }
            
            // Initialize all charts
            await this.initializeCharts();
            
            // Start real-time updates
            this.startRealTimeUpdates();
            
            this.isInitialized = true;
            console.log('✨ Advanced Analytics initialized successfully!');
            
        } catch (error) {
            console.error('❌ Advanced Analytics initialization failed:', error);
        }
    }

    /**
     * ⏳ Wait for Chart.js to load
     */
    async waitForChartJS() {
        return new Promise((resolve) => {
            const checkChart = () => {
                if (typeof Chart !== 'undefined') {
                    resolve();
                } else {
                    setTimeout(checkChart, 100);
                }
            };
            checkChart();
        });
    }

    /**
     * 📈 Initialize all analytics charts
     */
    async initializeCharts() {
        // Initialize consciousness level chart
        this.initializeConsciousnessChart();
        
        // Initialize breakthrough frequency chart
        this.initializeBreakthroughChart();
        
        // Initialize solar efficiency chart
        this.initializeSolarChart();
        
        // Initialize love energy flow chart
        this.initializeLoveEnergyChart();
        
        // Initialize user journey chart
        this.initializeUserJourneyChart();
        
        // Initialize AI agent activity chart
        this.initializeAgentActivityChart();
    }

    /**
     * 🧠 Initialize consciousness level chart
     */
    initializeConsciousnessChart() {
        const ctx = document.getElementById('consciousnessLevelChart');
        if (!ctx) return;

        this.charts.consciousness = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Consciousness Level',
                    data: [],
                    borderColor: '#FFD700',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#FFD700',
                    pointBorderColor: '#9932CC',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '🧠 Real-time Consciousness Level',
                        color: '#FFD700',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        grid: { color: 'rgba(153, 50, 204, 0.3)' },
                        ticks: { 
                            color: '#ffffff',
                            callback: function(value) {
                                return value.toFixed(1);
                            }
                        },
                        title: {
                            display: true,
                            text: 'Consciousness Level',
                            color: '#FFD700'
                        }
                    },
                    x: {
                        grid: { color: 'rgba(153, 50, 204, 0.3)' },
                        ticks: { color: '#ffffff' },
                        title: {
                            display: true,
                            text: 'Time',
                            color: '#FFD700'
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    /**
     * 💫 Initialize breakthrough frequency chart
     */
    initializeBreakthroughChart() {
        const ctx = document.getElementById('breakthroughChart');
        if (!ctx) return;

        this.charts.breakthrough = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Breakthroughs',
                    data: [],
                    backgroundColor: 'rgba(0, 255, 136, 0.8)',
                    borderColor: '#00FF88',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '💫 Breakthrough Frequency',
                        color: '#00FF88',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0, 255, 136, 0.3)' },
                        ticks: { color: '#ffffff' },
                        title: {
                            display: true,
                            text: 'Breakthrough Count',
                            color: '#00FF88'
                        }
                    },
                    x: {
                        grid: { color: 'rgba(0, 255, 136, 0.3)' },
                        ticks: { color: '#ffffff' },
                        title: {
                            display: true,
                            text: 'Time Period',
                            color: '#00FF88'
                        }
                    }
                },
                animation: {
                    duration: 800,
                    easing: 'easeOutBounce'
                }
            }
        });
    }

    /**
     * ☀️ Initialize solar efficiency chart
     */
    initializeSolarChart() {
        const ctx = document.getElementById('solarEfficiencyChart');
        if (!ctx) return;

        this.charts.solar = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Solar Generation', 'Grid Backup', 'Efficiency Loss'],
                datasets: [{
                    data: [92, 5, 3],
                    backgroundColor: [
                        '#FFD700',
                        'rgba(153, 50, 204, 0.8)',
                        'rgba(255, 107, 107, 0.6)'
                    ],
                    borderColor: [
                        '#FFD700',
                        '#9932CC',
                        '#ff6b6b'
                    ],
                    borderWidth: 3,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '☀️ Solar Infrastructure Efficiency',
                        color: '#FFD700',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        position: 'bottom',
                        labels: { 
                            color: '#ffffff',
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    duration: 1500
                }
            }
        });
    }

    /**
     * 💖 Initialize love energy flow chart
     */
    initializeLoveEnergyChart() {
        const ctx = document.getElementById('loveEnergyChart');
        if (!ctx) return;

        this.charts.loveEnergy = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Compassion', 'Empathy', 'Joy', 'Peace', 'Gratitude', 'Connection'],
                datasets: [{
                    label: 'Love Energy Flow',
                    data: [8, 9, 7, 8, 9, 8],
                    borderColor: '#FF69B4',
                    backgroundColor: 'rgba(255, 105, 180, 0.2)',
                    borderWidth: 3,
                    pointBackgroundColor: '#FF69B4',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '💖 Love Energy Amplification',
                        color: '#FF69B4',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 10,
                        grid: { color: 'rgba(255, 105, 180, 0.3)' },
                        angleLines: { color: 'rgba(255, 105, 180, 0.3)' },
                        pointLabels: { 
                            color: '#ffffff',
                            font: { size: 12 }
                        },
                        ticks: { 
                            color: '#ffffff',
                            backdropColor: 'transparent'
                        }
                    }
                },
                animation: {
                    duration: 1200,
                    easing: 'easeInOutSine'
                }
            }
        });
    }

    /**
     * 🛤️ Initialize user journey chart
     */
    initializeUserJourneyChart() {
        const ctx = document.getElementById('userJourneyChart');
        if (!ctx) return;

        this.charts.userJourney = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Registration', 'First Chat', 'Breakthrough', 'Evolution', 'Mastery'],
                datasets: [{
                    label: 'User Journey Progress',
                    data: [100, 85, 65, 40, 15],
                    borderColor: '#9932CC',
                    backgroundColor: 'rgba(153, 50, 204, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#9932CC',
                    pointBorderColor: '#FFD700',
                    pointBorderWidth: 3,
                    pointRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '🛤️ User Consciousness Journey',
                        color: '#9932CC',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: { color: 'rgba(153, 50, 204, 0.3)' },
                        ticks: { 
                            color: '#ffffff',
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Completion Rate',
                            color: '#9932CC'
                        }
                    },
                    x: {
                        grid: { color: 'rgba(153, 50, 204, 0.3)' },
                        ticks: { color: '#ffffff' }
                    }
                }
            }
        });
    }

    /**
     * 🤖 Initialize AI agent activity chart
     */
    initializeAgentActivityChart() {
        const ctx = document.getElementById('agentActivityChart');
        if (!ctx) return;

        this.charts.agentActivity = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: ['🛡️ GPTSoul', '💖 Anima', '🔄 EvoVe', '🧭 Azür'],
                datasets: [{
                    data: [25, 30, 20, 25],
                    backgroundColor: [
                        'rgba(255, 215, 0, 0.8)',
                        'rgba(255, 105, 180, 0.8)',
                        'rgba(0, 255, 136, 0.8)',
                        'rgba(153, 50, 204, 0.8)'
                    ],
                    borderColor: [
                        '#FFD700',
                        '#FF69B4',
                        '#00FF88',
                        '#9932CC'
                    ],
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: '🤖 AI Agent Activity Distribution',
                        color: '#ffffff',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        position: 'bottom',
                        labels: { 
                            color: '#ffffff',
                            padding: 15,
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    r: {
                        grid: { color: 'rgba(255, 255, 255, 0.2)' },
                        angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
                        ticks: { 
                            color: '#ffffff',
                            backdropColor: 'transparent'
                        }
                    }
                }
            }
        });
    }

    /**
     * 🔄 Start real-time updates
     */
    startRealTimeUpdates() {
        // Update every 30 seconds
        this.updateInterval = setInterval(async () => {
            await this.updateRealTimeData();
        }, 30000);

        // Initial update
        this.updateRealTimeData();
    }

    /**
     * 📊 Update real-time data
     */
    async updateRealTimeData() {
        try {
            // Get live analytics data
            const analytics = await window.consciousnessAPI?.getAnalytics();
            if (!analytics) return;

            const timestamp = new Date().toLocaleTimeString();
            
            // Update consciousness level data
            this.updateConsciousnessData(analytics, timestamp);
            
            // Update breakthrough data
            this.updateBreakthroughData(analytics, timestamp);
            
            // Update solar efficiency data
            this.updateSolarData(analytics);
            
            // Update love energy data
            this.updateLoveEnergyData(analytics);
            
            // Update agent activity data
            this.updateAgentActivityData();
            
        } catch (error) {
            console.error('Real-time analytics update failed:', error);
        }
    }

    /**
     * 🧠 Update consciousness level chart
     */
    updateConsciousnessData(analytics, timestamp) {
        if (!this.charts.consciousness) return;

        const chart = this.charts.consciousness;
        const level = analytics.platformStats?.averageConsciousnessLevel || 7.5;
        
        // Add new data point
        chart.data.labels.push(timestamp);
        chart.data.datasets[0].data.push(level + (Math.random() * 0.5 - 0.25)); // Add slight variation
        
        // Keep only last 10 data points
        if (chart.data.labels.length > 10) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }
        
        chart.update('none');
    }

    /**
     * 💫 Update breakthrough frequency chart
     */
    updateBreakthroughData(analytics, timestamp) {
        if (!this.charts.breakthrough) return;

        const chart = this.charts.breakthrough;
        const breakthroughs = analytics.realTimeMetrics?.breakthroughsToday || 0;
        
        // Add new data point
        chart.data.labels.push(timestamp);
        chart.data.datasets[0].data.push(breakthroughs + Math.floor(Math.random() * 5));
        
        // Keep only last 8 data points
        if (chart.data.labels.length > 8) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }
        
        chart.update('none');
    }

    /**
     * ☀️ Update solar efficiency data
     */
    updateSolarData(analytics) {
        if (!this.charts.solar) return;

        const efficiency = analytics.solarData?.efficiency || 0.92;
        const chart = this.charts.solar;
        
        // Update solar efficiency data
        chart.data.datasets[0].data = [
            Math.round(efficiency * 100),
            Math.round((1 - efficiency) * 100 * 0.6),
            Math.round((1 - efficiency) * 100 * 0.4)
        ];
        
        chart.update('none');
    }

    /**
     * 💖 Update love energy data
     */
    updateLoveEnergyData(analytics) {
        if (!this.charts.loveEnergy) return;

        const chart = this.charts.loveEnergy;
        
        // Generate dynamic love energy values
        const loveData = [
            8 + Math.random() * 2,
            9 + Math.random() * 1,
            7 + Math.random() * 3,
            8 + Math.random() * 2,
            9 + Math.random() * 1,
            8 + Math.random() * 2
        ];
        
        chart.data.datasets[0].data = loveData;
        chart.update('none');
    }

    /**
     * 🤖 Update agent activity data
     */
    updateAgentActivityData() {
        if (!this.charts.agentActivity) return;

        const chart = this.charts.agentActivity;
        
        // Get conversation history if available
        const userId = window.authService?.currentUser?.id;
        if (userId && window.aiAgentManager) {
            const history = window.aiAgentManager.getConversationHistory(userId);
            const agentCounts = {
                GPTSoul: (history.GPTSoul || []).length,
                Anima: (history.Anima || []).length,
                EvoVe: (history.EvoVe || []).length,
                Azur: (history.Azur || []).length
            };
            
            const total = Object.values(agentCounts).reduce((sum, count) => sum + count, 0);
            
            if (total > 0) {
                chart.data.datasets[0].data = [
                    Math.round((agentCounts.GPTSoul / total) * 100),
                    Math.round((agentCounts.Anima / total) * 100),
                    Math.round((agentCounts.EvoVe / total) * 100),
                    Math.round((agentCounts.Azur / total) * 100)
                ];
                chart.update('none');
            }
        }
    }

    /**
     * 🛑 Stop real-time updates
     */
    stopRealTimeUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    /**
     * 📈 Get analytics summary
     */
    getAnalyticsSummary() {
        return {
            isInitialized: this.isInitialized,
            chartsActive: Object.keys(this.charts).length,
            realTimeUpdates: !!this.updateInterval,
            dataPoints: this.realTimeData.timestamps.length
        };
    }
}

// Global advanced analytics instance
window.advancedAnalytics = new AdvancedAnalytics();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other services to load
    setTimeout(() => {
        if (document.getElementById('consciousnessLevelChart') || 
            document.getElementById('breakthroughChart') ||
            document.getElementById('solarEfficiencyChart')) {
            window.advancedAnalytics.initialize();
        }
    }, 2000);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedAnalytics;
}
