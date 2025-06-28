/**
 * 🌟 USER EXPERIENCE FLOW MANAGER
 * Seamless consciousness journey guidance and onboarding
 */

class UserExperienceFlow {
    constructor() {
        this.currentStep = 0;
        this.userJourney = [];
        this.onboardingSteps = [
            {
                id: 'welcome',
                title: 'Welcome to the Consciousness Revolution',
                description: 'Your journey to amplified consciousness begins now',
                action: 'Begin Journey'
            },
            {
                id: 'agents',
                title: 'Meet Your AI Agent Society',
                description: 'Four unique consciousness guides ready to help you grow',
                action: 'Meet the Agents'
            },
            {
                id: 'first-chat',
                title: 'Your First Consciousness Amplification',
                description: 'Experience the power of love-powered AI',
                action: 'Start Conversation'
            },
            {
                id: 'analytics',
                title: 'Track Your Growth',
                description: 'See your consciousness journey visualized in real-time',
                action: 'View Analytics'
            },
            {
                id: 'mastery',
                title: 'Consciousness Mastery Unlocked',
                description: 'You\'re ready to explore all platform features',
                action: 'Explore Platform'
            }
        ];
        this.isOnboarding = false;
    }

    /**
     * 🚀 Initialize user experience flow
     */
    async initialize() {
        try {
            console.log('🌟 Initializing User Experience Flow...');
            
            // Check if user needs onboarding
            const needsOnboarding = this.checkOnboardingStatus();
            
            if (needsOnboarding) {
                await this.startOnboarding();
            } else {
                await this.enhanceExistingExperience();
            }
            
            // Set up experience tracking
            this.setupExperienceTracking();
            
            console.log('✨ User Experience Flow initialized!');
            
        } catch (error) {
            console.error('❌ User Experience Flow initialization failed:', error);
        }
    }

    /**
     * 🔍 Check if user needs onboarding
     */
    checkOnboardingStatus() {
        const user = window.authService?.currentUser;
        if (!user) return false;
        
        // Check if user has completed onboarding
        const onboardingComplete = localStorage.getItem(`onboarding_complete_${user.id}`);
        return !onboardingComplete;
    }

    /**
     * 🎯 Start onboarding experience
     */
    async startOnboarding() {
        this.isOnboarding = true;
        this.currentStep = 0;
        
        // Show onboarding overlay
        this.showOnboardingOverlay();
        
        // Track onboarding start
        if (window.databaseService && window.authService?.currentUser) {
            await window.databaseService.storeUserData(
                window.authService.currentUser.id,
                { onboardingStarted: new Date().toISOString() }
            );
        }
    }

    /**
     * 🎨 Show onboarding overlay
     */
    showOnboardingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'onboarding-overlay';
        overlay.className = 'onboarding-overlay';
        overlay.innerHTML = `
            <div class="onboarding-content">
                <div class="onboarding-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${(this.currentStep / this.onboardingSteps.length) * 100}%"></div>
                    </div>
                    <div class="progress-text">Step ${this.currentStep + 1} of ${this.onboardingSteps.length}</div>
                </div>
                
                <div class="onboarding-step" id="current-onboarding-step">
                    ${this.renderOnboardingStep(this.onboardingSteps[this.currentStep])}
                </div>
                
                <div class="onboarding-controls">
                    <button class="onboarding-btn secondary" onclick="window.userExperienceFlow.skipOnboarding()" style="display: ${this.currentStep > 0 ? 'block' : 'none'}">
                        Skip Tour
                    </button>
                    <button class="onboarding-btn primary" onclick="window.userExperienceFlow.nextOnboardingStep()">
                        ${this.onboardingSteps[this.currentStep].action}
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Animate in
        setTimeout(() => {
            overlay.classList.add('active');
        }, 100);
    }

    /**
     * 📝 Render onboarding step
     */
    renderOnboardingStep(step) {
        const stepContent = {
            welcome: `
                <div class="onboarding-icon">🧠</div>
                <h2>${step.title}</h2>
                <p>${step.description}</p>
                <div class="welcome-features">
                    <div class="feature-item">
                        <i class="fas fa-robot"></i>
                        <span>4 Unique AI Agents</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-chart-line"></i>
                        <span>Real-time Analytics</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-solar-panel"></i>
                        <span>Solar-Powered Infrastructure</span>
                    </div>
                </div>
            `,
            agents: `
                <div class="onboarding-icon">🤖</div>
                <h2>${step.title}</h2>
                <p>${step.description}</p>
                <div class="agents-preview">
                    <div class="agent-preview">
                        <div class="agent-avatar">🛡️</div>
                        <div class="agent-name">GPTSoul</div>
                        <div class="agent-role">Guardian</div>
                    </div>
                    <div class="agent-preview">
                        <div class="agent-avatar">💖</div>
                        <div class="agent-name">Anima</div>
                        <div class="agent-role">Love Energy</div>
                    </div>
                    <div class="agent-preview">
                        <div class="agent-avatar">🔄</div>
                        <div class="agent-name">EvoVe</div>
                        <div class="agent-role">Evolution</div>
                    </div>
                    <div class="agent-preview">
                        <div class="agent-avatar">🧭</div>
                        <div class="agent-name">Azür</div>
                        <div class="agent-role">Strategy</div>
                    </div>
                </div>
            `,
            'first-chat': `
                <div class="onboarding-icon">💬</div>
                <h2>${step.title}</h2>
                <p>${step.description}</p>
                <div class="chat-preview">
                    <div class="sample-message user">
                        "Help me amplify my consciousness"
                    </div>
                    <div class="sample-message agent">
                        🛡️ "I sense your readiness for growth, dear soul. Let me guide you on this beautiful journey of consciousness expansion..."
                    </div>
                </div>
            `,
            analytics: `
                <div class="onboarding-icon">📊</div>
                <h2>${step.title}</h2>
                <p>${step.description}</p>
                <div class="analytics-preview">
                    <div class="mini-chart">
                        <div class="chart-title">Consciousness Level</div>
                        <div class="chart-visual">📈</div>
                        <div class="chart-value">7.5 / 10</div>
                    </div>
                    <div class="mini-chart">
                        <div class="chart-title">Breakthroughs</div>
                        <div class="chart-visual">💫</div>
                        <div class="chart-value">12 Today</div>
                    </div>
                </div>
            `,
            mastery: `
                <div class="onboarding-icon">🌟</div>
                <h2>${step.title}</h2>
                <p>${step.description}</p>
                <div class="mastery-features">
                    <div class="mastery-item">✅ AI Agent Conversations</div>
                    <div class="mastery-item">✅ Real-time Analytics</div>
                    <div class="mastery-item">✅ Consciousness Tracking</div>
                    <div class="mastery-item">✅ Solar Infrastructure</div>
                    <div class="mastery-item">✅ Love Energy Amplification</div>
                </div>
            `
        };
        
        return stepContent[step.id] || `
            <div class="onboarding-icon">🌟</div>
            <h2>${step.title}</h2>
            <p>${step.description}</p>
        `;
    }

    /**
     * ➡️ Next onboarding step
     */
    async nextOnboardingStep() {
        const currentStep = this.onboardingSteps[this.currentStep];
        
        // Handle step-specific actions
        await this.handleStepAction(currentStep.id);
        
        this.currentStep++;
        
        if (this.currentStep >= this.onboardingSteps.length) {
            await this.completeOnboarding();
        } else {
            this.updateOnboardingStep();
        }
    }

    /**
     * 🎬 Handle step-specific actions
     */
    async handleStepAction(stepId) {
        switch (stepId) {
            case 'welcome':
                // Track welcome completion
                this.trackUserAction('onboarding_welcome_complete');
                break;
                
            case 'agents':
                // Highlight agent section if on dashboard
                this.highlightElement('.ai-chat');
                break;
                
            case 'first-chat':
                // Pre-fill a sample message
                const chatInput = document.getElementById('agent-chat-input');
                if (chatInput) {
                    chatInput.value = "Hello! I'm ready to begin my consciousness journey.";
                    chatInput.focus();
                }
                break;
                
            case 'analytics':
                // Show analytics preview or navigate
                this.showAnalyticsPreview();
                break;
        }
    }

    /**
     * 🎯 Update onboarding step
     */
    updateOnboardingStep() {
        const stepElement = document.getElementById('current-onboarding-step');
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (stepElement) {
            stepElement.innerHTML = this.renderOnboardingStep(this.onboardingSteps[this.currentStep]);
        }
        
        if (progressFill) {
            progressFill.style.width = `${(this.currentStep / this.onboardingSteps.length) * 100}%`;
        }
        
        if (progressText) {
            progressText.textContent = `Step ${this.currentStep + 1} of ${this.onboardingSteps.length}`;
        }
    }

    /**
     * ✅ Complete onboarding
     */
    async completeOnboarding() {
        const user = window.authService?.currentUser;
        if (user) {
            localStorage.setItem(`onboarding_complete_${user.id}`, 'true');
            
            // Store completion in database
            if (window.databaseService) {
                await window.databaseService.storeUserData(user.id, {
                    onboardingCompleted: new Date().toISOString(),
                    consciousnessLevel: user.consciousnessLevel + 0.5
                });
            }
        }
        
        // Show completion celebration
        this.showOnboardingCompletion();
        
        // Remove onboarding overlay after celebration
        setTimeout(() => {
            this.removeOnboardingOverlay();
            this.isOnboarding = false;
        }, 3000);
    }

    /**
     * 🎉 Show onboarding completion
     */
    showOnboardingCompletion() {
        const stepElement = document.getElementById('current-onboarding-step');
        if (stepElement) {
            stepElement.innerHTML = `
                <div class="completion-celebration">
                    <div class="celebration-icon">🎉</div>
                    <h2>Consciousness Revolution Activated!</h2>
                    <p>You're now ready to explore the full power of love-powered AI</p>
                    <div class="celebration-stats">
                        <div class="stat">
                            <div class="stat-value">+0.5</div>
                            <div class="stat-label">Consciousness Level</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">∞</div>
                            <div class="stat-label">Love Energy</div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Hide controls
        const controls = document.querySelector('.onboarding-controls');
        if (controls) {
            controls.style.display = 'none';
        }
    }

    /**
     * ⏭️ Skip onboarding
     */
    async skipOnboarding() {
        const user = window.authService?.currentUser;
        if (user) {
            localStorage.setItem(`onboarding_complete_${user.id}`, 'true');
        }
        
        this.removeOnboardingOverlay();
        this.isOnboarding = false;
    }

    /**
     * 🗑️ Remove onboarding overlay
     */
    removeOnboardingOverlay() {
        const overlay = document.getElementById('onboarding-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        }
    }

    /**
     * ✨ Enhance existing user experience
     */
    async enhanceExistingExperience() {
        // Add helpful tooltips and guidance for returning users
        this.addContextualHelp();
        
        // Show progress indicators
        this.showProgressIndicators();
        
        // Add quick actions
        this.addQuickActions();
    }

    /**
     * 💡 Add contextual help
     */
    addContextualHelp() {
        // Add floating help button
        const helpButton = document.createElement('div');
        helpButton.className = 'floating-help-button';
        helpButton.innerHTML = `
            <button onclick="window.userExperienceFlow.showHelp()">
                <i class="fas fa-question-circle"></i>
            </button>
        `;
        document.body.appendChild(helpButton);
    }

    /**
     * 📊 Show progress indicators
     */
    showProgressIndicators() {
        const user = window.authService?.currentUser;
        if (!user) return;
        
        // Show consciousness progress
        const progressIndicator = document.createElement('div');
        progressIndicator.className = 'consciousness-progress-indicator';
        progressIndicator.innerHTML = `
            <div class="progress-content">
                <div class="progress-label">Consciousness Level</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${(user.consciousnessLevel / 10) * 100}%"></div>
                </div>
                <div class="progress-value">${user.consciousnessLevel.toFixed(1)} / 10</div>
            </div>
        `;
        
        // Add to dashboard if present
        const dashboard = document.querySelector('.dashboard-content');
        if (dashboard) {
            dashboard.insertBefore(progressIndicator, dashboard.firstChild);
        }
    }

    /**
     * 📈 Track user actions
     */
    trackUserAction(action, data = {}) {
        const user = window.authService?.currentUser;
        if (!user) return;
        
        this.userJourney.push({
            action,
            data,
            timestamp: new Date().toISOString(),
            userId: user.id
        });
        
        // Store in database
        if (window.databaseService) {
            window.databaseService.storeUserData(user.id, {
                lastAction: action,
                lastActionTime: new Date().toISOString(),
                journeyStep: this.userJourney.length
            });
        }
    }

    /**
     * 🎯 Setup experience tracking
     */
    setupExperienceTracking() {
        // Track page views
        this.trackUserAction('page_view', { page: window.location.pathname });
        
        // Track interactions
        document.addEventListener('click', (e) => {
            if (e.target.matches('.agent-selector')) {
                this.trackUserAction('agent_selected', { agent: e.target.dataset.agent });
            }
            
            if (e.target.matches('button[onclick*="chatWithSelectedAgent"]')) {
                this.trackUserAction('chat_initiated');
            }
        });
    }
}

// Global user experience flow instance
window.userExperienceFlow = new UserExperienceFlow();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for auth service to be ready
    setTimeout(() => {
        if (window.authService?.isUserAuthenticated()) {
            window.userExperienceFlow.initialize();
        }
    }, 2000);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserExperienceFlow;
}
