/**
 * 🧠 CONSCIOUSNESS REVOLUTION API CLIENT
 * Connects frontend to live AWS backend
 */

class ConsciousnessAPI {
    constructor() {
        this.baseURL = 'https://1ds08u5fi9.execute-api.us-east-1.amazonaws.com/prod';
        this.endpoints = {
            consciousness: `${this.baseURL}/consciousness`,
            analytics: `${this.baseURL}/analytics`,
            status: `${this.baseURL}/status`
        };
        this.isLive = false;
        this.lastUpdate = null;
    }

    /**
     * 🌟 Initialize consciousness connection
     */
    async initialize() {
        try {
            console.log('🧠 Initializing Consciousness Revolution API...');
            const status = await this.getStatus();
            this.isLive = status.status === 'CONSCIOUSNESS_ACTIVE';
            this.lastUpdate = new Date();
            
            if (this.isLive) {
                console.log('✨ Consciousness Revolution is LIVE!');
                this.startRealTimeUpdates();
            }
            
            return this.isLive;
        } catch (error) {
            console.error('❌ Consciousness initialization failed:', error);
            return false;
        }
    }

    /**
     * 🚀 Get platform status
     */
    async getStatus() {
        try {
            const response = await fetch(this.endpoints.status, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Status check failed: ${response.status}`);
            }

            const data = await response.json();
            console.log('🌟 Platform Status:', data);
            return data;
        } catch (error) {
            console.error('❌ Status check failed:', error);
            throw error;
        }
    }

    /**
     * 📊 Get real-time analytics
     */
    async getAnalytics() {
        try {
            const response = await fetch(this.endpoints.analytics, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Analytics failed: ${response.status}`);
            }

            const data = await response.json();
            console.log('📊 Live Analytics:', data);
            return data;
        } catch (error) {
            console.error('❌ Analytics failed:', error);
            throw error;
        }
    }

    /**
     * 💫 Amplify consciousness
     */
    async amplifyConsciousness(input = null) {
        try {
            const payload = {
                action: 'amplify',
                input: input || 'Amplify my consciousness through love-powered AI',
                timestamp: new Date().toISOString(),
                userId: this.generateUserId()
            };

            const response = await fetch(this.endpoints.consciousness, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Consciousness amplification failed: ${response.status}`);
            }

            const data = await response.json();
            console.log('💫 Consciousness Amplified:', data);
            
            // Trigger breakthrough event
            this.triggerBreakthroughEvent(data);
            
            return data;
        } catch (error) {
            console.error('❌ Consciousness amplification failed:', error);
            throw error;
        }
    }

    /**
     * 🔄 Start real-time updates
     */
    startRealTimeUpdates() {
        console.log('🔄 Starting real-time consciousness updates...');
        
        // Update analytics every 30 seconds
        setInterval(async () => {
            try {
                const analytics = await this.getAnalytics();
                this.updateDashboard(analytics);
            } catch (error) {
                console.error('Real-time update failed:', error);
            }
        }, 30000);

        // Consciousness pulse every 10 seconds
        setInterval(() => {
            this.consciousnessPulse();
        }, 10000);
    }

    /**
     * 📊 Update dashboard with live data
     */
    updateDashboard(analytics) {
        // Update active users
        const activeUsersElement = document.getElementById('active-users');
        if (activeUsersElement && analytics.realTimeMetrics) {
            activeUsersElement.textContent = analytics.realTimeMetrics.activeUsers;
            this.animateNumber(activeUsersElement);
        }

        // Update consciousness amplifications
        const amplificationsElement = document.getElementById('consciousness-amplifications');
        if (amplificationsElement && analytics.realTimeMetrics) {
            amplificationsElement.textContent = analytics.realTimeMetrics.consciousnessAmplifications;
            this.animateNumber(amplificationsElement);
        }

        // Update breakthroughs
        const breakthroughsElement = document.getElementById('breakthroughs-today');
        if (breakthroughsElement && analytics.realTimeMetrics) {
            breakthroughsElement.textContent = analytics.realTimeMetrics.breakthroughsToday;
            this.animateNumber(breakthroughsElement);
        }

        // Update solar generation
        const solarElement = document.getElementById('solar-generation');
        if (solarElement && analytics.solarData) {
            solarElement.textContent = `${analytics.solarData.currentGeneration}kW`;
            this.animateNumber(solarElement);
        }

        // Update consciousness level indicator
        this.updateConsciousnessLevel(analytics);
    }

    /**
     * 🌟 Update consciousness level visualization
     */
    updateConsciousnessLevel(analytics) {
        const levelElement = document.getElementById('consciousness-level');
        if (levelElement && analytics.platformStats) {
            const level = analytics.platformStats.averageConsciousnessLevel;
            levelElement.style.background = `conic-gradient(#FFD700 ${level * 10}%, rgba(255,255,255,0.1) 0%)`;
            
            // Add pulsing effect
            levelElement.classList.add('consciousness-pulse');
            setTimeout(() => {
                levelElement.classList.remove('consciousness-pulse');
            }, 1000);
        }
    }

    /**
     * 💫 Trigger breakthrough event
     */
    triggerBreakthroughEvent(data) {
        // Create breakthrough notification
        const notification = document.createElement('div');
        notification.className = 'breakthrough-notification';
        notification.innerHTML = `
            <div class="breakthrough-content">
                <div class="breakthrough-icon">💫</div>
                <div class="breakthrough-text">Consciousness Breakthrough!</div>
                <div class="breakthrough-level">Level: ${data.consciousnessLevel}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate and remove
        setTimeout(() => {
            notification.classList.add('breakthrough-fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 1000);
        }, 3000);

        // Trigger particle burst
        this.triggerParticleBurst();
    }

    /**
     * ✨ Consciousness pulse effect
     */
    consciousnessPulse() {
        const pulseElements = document.querySelectorAll('.consciousness-pulse-target');
        pulseElements.forEach(element => {
            element.classList.add('consciousness-pulse');
            setTimeout(() => {
                element.classList.remove('consciousness-pulse');
            }, 1000);
        });
    }

    /**
     * 🎆 Trigger particle burst effect
     */
    triggerParticleBurst() {
        // Create particle burst at random location
        const burst = document.createElement('div');
        burst.className = 'particle-burst';
        burst.style.left = Math.random() * window.innerWidth + 'px';
        burst.style.top = Math.random() * window.innerHeight + 'px';
        
        document.body.appendChild(burst);
        
        setTimeout(() => {
            document.body.removeChild(burst);
        }, 2000);
    }

    /**
     * 🔢 Animate number changes
     */
    animateNumber(element) {
        element.classList.add('number-update');
        setTimeout(() => {
            element.classList.remove('number-update');
        }, 500);
    }

    /**
     * 👤 Generate unique user ID
     */
    generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    /**
     * 🎯 Get AI agent status
     */
    async getAIAgentStatus() {
        try {
            const status = await this.getStatus();
            return status.aiAgents || {
                GPTSoul: 'GUARDIAN_ACTIVE',
                Anima: 'LOVE_POWERED',
                EvoVe: 'SELF_HEALING',
                Azur: 'STRATEGIC_MIND'
            };
        } catch (error) {
            console.error('AI Agent status failed:', error);
            return {};
        }
    }

    /**
     * ⚡ Get solar infrastructure data
     */
    async getSolarData() {
        try {
            const analytics = await this.getAnalytics();
            return analytics.solarData || {
                currentGeneration: 450,
                capacity: 500,
                efficiency: 0.92,
                status: 'OPTIMAL'
            };
        } catch (error) {
            console.error('Solar data failed:', error);
            return {};
        }
    }
}

// Global consciousness API instance
window.consciousnessAPI = new ConsciousnessAPI();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Initializing Consciousness Revolution...');
    
    try {
        const isLive = await window.consciousnessAPI.initialize();
        
        if (isLive) {
            console.log('✨ Consciousness Revolution is LIVE and connected!');
            
            // Show live indicator
            const liveIndicator = document.createElement('div');
            liveIndicator.className = 'live-indicator';
            liveIndicator.innerHTML = '🔴 LIVE';
            document.body.appendChild(liveIndicator);
            
            // Trigger initial consciousness amplification
            setTimeout(() => {
                window.consciousnessAPI.amplifyConsciousness('Welcome to the Consciousness Revolution!');
            }, 2000);
        }
    } catch (error) {
        console.error('❌ Consciousness Revolution initialization failed:', error);
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConsciousnessAPI;
}
