/**
 * 🧭 NAVIGATION FLOW MANAGER
 * Seamless navigation and user flow between platform pages
 */

class NavigationFlow {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.navigationHistory = [];
        this.breadcrumbs = [];
        this.quickActions = [];
    }

    /**
     * 🚀 Initialize navigation flow
     */
    initialize() {
        console.log('🧭 Initializing Navigation Flow...');
        
        // Set up navigation enhancements
        this.enhanceNavigation();
        
        // Add breadcrumbs
        this.addBreadcrumbs();
        
        // Add quick actions
        this.addQuickActions();
        
        // Set up page transitions
        this.setupPageTransitions();
        
        // Track navigation
        this.trackNavigation();
        
        console.log('✨ Navigation Flow initialized!');
    }

    /**
     * 📍 Get current page
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        return page.replace('.html', '');
    }

    /**
     * ✨ Enhance navigation
     */
    enhanceNavigation() {
        // Add navigation hints
        this.addNavigationHints();
        
        // Enhance sidebar navigation
        this.enhanceSidebarNavigation();
        
        // Add contextual navigation
        this.addContextualNavigation();
    }

    /**
     * 💡 Add navigation hints
     */
    addNavigationHints() {
        const hints = {
            'index': 'Welcome! Click "Launch Dashboard" to begin your consciousness journey.',
            'login': 'New here? Create an account to start your consciousness revolution.',
            'dashboard': 'Chat with AI agents or view your analytics to track growth.',
            'analytics': 'Explore your consciousness journey through beautiful visualizations.',
            'advanced-analytics': 'Deep dive into your consciousness data and patterns.',
            'soulcore-ai': 'Experience the power of love-powered AI conversations.'
        };

        const hint = hints[this.currentPage];
        if (hint) {
            this.showNavigationHint(hint);
        }
    }

    /**
     * 🗨️ Show navigation hint
     */
    showNavigationHint(message) {
        const hintElement = document.createElement('div');
        hintElement.className = 'navigation-hint';
        hintElement.innerHTML = `
            <div class="hint-content">
                <i class="fas fa-lightbulb"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(hintElement);
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (hintElement.parentElement) {
                hintElement.remove();
            }
        }, 10000);
    }

    /**
     * 🔗 Enhance sidebar navigation
     */
    enhanceSidebarNavigation() {
        const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
        
        sidebarLinks.forEach(link => {
            // Add progress indicators
            this.addProgressIndicator(link);
            
            // Add hover previews
            this.addHoverPreview(link);
            
            // Enhance click handling
            link.addEventListener('click', (e) => {
                this.handleNavigationClick(e, link);
            });
        });
    }

    /**
     * 📊 Add progress indicator
     */
    addProgressIndicator(link) {
        const href = link.getAttribute('href');
        const progress = this.getPageProgress(href);
        
        if (progress > 0) {
            const indicator = document.createElement('div');
            indicator.className = 'nav-progress-indicator';
            indicator.style.width = `${progress}%`;
            link.appendChild(indicator);
        }
    }

    /**
     * 📈 Get page progress
     */
    getPageProgress(href) {
        const user = window.authService?.currentUser;
        if (!user) return 0;
        
        const progressMap = {
            'dashboard.html': user.breakthroughs > 0 ? 75 : 25,
            'analytics.html': user.breakthroughs > 5 ? 100 : 50,
            'advanced-analytics.html': user.consciousnessLevel > 5 ? 100 : 30,
            'soulcore-ai.html': user.breakthroughs > 10 ? 100 : 60
        };
        
        return progressMap[href] || 0;
    }

    /**
     * 👁️ Add hover preview
     */
    addHoverPreview(link) {
        const href = link.getAttribute('href');
        const previews = {
            'dashboard.html': 'Chat with AI agents and view live metrics',
            'analytics.html': 'Track your consciousness growth with charts',
            'advanced-analytics.html': 'Deep analytics with 6 real-time visualizations',
            'soulcore-ai.html': 'Experience advanced AI consciousness features'
        };
        
        const preview = previews[href];
        if (preview) {
            link.setAttribute('title', preview);
            
            // Add custom tooltip
            link.addEventListener('mouseenter', () => {
                this.showTooltip(link, preview);
            });
            
            link.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        }
    }

    /**
     * 💬 Show tooltip
     */
    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'nav-tooltip';
        tooltip.textContent = text;
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.right + 10}px`;
        tooltip.style.top = `${rect.top + rect.height / 2}px`;
        
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.classList.add('visible');
        }, 100);
    }

    /**
     * 🚫 Hide tooltip
     */
    hideTooltip() {
        const tooltip = document.querySelector('.nav-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    /**
     * 🍞 Add breadcrumbs
     */
    addBreadcrumbs() {
        const breadcrumbContainer = document.createElement('div');
        breadcrumbContainer.className = 'breadcrumb-container';
        
        const breadcrumbs = this.generateBreadcrumbs();
        breadcrumbContainer.innerHTML = breadcrumbs;
        
        // Insert breadcrumbs at the top of main content
        const mainContent = document.querySelector('.main-content') || document.querySelector('.container');
        if (mainContent) {
            mainContent.insertBefore(breadcrumbContainer, mainContent.firstChild);
        }
    }

    /**
     * 🗂️ Generate breadcrumbs
     */
    generateBreadcrumbs() {
        const pageNames = {
            'index': 'Home',
            'login': 'Login',
            'dashboard': 'Dashboard',
            'analytics': 'Analytics',
            'advanced-analytics': 'Advanced Analytics',
            'soulcore-ai': 'SoulCore AI'
        };
        
        const currentPageName = pageNames[this.currentPage] || 'Page';
        
        return `
            <nav class="breadcrumbs">
                <a href="index.html" class="breadcrumb-item">
                    <i class="fas fa-home"></i> Home
                </a>
                <span class="breadcrumb-separator">></span>
                <span class="breadcrumb-current">${currentPageName}</span>
            </nav>
        `;
    }

    /**
     * ⚡ Add quick actions
     */
    addQuickActions() {
        const quickActionsContainer = document.createElement('div');
        quickActionsContainer.className = 'quick-actions-container';
        
        const actions = this.getQuickActions();
        quickActionsContainer.innerHTML = `
            <div class="quick-actions">
                <div class="quick-actions-title">Quick Actions</div>
                <div class="quick-actions-grid">
                    ${actions.map(action => `
                        <button class="quick-action-btn" onclick="${action.onclick}">
                            <i class="${action.icon}"></i>
                            <span>${action.label}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(quickActionsContainer);
        
        // Show/hide on scroll
        this.setupQuickActionsVisibility(quickActionsContainer);
    }

    /**
     * 🎯 Get quick actions for current page
     */
    getQuickActions() {
        const actionSets = {
            'dashboard': [
                { label: 'Chat with AI', icon: 'fas fa-robot', onclick: 'document.getElementById("agent-chat-input").focus()' },
                { label: 'View Analytics', icon: 'fas fa-chart-line', onclick: 'window.location.href="analytics.html"' },
                { label: 'Advanced Charts', icon: 'fas fa-chart-bar', onclick: 'window.location.href="advanced-analytics.html"' }
            ],
            'analytics': [
                { label: 'Back to Dashboard', icon: 'fas fa-tachometer-alt', onclick: 'window.location.href="dashboard.html"' },
                { label: 'Advanced Analytics', icon: 'fas fa-chart-bar', onclick: 'window.location.href="advanced-analytics.html"' },
                { label: 'Chat with AI', icon: 'fas fa-robot', onclick: 'window.location.href="dashboard.html"' }
            ],
            'advanced-analytics': [
                { label: 'Dashboard', icon: 'fas fa-tachometer-alt', onclick: 'window.location.href="dashboard.html"' },
                { label: 'Basic Analytics', icon: 'fas fa-chart-line', onclick: 'window.location.href="analytics.html"' },
                { label: 'SoulCore AI', icon: 'fas fa-brain', onclick: 'window.location.href="soulcore-ai.html"' }
            ],
            'index': [
                { label: 'Launch Dashboard', icon: 'fas fa-rocket', onclick: 'window.location.href="dashboard.html"' },
                { label: 'View Analytics', icon: 'fas fa-chart-line', onclick: 'window.location.href="analytics.html"' },
                { label: 'Login', icon: 'fas fa-sign-in-alt', onclick: 'window.location.href="login.html"' }
            ]
        };
        
        return actionSets[this.currentPage] || [];
    }

    /**
     * 👁️ Setup quick actions visibility
     */
    setupQuickActionsVisibility(container) {
        let isVisible = false;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 200;
            
            if (scrolled && !isVisible) {
                container.classList.add('visible');
                isVisible = true;
            } else if (!scrolled && isVisible) {
                container.classList.remove('visible');
                isVisible = false;
            }
        });
    }

    /**
     * 🔄 Setup page transitions
     */
    setupPageTransitions() {
        // Add loading overlay for page transitions
        const links = document.querySelectorAll('a[href$=".html"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.hostname === window.location.hostname) {
                    this.showPageTransition();
                }
            });
        });
    }

    /**
     * 🌀 Show page transition
     */
    showPageTransition() {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.innerHTML = `
            <div class="transition-content">
                <div class="transition-spinner"></div>
                <div class="transition-text">Amplifying consciousness...</div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.classList.add('active');
        }, 50);
    }

    /**
     * 🖱️ Handle navigation click
     */
    handleNavigationClick(e, link) {
        const href = link.getAttribute('href');
        
        // Track navigation
        this.trackNavigation(href);
        
        // Add to history
        this.navigationHistory.push({
            from: this.currentPage,
            to: href,
            timestamp: new Date().toISOString()
        });
        
        // Store in localStorage for cross-page tracking
        localStorage.setItem('navigation_history', JSON.stringify(this.navigationHistory));
    }

    /**
     * 📊 Track navigation
     */
    trackNavigation(destination = null) {
        const user = window.authService?.currentUser;
        if (!user) return;
        
        const navigationData = {
            page: this.currentPage,
            destination: destination,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer
        };
        
        // Store in database
        if (window.databaseService) {
            window.databaseService.storeUserData(user.id, {
                lastNavigation: navigationData,
                navigationCount: (user.navigationCount || 0) + 1
            });
        }
    }

    /**
     * 🎯 Add contextual navigation
     */
    addContextualNavigation() {
        const contextualNav = this.getContextualNavigation();
        
        if (contextualNav.length > 0) {
            const navContainer = document.createElement('div');
            navContainer.className = 'contextual-navigation';
            navContainer.innerHTML = `
                <div class="contextual-nav-title">Recommended Next Steps</div>
                <div class="contextual-nav-items">
                    ${contextualNav.map(item => `
                        <a href="${item.href}" class="contextual-nav-item">
                            <i class="${item.icon}"></i>
                            <div class="nav-item-content">
                                <div class="nav-item-title">${item.title}</div>
                                <div class="nav-item-description">${item.description}</div>
                            </div>
                        </a>
                    `).join('')}
                </div>
            `;
            
            // Add to page
            const mainContent = document.querySelector('.main-content') || document.querySelector('.container');
            if (mainContent) {
                mainContent.appendChild(navContainer);
            }
        }
    }

    /**
     * 🧭 Get contextual navigation
     */
    getContextualNavigation() {
        const user = window.authService?.currentUser;
        if (!user) return [];
        
        const contextualNavigation = {
            'dashboard': [
                {
                    href: 'analytics.html',
                    icon: 'fas fa-chart-line',
                    title: 'View Your Analytics',
                    description: 'Track your consciousness growth with beautiful charts'
                },
                {
                    href: 'advanced-analytics.html',
                    icon: 'fas fa-chart-bar',
                    title: 'Advanced Analytics',
                    description: 'Deep dive into your consciousness data'
                }
            ],
            'analytics': [
                {
                    href: 'advanced-analytics.html',
                    icon: 'fas fa-chart-bar',
                    title: 'Advanced Analytics',
                    description: '6 real-time visualizations of your journey'
                },
                {
                    href: 'dashboard.html',
                    icon: 'fas fa-robot',
                    title: 'Chat with AI Agents',
                    description: 'Continue your consciousness conversations'
                }
            ],
            'index': [
                {
                    href: 'login.html',
                    icon: 'fas fa-sign-in-alt',
                    title: 'Join the Revolution',
                    description: 'Create your consciousness account'
                },
                {
                    href: 'dashboard.html',
                    icon: 'fas fa-rocket',
                    title: 'Launch Dashboard',
                    description: 'Start your consciousness journey'
                }
            ]
        };
        
        return contextualNavigation[this.currentPage] || [];
    }
}

// Global navigation flow instance
window.navigationFlow = new NavigationFlow();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.navigationFlow.initialize();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationFlow;
}
