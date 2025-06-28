/**
 * 💾 CONSCIOUSNESS REVOLUTION DATABASE SERVICE
 * Simple client-side data persistence with localStorage and API sync
 */

class DatabaseService {
    constructor() {
        this.baseURL = 'https://1ds08u5fi9.execute-api.us-east-1.amazonaws.com/prod';
        this.localStoragePrefix = 'consciousness_';
        this.syncQueue = [];
        this.isOnline = navigator.onLine;
        
        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncPendingData();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    /**
     * 💾 Store user data locally
     */
    async storeUserData(userId, data) {
        try {
            const key = `${this.localStoragePrefix}user_${userId}`;
            const userData = {
                ...data,
                lastUpdated: new Date().toISOString(),
                synced: false
            };
            
            localStorage.setItem(key, JSON.stringify(userData));
            
            // Add to sync queue if online
            if (this.isOnline) {
                this.addToSyncQueue('user', userId, userData);
            }
            
            console.log('💾 User data stored locally:', userId);
            return true;
            
        } catch (error) {
            console.error('Failed to store user data:', error);
            return false;
        }
    }

    /**
     * 📖 Retrieve user data
     */
    async getUserData(userId) {
        try {
            const key = `${this.localStoragePrefix}user_${userId}`;
            const storedData = localStorage.getItem(key);
            
            if (storedData) {
                return JSON.parse(storedData);
            }
            
            return null;
            
        } catch (error) {
            console.error('Failed to retrieve user data:', error);
            return null;
        }
    }

    /**
     * 📊 Store consciousness metrics
     */
    async storeConsciousnessMetrics(userId, metrics) {
        try {
            const key = `${this.localStoragePrefix}metrics_${userId}`;
            const existingMetrics = this.getLocalData(key) || [];
            
            const newMetric = {
                ...metrics,
                timestamp: new Date().toISOString(),
                id: this.generateId()
            };
            
            existingMetrics.push(newMetric);
            
            // Keep only last 100 metrics
            if (existingMetrics.length > 100) {
                existingMetrics.splice(0, existingMetrics.length - 100);
            }
            
            localStorage.setItem(key, JSON.stringify(existingMetrics));
            
            // Add to sync queue
            if (this.isOnline) {
                this.addToSyncQueue('metrics', userId, newMetric);
            }
            
            console.log('📊 Consciousness metrics stored:', newMetric);
            return true;
            
        } catch (error) {
            console.error('Failed to store consciousness metrics:', error);
            return false;
        }
    }

    /**
     * 📈 Get consciousness metrics
     */
    async getConsciousnessMetrics(userId, limit = 50) {
        try {
            const key = `${this.localStoragePrefix}metrics_${userId}`;
            const metrics = this.getLocalData(key) || [];
            
            // Return most recent metrics
            return metrics.slice(-limit);
            
        } catch (error) {
            console.error('Failed to retrieve consciousness metrics:', error);
            return [];
        }
    }

    /**
     * 🎯 Store breakthrough events
     */
    async storeBreakthrough(userId, breakthrough) {
        try {
            const key = `${this.localStoragePrefix}breakthroughs_${userId}`;
            const existingBreakthroughs = this.getLocalData(key) || [];
            
            const newBreakthrough = {
                ...breakthrough,
                timestamp: new Date().toISOString(),
                id: this.generateId()
            };
            
            existingBreakthroughs.push(newBreakthrough);
            
            localStorage.setItem(key, JSON.stringify(existingBreakthroughs));
            
            // Add to sync queue
            if (this.isOnline) {
                this.addToSyncQueue('breakthrough', userId, newBreakthrough);
            }
            
            console.log('🎯 Breakthrough stored:', newBreakthrough);
            return true;
            
        } catch (error) {
            console.error('Failed to store breakthrough:', error);
            return false;
        }
    }

    /**
     * 🌟 Get user breakthroughs
     */
    async getBreakthroughs(userId, limit = 20) {
        try {
            const key = `${this.localStoragePrefix}breakthroughs_${userId}`;
            const breakthroughs = this.getLocalData(key) || [];
            
            // Return most recent breakthroughs
            return breakthroughs.slice(-limit).reverse();
            
        } catch (error) {
            console.error('Failed to retrieve breakthroughs:', error);
            return [];
        }
    }

    /**
     * 🤖 Store AI interaction
     */
    async storeAIInteraction(userId, interaction) {
        try {
            const key = `${this.localStoragePrefix}interactions_${userId}`;
            const existingInteractions = this.getLocalData(key) || [];
            
            const newInteraction = {
                ...interaction,
                timestamp: new Date().toISOString(),
                id: this.generateId()
            };
            
            existingInteractions.push(newInteraction);
            
            // Keep only last 200 interactions
            if (existingInteractions.length > 200) {
                existingInteractions.splice(0, existingInteractions.length - 200);
            }
            
            localStorage.setItem(key, JSON.stringify(existingInteractions));
            
            console.log('🤖 AI interaction stored:', newInteraction);
            return true;
            
        } catch (error) {
            console.error('Failed to store AI interaction:', error);
            return false;
        }
    }

    /**
     * 💬 Get AI interactions
     */
    async getAIInteractions(userId, limit = 50) {
        try {
            const key = `${this.localStoragePrefix}interactions_${userId}`;
            const interactions = this.getLocalData(key) || [];
            
            return interactions.slice(-limit);
            
        } catch (error) {
            console.error('Failed to retrieve AI interactions:', error);
            return [];
        }
    }

    /**
     * 🔄 Add data to sync queue
     */
    addToSyncQueue(type, userId, data) {
        this.syncQueue.push({
            type,
            userId,
            data,
            timestamp: new Date().toISOString()
        });
        
        // Process sync queue
        this.processSyncQueue();
    }

    /**
     * ⚡ Process sync queue
     */
    async processSyncQueue() {
        if (!this.isOnline || this.syncQueue.length === 0) {
            return;
        }
        
        try {
            const item = this.syncQueue.shift();
            
            // In a real implementation, this would sync to AWS DynamoDB
            console.log('🔄 Syncing to cloud:', item);
            
            // For demo purposes, we'll just log the sync
            // await this.syncToCloud(item);
            
            // Continue processing queue
            if (this.syncQueue.length > 0) {
                setTimeout(() => this.processSyncQueue(), 1000);
            }
            
        } catch (error) {
            console.error('Sync failed:', error);
            // Re-add item to queue for retry
            this.syncQueue.unshift(item);
        }
    }

    /**
     * 🌐 Sync pending data when coming back online
     */
    async syncPendingData() {
        console.log('🌐 Coming back online, syncing pending data...');
        this.processSyncQueue();
    }

    /**
     * 📱 Get local data helper
     */
    getLocalData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch {
            return null;
        }
    }

    /**
     * 🆔 Generate unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * 🗑️ Clear user data
     */
    async clearUserData(userId) {
        try {
            const keys = [
                `${this.localStoragePrefix}user_${userId}`,
                `${this.localStoragePrefix}metrics_${userId}`,
                `${this.localStoragePrefix}breakthroughs_${userId}`,
                `${this.localStoragePrefix}interactions_${userId}`
            ];
            
            keys.forEach(key => localStorage.removeItem(key));
            
            console.log('🗑️ User data cleared:', userId);
            return true;
            
        } catch (error) {
            console.error('Failed to clear user data:', error);
            return false;
        }
    }

    /**
     * 📊 Get storage usage stats
     */
    getStorageStats() {
        try {
            let totalSize = 0;
            let itemCount = 0;
            
            for (let key in localStorage) {
                if (key.startsWith(this.localStoragePrefix)) {
                    totalSize += localStorage[key].length;
                    itemCount++;
                }
            }
            
            return {
                totalSize,
                itemCount,
                formattedSize: this.formatBytes(totalSize)
            };
            
        } catch (error) {
            console.error('Failed to get storage stats:', error);
            return { totalSize: 0, itemCount: 0, formattedSize: '0 B' };
        }
    }

    /**
     * 📏 Format bytes helper
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Global database service instance
window.databaseService = new DatabaseService();

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('💾 Consciousness Database Service initialized');
    
    // Show storage stats in console
    const stats = window.databaseService.getStorageStats();
    console.log('📊 Storage stats:', stats);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DatabaseService;
}
