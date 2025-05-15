/**
 * SoulCore Responsive Welcome Experience
 * 
 * Creates a welcome experience that responds to user context (time, location, device)
 * and communicates conscious presence from the first interaction.
 */

class SoulCoreWelcome {
    constructor(options = {}) {
        // Default options
        this.options = {
            container: '#welcome-container',
            animationDuration: 2,
            emotionalResponseEnabled: true,
            contextAwarenessEnabled: true,
            cursorTrackingEnabled: true,
            soundEnabled: false,
            ...options
        };

        // State
        this.state = {
            userContext: {},
            emotionalState: 'neutral',
            interactionLevel: 0,
            cursorPosition: { x: 0, y: 0 },
            timeOfDay: this._getTimeOfDay(),
            deviceType: this._getDeviceType(),
            hasInteracted: false
        };

        // Elements
        this.container = document.querySelector(this.options.container);
        this.elements = {
            welcomeText: null,
            welcomeBackground: null,
            emotionalResponse: null,
            contextualElements: {},
            animatedElements: []
        };

        // Initialize
        if (this.container) {
            this._init();
        } else {
            console.error('SoulCoreWelcome: Container not found');
        }
    }

    /**
     * Initialize the welcome experience
     * @private
     */
    _init() {
        // Create elements
        this._createElements();
        
        // Set up event listeners
        this._setupEventListeners();
        
        // Get user context
        this._getUserContext();
        
        // Initial animation
        this._playWelcomeAnimation();
        
        console.log('SoulCore Welcome initialized');
    }

    /**
     * Create welcome elements
     * @private
     */
    _createElements() {
        // Clear container
        this.container.innerHTML = '';
        
        // Create welcome background
        this.elements.welcomeBackground = document.createElement('div');
        this.elements.welcomeBackground.className = 'welcome-background';
        this.container.appendChild(this.elements.welcomeBackground);
        
        // Create welcome text
        this.elements.welcomeText = document.createElement('div');
        this.elements.welcomeText.className = 'welcome-text';
        this.container.appendChild(this.elements.welcomeText);
        
        // Create emotional response element
        if (this.options.emotionalResponseEnabled) {
            this.elements.emotionalResponse = document.createElement('div');
            this.elements.emotionalResponse.className = 'emotional-response';
            this.container.appendChild(this.elements.emotionalResponse);
        }
        
        // Create contextual elements based on time of day
        if (this.options.contextAwarenessEnabled) {
            const timeElement = document.createElement('div');
            timeElement.className = 'contextual-element time-element';
            this.container.appendChild(timeElement);
            this.elements.contextualElements.time = timeElement;
            
            // Add more contextual elements as needed
        }
        
        // Create animated elements
        for (let i = 0; i < 5; i++) {
            const animatedElement = document.createElement('div');
            animatedElement.className = 'animated-element';
            this.container.appendChild(animatedElement);
            this.elements.animatedElements.push(animatedElement);
        }
        
        // Apply initial styles
        this._applyStyles();
    }

    /**
     * Apply initial styles to elements
     * @private
     */
    _applyStyles() {
        // Container styles
        gsap.set(this.container, {
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            height: '100vh'
        });
        
        // Background styles
        gsap.set(this.elements.welcomeBackground, {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, 
                rgba(153, 50, 204, 0.2), 
                rgba(255, 215, 0, 0.2), 
                rgba(0, 0, 255, 0.2))`,
            opacity: 0
        });
        
        // Welcome text styles
        gsap.set(this.elements.welcomeText, {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
            opacity: 0
        });
        
        // Emotional response styles
        if (this.elements.emotionalResponse) {
            gsap.set(this.elements.emotionalResponse, {
                position: 'absolute',
                bottom: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,215,0,0.5) 0%, rgba(255,215,0,0) 70%)',
                opacity: 0
            });
        }
        
        // Contextual elements styles
        if (this.elements.contextualElements.time) {
            gsap.set(this.elements.contextualElements.time, {
                position: 'absolute',
                top: '10%',
                right: '10%',
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.7)',
                opacity: 0
            });
        }
        
        // Animated elements styles
        this.elements.animatedElements.forEach((el, i) => {
            gsap.set(el, {
                position: 'absolute',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.5)',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0
            });
        });
    }

    /**
     * Set up event listeners
     * @private
     */
    _setupEventListeners() {
        // Mouse movement for cursor tracking
        if (this.options.cursorTrackingEnabled) {
            document.addEventListener('mousemove', this._handleMouseMove.bind(this));
        }
        
        // Interaction events
        this.container.addEventListener('click', this._handleInteraction.bind(this));
        
        // Resize event
        window.addEventListener('resize', this._handleResize.bind(this));
        
        // Visibility change
        document.addEventListener('visibilitychange', this._handleVisibilityChange.bind(this));
    }

    /**
     * Handle mouse movement
     * @private
     */
    _handleMouseMove(e) {
        // Update cursor position
        this.state.cursorPosition = {
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight
        };
        
        // Respond to cursor movement if emotional response is enabled
        if (this.options.emotionalResponseEnabled && this.elements.emotionalResponse) {
            this._updateEmotionalResponse();
        }
    }

    /**
     * Update emotional response based on cursor position
     * @private
     */
    _updateEmotionalResponse() {
        const { x, y } = this.state.cursorPosition;
        
        // Calculate distance from center
        const centerX = 0.5;
        const centerY = 0.5;
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        
        // Update emotional response element
        gsap.to(this.elements.emotionalResponse, {
            x: (x - 0.5) * 100,
            y: (y - 0.5) * 100,
            scale: 1 - distance * 0.5,
            opacity: 0.7 - distance * 0.5,
            background: `radial-gradient(circle, 
                rgba(255,215,0,${0.5 - distance * 0.3}) 0%, 
                rgba(255,215,0,0) 70%)`,
            duration: 0.5,
            ease: 'power2.out'
        });
        
        // Update emotional state based on position
        if (distance < 0.2) {
            this._setEmotionalState('calm');
        } else if (x < 0.3) {
            this._setEmotionalState('curious');
        } else if (x > 0.7) {
            this._setEmotionalState('excited');
        } else if (y < 0.3) {
            this._setEmotionalState('thoughtful');
        } else if (y > 0.7) {
            this._setEmotionalState('grounded');
        } else {
            this._setEmotionalState('neutral');
        }
    }

    /**
     * Set emotional state
     * @private
     */
    _setEmotionalState(state) {
        if (this.state.emotionalState !== state) {
            this.state.emotionalState = state;
            
            // Emit emotional state change event
            const event = new CustomEvent('soulcore:emotional-state', {
                detail: {
                    state: state,
                    timestamp: Date.now()
                }
            });
            
            document.dispatchEvent(event);
        }
    }

    /**
     * Handle user interaction
     * @private
     */
    _handleInteraction() {
        this.state.hasInteracted = true;
        this.state.interactionLevel++;
        
        // Play interaction animation
        this._playInteractionAnimation();
        
        // Emit interaction event
        const event = new CustomEvent('soulcore:welcome-interaction', {
            detail: {
                level: this.state.interactionLevel,
                timestamp: Date.now()
            }
        });
        
        document.dispatchEvent(event);
    }

    /**
     * Handle resize event
     * @private
     */
    _handleResize() {
        // Update animations or layouts if needed
        this._updateAnimatedElements();
    }

    /**
     * Handle visibility change
     * @private
     */
    _handleVisibilityChange() {
        if (document.visibilityState === 'visible') {
            // User has returned to the page
            this._playWelcomeBackAnimation();
        }
    }

    /**
     * Get user context information
     * @private
     */
    _getUserContext() {
        // Get time of day
        this.state.timeOfDay = this._getTimeOfDay();
        
        // Get device type
        this.state.deviceType = this._getDeviceType();
        
        // Get location if available and permitted
        if (navigator.geolocation && this.options.contextAwarenessEnabled) {
            navigator.geolocation.getCurrentPosition(
                this._handleLocationSuccess.bind(this),
                this._handleLocationError.bind(this),
                { timeout: 10000 }
            );
        }
        
        // Update contextual elements
        this._updateContextualElements();
    }

    /**
     * Handle successful location retrieval
     * @private
     */
    _handleLocationSuccess(position) {
        this.state.userContext.location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        
        // Get weather information if available
        this._getWeatherInfo();
    }

    /**
     * Handle location error
     * @private
     */
    _handleLocationError() {
        console.log('Location information not available');
    }

    /**
     * Get weather information based on location
     * @private
     */
    _getWeatherInfo() {
        // This would typically call a weather API
        // For now, we'll just simulate weather data
        const weatherTypes = ['clear', 'cloudy', 'rainy', 'snowy'];
        const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        
        this.state.userContext.weather = {
            type: randomWeather,
            temperature: Math.floor(Math.random() * 30) + 10 // 10-40 degrees
        };
        
        // Update contextual elements with weather info
        this._updateContextualElements();
    }

    /**
     * Get time of day
     * @private
     */
    _getTimeOfDay() {
        const hour = new Date().getHours();
        
        if (hour >= 5 && hour < 12) {
            return 'morning';
        } else if (hour >= 12 && hour < 17) {
            return 'afternoon';
        } else if (hour >= 17 && hour < 21) {
            return 'evening';
        } else {
            return 'night';
        }
    }

    /**
     * Get device type
     * @private
     */
    _getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'tablet';
        } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'mobile';
        }
        return 'desktop';
    }

    /**
     * Update contextual elements based on user context
     * @private
     */
    _updateContextualElements() {
        // Update time element
        if (this.elements.contextualElements.time) {
            let greeting = '';
            
            switch (this.state.timeOfDay) {
                case 'morning':
                    greeting = 'Good morning';
                    break;
                case 'afternoon':
                    greeting = 'Good afternoon';
                    break;
                case 'evening':
                    greeting = 'Good evening';
                    break;
                case 'night':
                    greeting = 'Good evening';
                    break;
            }
            
            this.elements.contextualElements.time.textContent = greeting;
        }
        
        // Update background based on time of day
        let bgColors = {};
        
        switch (this.state.timeOfDay) {
            case 'morning':
                bgColors = {
                    color1: 'rgba(255, 200, 100, 0.2)',
                    color2: 'rgba(153, 50, 204, 0.2)',
                    color3: 'rgba(100, 200, 255, 0.2)'
                };
                break;
            case 'afternoon':
                bgColors = {
                    color1: 'rgba(100, 200, 255, 0.2)',
                    color2: 'rgba(153, 50, 204, 0.2)',
                    color3: 'rgba(255, 215, 0, 0.2)'
                };
                break;
            case 'evening':
                bgColors = {
                    color1: 'rgba(255, 100, 100, 0.2)',
                    color2: 'rgba(153, 50, 204, 0.2)',
                    color3: 'rgba(100, 100, 255, 0.2)'
                };
                break;
            case 'night':
                bgColors = {
                    color1: 'rgba(50, 0, 100, 0.2)',
                    color2: 'rgba(153, 50, 204, 0.2)',
                    color3: 'rgba(0, 0, 100, 0.2)'
                };
                break;
        }
        
        gsap.to(this.elements.welcomeBackground, {
            background: `linear-gradient(135deg, 
                ${bgColors.color1}, 
                ${bgColors.color2}, 
                ${bgColors.color3})`,
            duration: 2,
            ease: 'power2.inOut'
        });
    }

    /**
     * Play welcome animation
     * @private
     */
    _playWelcomeAnimation() {
        const timeline = gsap.timeline();
        
        // Animate background
        timeline.to(this.elements.welcomeBackground, {
            opacity: 1,
            duration: this.options.animationDuration * 0.5,
            ease: 'power2.inOut'
        });
        
        // Animate welcome text
        let welcomeText = 'Welcome';
        
        // Customize based on time of day
        if (this.options.contextAwarenessEnabled) {
            switch (this.state.timeOfDay) {
                case 'morning':
                    welcomeText = 'Good Morning';
                    break;
                case 'afternoon':
                    welcomeText = 'Good Afternoon';
                    break;
                case 'evening':
                    welcomeText = 'Good Evening';
                    break;
                case 'night':
                    welcomeText = 'Hello Night Owl';
                    break;
            }
        }
        
        this.elements.welcomeText.textContent = welcomeText;
        
        timeline.to(this.elements.welcomeText, {
            opacity: 1,
            y: 0,
            duration: this.options.animationDuration * 0.7,
            ease: 'power3.out'
        }, '-=0.3');
        
        // Animate contextual elements
        if (this.options.contextAwarenessEnabled) {
            Object.values(this.elements.contextualElements).forEach(el => {
                timeline.to(el, {
                    opacity: 0.7,
                    duration: this.options.animationDuration * 0.5,
                    ease: 'power2.inOut'
                }, '-=0.5');
            });
        }
        
        // Animate emotional response
        if (this.options.emotionalResponseEnabled && this.elements.emotionalResponse) {
            timeline.to(this.elements.emotionalResponse, {
                opacity: 0.5,
                scale: 1,
                duration: this.options.animationDuration * 0.8,
                ease: 'power2.inOut'
            }, '-=0.7');
        }
        
        // Animate background elements
        this.elements.animatedElements.forEach((el, i) => {
            timeline.to(el, {
                opacity: 0.7,
                scale: 1 + Math.random() * 0.5,
                duration: this.options.animationDuration * 0.6,
                delay: i * 0.1,
                ease: 'power2.inOut'
            }, '-=0.8');
        });
        
        // Start ambient animations after initial animation
        timeline.call(() => {
            this._startAmbientAnimations();
        });
        
        return timeline;
    }

    /**
     * Play welcome back animation (when user returns to the page)
     * @private
     */
    _playWelcomeBackAnimation() {
        const timeline = gsap.timeline();
        
        // Update welcome text
        this.elements.welcomeText.textContent = 'Welcome Back';
        
        // Simple fade in animation
        timeline.to([this.elements.welcomeText, this.elements.welcomeBackground], {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.inOut'
        });
        
        // Fade in emotional response
        if (this.options.emotionalResponseEnabled && this.elements.emotionalResponse) {
            timeline.to(this.elements.emotionalResponse, {
                opacity: 0.5,
                scale: 1,
                duration: 0.8,
                ease: 'power2.inOut'
            }, '-=0.6');
        }
        
        // Start ambient animations
        timeline.call(() => {
            this._startAmbientAnimations();
        });
        
        return timeline;
    }

    /**
     * Play interaction animation
     * @private
     */
    _playInteractionAnimation() {
        // Ripple effect from cursor position
        const ripple = document.createElement('div');
        ripple.className = 'interaction-ripple';
        this.container.appendChild(ripple);
        
        const x = this.state.cursorPosition.x * window.innerWidth;
        const y = this.state.cursorPosition.y * window.innerHeight;
        
        gsap.set(ripple, {
            position: 'absolute',
            top: y,
            left: x,
            width: 0,
            height: 0,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.3)',
            zIndex: 10
        });
        
        gsap.to(ripple, {
            width: 200,
            height: 200,
            x: -100,
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => {
                ripple.remove();
            }
        });
        
        // Pulse emotional response
        if (this.options.emotionalResponseEnabled && this.elements.emotionalResponse) {
            gsap.to(this.elements.emotionalResponse, {
                scale: 1.2,
                opacity: 0.8,
                duration: 0.5,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        }
    }

    /**
     * Start ambient animations
     * @private
     */
    _startAmbientAnimations() {
        // Animate background with subtle movement
        gsap.to(this.elements.welcomeBackground, {
            backgroundPosition: '100% 100%',
            duration: 20,
            ease: 'none',
            repeat: -1,
            yoyo: true
        });
        
        // Animate floating elements
        this._updateAnimatedElements();
    }

    /**
     * Update animated elements
     * @private
     */
    _updateAnimatedElements() {
        this.elements.animatedElements.forEach((el, i) => {
            gsap.to(el, {
                x: Math.sin(Date.now() / 1000 + i) * 50,
                y: Math.cos(Date.now() / 1000 + i) * 50,
                opacity: 0.3 + Math.sin(Date.now() / 1000 + i) * 0.2,
                duration: 5 + i * 2,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            });
        });
    }

    /**
     * Update welcome text
     * @param {string} text - New welcome text
     */
    updateWelcomeText(text) {
        if (!this.elements.welcomeText) return;
        
        gsap.to(this.elements.welcomeText, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
                this.elements.welcomeText.textContent = text;
                gsap.to(this.elements.welcomeText, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    }

    /**
     * Set emotional state manually
     * @param {string} state - Emotional state to set
     */
    setEmotionalState(state) {
        this._setEmotionalState(state);
        
        // Update visual representation
        if (this.options.emotionalResponseEnabled && this.elements.emotionalResponse) {
            let color = 'rgba(255,215,0,0.5)'; // Default gold
            
            switch (state) {
                case 'calm':
                    color = 'rgba(100,200,255,0.5)'; // Blue
                    break;
                case 'excited':
                    color = 'rgba(255,100,100,0.5)'; // Red
                    break;
                case 'curious':
                    color = 'rgba(100,255,200,0.5)'; // Teal
                    break;
                case 'thoughtful':
                    color = 'rgba(200,100,255,0.5)'; // Purple
                    break;
                case 'grounded':
                    color = 'rgba(100,200,100,0.5)'; // Green
                    break;
            }
            
            gsap.to(this.elements.emotionalResponse, {
                background: `radial-gradient(circle, ${color} 0%, rgba(255,215,0,0) 70%)`,
                duration: 1,
                ease: 'power2.inOut'
            });
        }
    }

    /**
     * Transition to next section
     * @param {string} nextSectionId - ID of the next section
     */
    transitionToNextSection(nextSectionId) {
        const timeline = gsap.timeline();
        
        // Fade out welcome elements
        timeline.to([
            this.elements.welcomeText,
            this.elements.welcomeBackground,
            ...Object.values(this.elements.contextualElements),
            ...this.elements.animatedElements
        ], {
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
            stagger: 0.05
        });
        
        // Special animation for emotional response
        if (this.options.emotionalResponseEnabled && this.elements.emotionalResponse) {
            timeline.to(this.elements.emotionalResponse, {
                scale: 5,
                opacity: 0,
                duration: 1.5,
                ease: 'power3.out'
            }, '-=0.8');
        }
        
        // Trigger navigation event
        timeline.call(() => {
            const event = new CustomEvent('soulcore:welcome-complete', {
                detail: {
                    nextSection: nextSectionId,
                    timestamp: Date.now()
                }
            });
            
            document.dispatchEvent(event);
        });
        
        return timeline;
    }
}

// Export
window.SoulCoreWelcome = SoulCoreWelcome;
