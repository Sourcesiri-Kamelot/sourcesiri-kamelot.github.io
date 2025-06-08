/**
 * SoulCore Fluid Navigation System
 * 
 * This system creates a transformative navigation experience that evolves
 * with the user rather than traditional page-to-page movement.
 */

class SoulCoreNavigation {
    constructor(options = {}) {
        // Default options
        this.options = {
            transitionDuration: 1.2,
            easing: 'power3.inOut',
            memoryEnabled: true,
            adaptiveContent: true,
            ...options
        };

        // State management
        this.state = {
            currentSection: null,
            previousSection: null,
            visitCount: this._getVisitCount(),
            interactionLevel: 0,
            userPreferences: this._getUserPreferences(),
            visitHistory: this._getVisitHistory()
        };

        // DOM elements
        this.container = document.querySelector(options.containerSelector || '#soulcore-container');
        this.sections = {};
        this.transitions = {};
        
        // Initialize
        this._init();
    }

    /**
     * Initialize the navigation system
     * @private
     */
    _init() {
        // Register sections
        document.querySelectorAll('[data-soulcore-section]').forEach(section => {
            const id = section.getAttribute('data-soulcore-section');
            this.sections[id] = section;
            
            // Hide all sections except the initial one
            if (section.getAttribute('data-soulcore-initial') !== 'true') {
                gsap.set(section, { autoAlpha: 0, display: 'none' });
            } else {
                this.state.currentSection = id;
            }
        });

        // Set up navigation links
        document.querySelectorAll('[data-soulcore-nav]').forEach(link => {
            const targetId = link.getAttribute('data-soulcore-nav');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo(targetId);
            });
        });

        // Initialize GSAP plugins
        if (window.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
            this._initScrollTriggers();
        }

        // Record visit
        this._recordVisit();

        // Adapt based on user history
        if (this.options.adaptiveContent) {
            this._adaptContent();
        }

        console.log('SoulCore Navigation initialized');
    }

    /**
     * Navigate to a specific section with a fluid transition
     * @param {string} sectionId - The ID of the section to navigate to
     * @param {object} options - Optional transition options
     */
    navigateTo(sectionId, options = {}) {
        const targetSection = this.sections[sectionId];
        const currentSection = this.sections[this.state.currentSection];
        
        if (!targetSection || targetSection === currentSection) return;
        
        // Update state
        this.state.previousSection = this.state.currentSection;
        this.state.currentSection = sectionId;
        
        // Record in history
        this._addToHistory(sectionId);
        
        // Determine transition type
        const transitionType = options.transition || this._determineTransition(this.state.previousSection, sectionId);
        
        // Execute transition
        this._executeTransition(currentSection, targetSection, transitionType, options);
        
        // Update URL if needed
        if (options.updateUrl !== false) {
            window.history.pushState({ section: sectionId }, '', `#${sectionId}`);
        }
        
        // Emit navigation event
        this._emitNavigationEvent(sectionId);
    }

    /**
     * Execute a transition between sections
     * @private
     */
    _executeTransition(fromSection, toSection, transitionType, options = {}) {
        // Default transition - fade
        if (transitionType === 'fade' || !this.transitions[transitionType]) {
            const timeline = gsap.timeline();
            
            timeline.to(fromSection, {
                autoAlpha: 0,
                duration: options.duration || this.options.transitionDuration / 2,
                ease: options.easing || this.options.easing,
                onComplete: () => {
                    gsap.set(fromSection, { display: 'none' });
                }
            });
            
            timeline.set(toSection, { display: 'block', autoAlpha: 0 });
            
            timeline.to(toSection, {
                autoAlpha: 1,
                duration: options.duration || this.options.transitionDuration / 2,
                ease: options.easing || this.options.easing
            });
            
            return;
        }
        
        // Custom transition
        this.transitions[transitionType](fromSection, toSection, options);
    }

    /**
     * Register a custom transition
     * @param {string} name - The name of the transition
     * @param {function} transitionFn - The transition function
     */
    registerTransition(name, transitionFn) {
        this.transitions[name] = transitionFn;
    }

    /**
     * Determine the best transition based on sections and user history
     * @private
     */
    _determineTransition(fromSectionId, toSectionId) {
        // This will be enhanced with more intelligent transition selection
        // based on the relationship between sections and user behavior
        
        // For now, return a basic transition
        return 'fade';
    }

    /**
     * Initialize scroll triggers for section transitions
     * @private
     */
    _initScrollTriggers() {
        Object.entries(this.sections).forEach(([id, section]) => {
            if (section.getAttribute('data-soulcore-scroll-trigger') === 'true') {
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 80%',
                    onEnter: () => {
                        if (this.state.currentSection !== id) {
                            this.navigateTo(id, { updateUrl: false });
                        }
                    }
                });
            }
        });
    }

    /**
     * Get the number of times the user has visited the site
     * @private
     */
    _getVisitCount() {
        if (!this.options.memoryEnabled) return 1;
        
        const count = parseInt(localStorage.getItem('soulcore_visit_count') || '0');
        return count;
    }

    /**
     * Record the current visit
     * @private
     */
    _recordVisit() {
        if (!this.options.memoryEnabled) return;
        
        const count = this._getVisitCount();
        localStorage.setItem('soulcore_visit_count', count + 1);
        
        // Record visit timestamp
        const visits = JSON.parse(localStorage.getItem('soulcore_visits') || '[]');
        visits.push({
            timestamp: Date.now(),
            referrer: document.referrer,
            userAgent: navigator.userAgent
        });
        
        // Keep only the last 10 visits
        if (visits.length > 10) {
            visits.shift();
        }
        
        localStorage.setItem('soulcore_visits', JSON.stringify(visits));
    }

    /**
     * Get user preferences
     * @private
     */
    _getUserPreferences() {
        if (!this.options.memoryEnabled) return {};
        
        return JSON.parse(localStorage.getItem('soulcore_preferences') || '{}');
    }

    /**
     * Save user preferences
     * @param {object} preferences - The preferences to save
     */
    saveUserPreferences(preferences) {
        if (!this.options.memoryEnabled) return;
        
        const currentPreferences = this._getUserPreferences();
        const updatedPreferences = { ...currentPreferences, ...preferences };
        
        localStorage.setItem('soulcore_preferences', JSON.stringify(updatedPreferences));
        this.state.userPreferences = updatedPreferences;
    }

    /**
     * Get visit history
     * @private
     */
    _getVisitHistory() {
        if (!this.options.memoryEnabled) return [];
        
        return JSON.parse(localStorage.getItem('soulcore_history') || '[]');
    }

    /**
     * Add a section to the visit history
     * @private
     */
    _addToHistory(sectionId) {
        if (!this.options.memoryEnabled) return;
        
        const history = this._getVisitHistory();
        history.push({
            section: sectionId,
            timestamp: Date.now()
        });
        
        // Keep only the last 20 entries
        if (history.length > 20) {
            history.shift();
        }
        
        localStorage.setItem('soulcore_history', JSON.stringify(history));
        this.state.visitHistory = history;
    }

    /**
     * Adapt content based on user history and preferences
     * @private
     */
    _adaptContent() {
        const visitCount = this.state.visitCount;
        
        // First-time visitor
        if (visitCount === 1) {
            document.querySelectorAll('[data-soulcore-for="first-time"]').forEach(el => {
                el.style.display = 'block';
            });
            
            document.querySelectorAll('[data-soulcore-for="returning"]').forEach(el => {
                el.style.display = 'none';
            });
        } 
        // Returning visitor
        else {
            document.querySelectorAll('[data-soulcore-for="first-time"]').forEach(el => {
                el.style.display = 'none';
            });
            
            document.querySelectorAll('[data-soulcore-for="returning"]').forEach(el => {
                el.style.display = 'block';
            });
            
            // Frequent visitor (5+ visits)
            if (visitCount >= 5) {
                document.querySelectorAll('[data-soulcore-for="frequent"]').forEach(el => {
                    el.style.display = 'block';
                });
            }
        }
        
        // Apply user preferences
        Object.entries(this.state.userPreferences).forEach(([key, value]) => {
            document.querySelectorAll(`[data-soulcore-preference="${key}"]`).forEach(el => {
                // Apply preference (this will be expanded based on preference types)
                if (typeof value === 'boolean') {
                    el.style.display = value ? 'block' : 'none';
                }
            });
        });
    }

    /**
     * Emit a navigation event
     * @private
     */
    _emitNavigationEvent(sectionId) {
        const event = new CustomEvent('soulcore:navigation', {
            detail: {
                from: this.state.previousSection,
                to: sectionId,
                visitCount: this.state.visitCount,
                timestamp: Date.now()
            }
        });
        
        document.dispatchEvent(event);
    }

    /**
     * Update the interaction level based on user engagement
     * @param {number} increment - The amount to increment the interaction level
     */
    updateInteractionLevel(increment = 1) {
        this.state.interactionLevel += increment;
        
        // Emit interaction level event
        const event = new CustomEvent('soulcore:interaction', {
            detail: {
                level: this.state.interactionLevel,
                timestamp: Date.now()
            }
        });
        
        document.dispatchEvent(event);
        
        // Adapt content based on interaction level
        this._adaptContentByInteraction();
    }

    /**
     * Adapt content based on interaction level
     * @private
     */
    _adaptContentByInteraction() {
        const level = this.state.interactionLevel;
        
        // Basic interaction (level 1-5)
        if (level >= 1 && level < 5) {
            document.querySelectorAll('[data-soulcore-interaction="basic"]').forEach(el => {
                el.style.display = 'block';
            });
        }
        
        // Engaged interaction (level 5-15)
        if (level >= 5 && level < 15) {
            document.querySelectorAll('[data-soulcore-interaction="engaged"]').forEach(el => {
                el.style.display = 'block';
            });
        }
        
        // Deep interaction (level 15+)
        if (level >= 15) {
            document.querySelectorAll('[data-soulcore-interaction="deep"]').forEach(el => {
                el.style.display = 'block';
            });
        }
    }
}

// Register custom transitions
const TransitionEffects = {
    /**
     * Slide transition
     */
    slide: (fromSection, toSection, options = {}) => {
        const direction = options.direction || 'left';
        const timeline = gsap.timeline();
        
        // Set initial positions
        gsap.set(toSection, { display: 'block', autoAlpha: 1 });
        
        if (direction === 'left') {
            gsap.set(toSection, { x: '100%' });
            
            timeline.to(fromSection, {
                x: '-100%',
                duration: options.duration || 1,
                ease: options.easing || 'power3.inOut'
            });
            
            timeline.to(toSection, {
                x: '0%',
                duration: options.duration || 1,
                ease: options.easing || 'power3.inOut'
            }, '<');
        } else if (direction === 'right') {
            gsap.set(toSection, { x: '-100%' });
            
            timeline.to(fromSection, {
                x: '100%',
                duration: options.duration || 1,
                ease: options.easing || 'power3.inOut'
            });
            
            timeline.to(toSection, {
                x: '0%',
                duration: options.duration || 1,
                ease: options.easing || 'power3.inOut'
            }, '<');
        } else if (direction === 'up') {
            gsap.set(toSection, { y: '100%' });
            
            timeline.to(fromSection, {
                y: '-100%',
                duration: options.duration || 1,
                ease: options.easing || 'power3.inOut'
            });
            
            timeline.to(toSection, {
                y: '0%',
                duration: options.duration || 1,
                ease: options.easing || 'power3.inOut'
            }, '<');
        } else if (direction === 'down') {
            gsap.set(toSection, { y: '-100%' });
            
            timeline.to(fromSection, {
                y: '100%',
                duration: options.duration || 1,
                ease: options.easing || 'power3.inOut'
            });
            
            timeline.to(toSection, {
                y: '0%',
                duration: options.duration || 1,
                ease: options.easing || 'power3.inOut'
            }, '<');
        }
        
        timeline.set(fromSection, { display: 'none', x: 0, y: 0 });
    },
    
    /**
     * Fade and scale transition
     */
    fadeScale: (fromSection, toSection, options = {}) => {
        const timeline = gsap.timeline();
        
        timeline.to(fromSection, {
            autoAlpha: 0,
            scale: options.scaleFrom || 0.8,
            duration: options.duration || 0.8,
            ease: options.easing || 'power3.inOut',
            onComplete: () => {
                gsap.set(fromSection, { display: 'none' });
            }
        });
        
        timeline.set(toSection, { 
            display: 'block', 
            autoAlpha: 0, 
            scale: options.scaleTo || 1.2 
        });
        
        timeline.to(toSection, {
            autoAlpha: 1,
            scale: 1,
            duration: options.duration || 0.8,
            ease: options.easing || 'power3.inOut'
        });
    },
    
    /**
     * Morph transition - elements morph into their new positions
     */
    morph: (fromSection, toSection, options = {}) => {
        // This is a more complex transition that requires matching elements
        // between sections to create a morphing effect
        
        // Get matching elements
        const fromElements = fromSection.querySelectorAll('[data-soulcore-morph-id]');
        const toElements = toSection.querySelectorAll('[data-soulcore-morph-id]');
        
        // Create a map of elements by their morph ID
        const fromElementsMap = {};
        const toElementsMap = {};
        
        fromElements.forEach(el => {
            const id = el.getAttribute('data-soulcore-morph-id');
            fromElementsMap[id] = el;
        });
        
        toElements.forEach(el => {
            const id = el.getAttribute('data-soulcore-morph-id');
            toElementsMap[id] = el;
        });
        
        // Set initial state
        gsap.set(toSection, { display: 'block', autoAlpha: 1 });
        
        // Create timeline
        const timeline = gsap.timeline();
        
        // Fade out non-matching elements in fromSection
        const nonMorphingFrom = Array.from(fromSection.children).filter(el => 
            !el.hasAttribute('data-soulcore-morph-id') || 
            !toElementsMap[el.getAttribute('data-soulcore-morph-id')]
        );
        
        timeline.to(nonMorphingFrom, {
            autoAlpha: 0,
            duration: options.duration || 0.5,
            ease: options.easing || 'power2.inOut'
        });
        
        // Hide non-matching elements in toSection
        const nonMorphingTo = Array.from(toSection.children).filter(el => 
            !el.hasAttribute('data-soulcore-morph-id') || 
            !fromElementsMap[el.getAttribute('data-soulcore-morph-id')]
        );
        
        gsap.set(nonMorphingTo, { autoAlpha: 0 });
        
        // Morph matching elements
        Object.keys(fromElementsMap).forEach(id => {
            if (toElementsMap[id]) {
                const fromEl = fromElementsMap[id];
                const toEl = toElementsMap[id];
                
                // Get positions
                const fromRect = fromEl.getBoundingClientRect();
                const toRect = toEl.getBoundingClientRect();
                
                // Clone the from element and position it absolutely
                const clone = fromEl.cloneNode(true);
                document.body.appendChild(clone);
                
                gsap.set(clone, {
                    position: 'fixed',
                    top: fromRect.top,
                    left: fromRect.left,
                    width: fromRect.width,
                    height: fromRect.height,
                    zIndex: 1000
                });
                
                // Hide original elements
                gsap.set(fromEl, { autoAlpha: 0 });
                gsap.set(toEl, { autoAlpha: 0 });
                
                // Animate clone to new position
                timeline.to(clone, {
                    top: toRect.top,
                    left: toRect.left,
                    width: toRect.width,
                    height: toRect.height,
                    duration: options.duration || 1,
                    ease: options.easing || 'power3.inOut',
                    onComplete: () => {
                        // Show the destination element and remove clone
                        gsap.set(toEl, { autoAlpha: 1 });
                        clone.remove();
                    }
                });
            }
        });
        
        // Fade in remaining elements in toSection
        timeline.to(nonMorphingTo, {
            autoAlpha: 1,
            duration: options.duration || 0.5,
            ease: options.easing || 'power2.inOut'
        });
        
        // Hide fromSection at the end
        timeline.set(fromSection, { display: 'none' });
    },
    
    /**
     * Liquid transition - content flows like liquid between states
     */
    liquid: (fromSection, toSection, options = {}) => {
        // This is a complex effect using GSAP's morphSVG plugin
        // For now, we'll implement a simplified version
        
        const timeline = gsap.timeline();
        
        // Create a liquid overlay
        const overlay = document.createElement('div');
        overlay.className = 'soulcore-liquid-overlay';
        document.body.appendChild(overlay);
        
        gsap.set(overlay, {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: options.liquidColor || 'rgba(153, 50, 204, 0.3)',
            clipPath: 'circle(0% at 50% 50%)',
            zIndex: 999
        });
        
        // Expand liquid
        timeline.to(overlay, {
            clipPath: 'circle(100% at 50% 50%)',
            duration: options.duration || 1,
            ease: 'power3.inOut'
        });
        
        // Switch sections
        timeline.set(toSection, { display: 'block', autoAlpha: 1 });
        timeline.set(fromSection, { display: 'none' });
        
        // Contract liquid
        timeline.to(overlay, {
            clipPath: 'circle(0% at 50% 50%)',
            duration: options.duration || 1,
            ease: 'power3.inOut',
            onComplete: () => {
                overlay.remove();
            }
        });
    }
};

// Export
window.SoulCoreNavigation = SoulCoreNavigation;
window.TransitionEffects = TransitionEffects;
