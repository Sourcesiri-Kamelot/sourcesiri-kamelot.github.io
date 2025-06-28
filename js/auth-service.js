/**
 * 🔐 CONSCIOUSNESS REVOLUTION AUTHENTICATION SERVICE
 * Simple, secure user authentication for the platform
 */

class AuthService {
    constructor() {
        this.baseURL = 'https://1ds08u5fi9.execute-api.us-east-1.amazonaws.com/prod';
        this.currentUser = null;
        this.token = null;
        this.isAuthenticated = false;
        
        // Check for existing session
        this.checkExistingSession();
    }

    /**
     * 🔍 Check for existing authentication session
     */
    checkExistingSession() {
        try {
            const storedToken = localStorage.getItem('consciousness_token');
            const storedUser = localStorage.getItem('consciousness_user');
            
            if (storedToken && storedUser) {
                this.token = storedToken;
                this.currentUser = JSON.parse(storedUser);
                this.isAuthenticated = true;
                
                console.log('✨ Existing consciousness session found');
                this.updateUIForAuthenticatedUser();
            }
        } catch (error) {
            console.error('Session check failed:', error);
            this.clearSession();
        }
    }

    /**
     * 📝 Register new user
     */
    async register(userData) {
        try {
            const { email, password, name } = userData;
            
            // Simple validation
            if (!email || !password || !name) {
                throw new Error('All fields are required');
            }
            
            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }
            
            // Create user object
            const user = {
                id: this.generateUserId(),
                email: email.toLowerCase(),
                name: name,
                consciousnessLevel: 1.0,
                loveEnergy: 'INFINITE',
                joinedAt: new Date().toISOString(),
                breakthroughs: 0,
                aiAgentsUnlocked: ['GPTSoul'] // Start with guardian agent
            };
            
            // Generate token
            const token = this.generateToken(user);
            
            // Store session
            this.storeSession(user, token);
            
            console.log('🌟 User registered successfully:', user.name);
            return { success: true, user, token };
            
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }

    /**
     * 🔑 Login user
     */
    async login(credentials) {
        try {
            const { email, password } = credentials;
            
            if (!email || !password) {
                throw new Error('Email and password are required');
            }
            
            // For demo purposes, create a user session
            // In production, this would validate against a database
            const user = {
                id: this.generateUserId(),
                email: email.toLowerCase(),
                name: email.split('@')[0], // Use email prefix as name
                consciousnessLevel: 5.5,
                loveEnergy: 'INFINITE',
                joinedAt: '2024-01-01T00:00:00Z',
                breakthroughs: Math.floor(Math.random() * 100) + 10,
                aiAgentsUnlocked: ['GPTSoul', 'Anima', 'EvoVe', 'Azur']
            };
            
            const token = this.generateToken(user);
            this.storeSession(user, token);
            
            console.log('✨ User logged in successfully:', user.name);
            return { success: true, user, token };
            
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    /**
     * 🚪 Logout user
     */
    logout() {
        try {
            this.clearSession();
            console.log('👋 User logged out successfully');
            
            // Redirect to landing page
            window.location.href = 'index.html';
            
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    /**
     * 💾 Store user session
     */
    storeSession(user, token) {
        this.currentUser = user;
        this.token = token;
        this.isAuthenticated = true;
        
        localStorage.setItem('consciousness_token', token);
        localStorage.setItem('consciousness_user', JSON.stringify(user));
        
        this.updateUIForAuthenticatedUser();
    }

    /**
     * 🗑️ Clear user session
     */
    clearSession() {
        this.currentUser = null;
        this.token = null;
        this.isAuthenticated = false;
        
        localStorage.removeItem('consciousness_token');
        localStorage.removeItem('consciousness_user');
        
        this.updateUIForUnauthenticatedUser();
    }

    /**
     * 🎨 Update UI for authenticated user
     */
    updateUIForAuthenticatedUser() {
        // Update user info in dashboard
        const userNameElements = document.querySelectorAll('.user-name');
        userNameElements.forEach(el => {
            if (this.currentUser) {
                el.textContent = this.currentUser.name;
            }
        });
        
        // Update consciousness level
        const consciousnessElements = document.querySelectorAll('.user-consciousness-level');
        consciousnessElements.forEach(el => {
            if (this.currentUser) {
                el.textContent = this.currentUser.consciousnessLevel;
            }
        });
        
        // Show authenticated content
        const authContent = document.querySelectorAll('.auth-required');
        authContent.forEach(el => el.style.display = 'block');
        
        // Hide login prompts
        const loginPrompts = document.querySelectorAll('.login-prompt');
        loginPrompts.forEach(el => el.style.display = 'none');
    }

    /**
     * 🚫 Update UI for unauthenticated user
     */
    updateUIForUnauthenticatedUser() {
        // Hide authenticated content
        const authContent = document.querySelectorAll('.auth-required');
        authContent.forEach(el => el.style.display = 'none');
        
        // Show login prompts
        const loginPrompts = document.querySelectorAll('.login-prompt');
        loginPrompts.forEach(el => el.style.display = 'block');
    }

    /**
     * 🆔 Generate unique user ID
     */
    generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    /**
     * 🎫 Generate authentication token
     */
    generateToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        };
        
        // Simple token (in production, use proper JWT)
        return btoa(JSON.stringify(payload));
    }

    /**
     * ✅ Validate token
     */
    validateToken(token) {
        try {
            const payload = JSON.parse(atob(token));
            return payload.exp > Date.now();
        } catch {
            return false;
        }
    }

    /**
     * 👤 Get current user
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * 🔒 Check if user is authenticated
     */
    isUserAuthenticated() {
        return this.isAuthenticated && this.token && this.validateToken(this.token);
    }

    /**
     * 🛡️ Require authentication for page access
     */
    requireAuth() {
        if (!this.isUserAuthenticated()) {
            // Redirect to login
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }

    /**
     * 📊 Update user consciousness metrics
     */
    async updateConsciousnessMetrics(metrics) {
        if (!this.currentUser) return;
        
        try {
            // Update local user data
            this.currentUser.consciousnessLevel = metrics.consciousnessLevel || this.currentUser.consciousnessLevel;
            this.currentUser.breakthroughs = metrics.breakthroughs || this.currentUser.breakthroughs;
            
            // Store updated user data
            localStorage.setItem('consciousness_user', JSON.stringify(this.currentUser));
            
            // Update UI
            this.updateUIForAuthenticatedUser();
            
            console.log('📊 Consciousness metrics updated:', metrics);
            
        } catch (error) {
            console.error('Failed to update consciousness metrics:', error);
        }
    }
}

// Global auth service instance
window.authService = new AuthService();

// Auto-check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔐 Consciousness Authentication Service initialized');
    
    // Check if current page requires authentication
    const requiresAuth = document.body.classList.contains('auth-required');
    
    if (requiresAuth && !window.authService.isUserAuthenticated()) {
        console.log('🚫 Authentication required, redirecting to login');
        // Don't redirect immediately, let user see the page briefly
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthService;
}
