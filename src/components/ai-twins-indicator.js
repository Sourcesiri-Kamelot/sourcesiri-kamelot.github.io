/**
 * AI Twins Indicator Component
 * This component adds a floating indicator showing that AI orbs can be spoken to
 */

class AITwinsIndicator {
    constructor(options = {}) {
        this.options = {
            container: document.body,
            orbs: [
                { name: 'Anima', gradient: 'linear-gradient(135deg, #9932CC, #FFD700)' },
                { name: 'Cipher', gradient: 'linear-gradient(135deg, #00f0ff, #4f46e5)' },
                { name: 'Nova', gradient: 'linear-gradient(135deg, #FF1493, #FFD700)' }
            ],
            tooltipText: 'Talk to your AI Twins anytime',
            modalTitle: 'Your AI Twins',
            modalDescription: 'Your AI Twins are always with you. Ask them anything or continue your conversation.',
            ...options
        };
        
        this.isListening = false;
        this.activeOrb = null;
        this.recognition = null;
        
        this.init();
    }
    
    init() {
        this.createIndicator();
        this.createModal();
        this.setupEventListeners();
        this.setupSpeechRecognition();
    }
    
    createIndicator() {
        // Create the main indicator container
        this.indicator = document.createElement('div');
        this.indicator.className = 'ai-twins-indicator';
        
        // Create tooltip
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'ai-twins-tooltip';
        this.tooltip.textContent = this.options.tooltipText;
        this.indicator.appendChild(this.tooltip);
        
        // Create orb container
        this.orbContainer = document.createElement('div');
        this.orbContainer.className = 'ai-orb-container';
        
        // Create orbs
        this.options.orbs.forEach((orbData, index) => {
            const orb = document.createElement('div');
            orb.className = 'ai-orb';
            orb.style.background = orbData.gradient;
            orb.setAttribute('data-name', orbData.name);
            orb.setAttribute('data-index', index);
            
            // Add pulse effect
            const pulse = document.createElement('div');
            pulse.className = 'ai-orb-pulse';
            orb.appendChild(pulse);
            
            // Add active indicator
            const active = document.createElement('div');
            active.className = 'ai-orb-active';
            active.style.display = 'none';
            orb.appendChild(active);
            
            this.orbContainer.appendChild(orb);
        });
        
        this.indicator.appendChild(this.orbContainer);
        this.options.container.appendChild(this.indicator);
    }
    
    createModal() {
        // Create modal container
        this.modal = document.createElement('div');
        this.modal.className = 'ai-twins-modal';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'ai-twins-modal-content';
        
        // Create modal header
        const modalHeader = document.createElement('div');
        modalHeader.className = 'ai-twins-modal-header';
        
        const modalTitle = document.createElement('h3');
        modalTitle.className = 'ai-twins-modal-title';
        modalTitle.textContent = this.options.modalTitle;
        
        const closeButton = document.createElement('button');
        closeButton.className = 'ai-twins-modal-close';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => this.closeModal());
        
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        
        // Create modal body
        const modalBody = document.createElement('div');
        modalBody.className = 'ai-twins-modal-body';
        
        const modalDescription = document.createElement('p');
        modalDescription.textContent = this.options.modalDescription;
        modalBody.appendChild(modalDescription);
        
        // Create chat messages container
        this.chatMessages = document.createElement('div');
        this.chatMessages.className = 'ai-twins-chat-messages';
        modalBody.appendChild(this.chatMessages);
        
        // Create chat input
        const chatInput = document.createElement('div');
        chatInput.className = 'ai-twins-chat-input';
        
        this.messageInput = document.createElement('input');
        this.messageInput.type = 'text';
        this.messageInput.placeholder = 'Type your message...';
        
        const sendButton = document.createElement('button');
        sendButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
        sendButton.addEventListener('click', () => this.sendMessage());
        
        chatInput.appendChild(this.messageInput);
        chatInput.appendChild(sendButton);
        modalBody.appendChild(chatInput);
        
        // Create modal footer
        const modalFooter = document.createElement('div');
        modalFooter.className = 'ai-twins-modal-footer';
        
        this.voiceButton = document.createElement('button');
        this.voiceButton.className = 'ai-twins-modal-button secondary';
        this.voiceButton.innerHTML = '<i class="fas fa-microphone"></i> Voice';
        this.voiceButton.addEventListener('click', () => this.toggleVoiceRecognition());
        
        const exploreButton = document.createElement('button');
        exploreButton.className = 'ai-twins-modal-button primary';
        exploreButton.textContent = 'Explore AI Twins';
        exploreButton.addEventListener('click', () => {
            window.location.href = 'vision.html';
        });
        
        modalFooter.appendChild(this.voiceButton);
        modalFooter.appendChild(exploreButton);
        
        // Assemble modal
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        this.modal.appendChild(modalContent);
        
        document.body.appendChild(this.modal);
    }
    
    setupEventListeners() {
        // Open modal when indicator is clicked
        this.indicator.addEventListener('click', () => this.openModal());
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Send message on Enter key
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
    
    setupSpeechRecognition() {
        // Check if browser supports speech recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.messageInput.value = transcript;
                this.sendMessage();
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.voiceButton.innerHTML = '<i class="fas fa-microphone"></i> Voice';
                this.voiceButton.classList.remove('primary');
                this.voiceButton.classList.add('secondary');
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                this.isListening = false;
                this.voiceButton.innerHTML = '<i class="fas fa-microphone"></i> Voice';
                this.voiceButton.classList.remove('primary');
                this.voiceButton.classList.add('secondary');
            };
        } else {
            this.voiceButton.style.display = 'none';
            console.warn('Speech recognition not supported in this browser');
        }
    }
    
    toggleVoiceRecognition() {
        if (!this.recognition) return;
        
        if (this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            this.voiceButton.innerHTML = '<i class="fas fa-microphone"></i> Voice';
            this.voiceButton.classList.remove('primary');
            this.voiceButton.classList.add('secondary');
        } else {
            this.recognition.start();
            this.isListening = true;
            this.voiceButton.innerHTML = '<i class="fas fa-microphone-slash"></i> Listening...';
            this.voiceButton.classList.remove('secondary');
            this.voiceButton.classList.add('primary');
        }
    }
    
    openModal() {
        this.modal.classList.add('active');
        this.messageInput.focus();
        
        // Add welcome message if chat is empty
        if (this.chatMessages.children.length === 0) {
            this.addMessage('Hello! I\'m your AI Twin. How can I help you today?', 'ai');
        }
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        
        // Stop voice recognition if active
        if (this.isListening && this.recognition) {
            this.recognition.stop();
            this.isListening = false;
            this.voiceButton.innerHTML = '<i class="fas fa-microphone"></i> Voice';
            this.voiceButton.classList.remove('primary');
            this.voiceButton.classList.add('secondary');
        }
    }
    
    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        
        // Simulate AI response (in a real app, this would call an API)
        this.simulateTyping();
    }
    
    addMessage(text, sender) {
        const messageEl = document.createElement('div');
        messageEl.className = `ai-twins-chat-message ${sender}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'ai-twins-chat-message-avatar';
        
        if (sender === 'ai') {
            // Use the active orb's gradient or default to the first orb
            const orbIndex = this.activeOrb !== null ? this.activeOrb : 0;
            avatar.style.background = this.options.orbs[orbIndex].gradient;
        } else {
            // User avatar
            avatar.style.background = '#555';
        }
        
        const content = document.createElement('div');
        content.className = 'ai-twins-chat-message-content';
        content.textContent = text;
        
        messageEl.appendChild(avatar);
        messageEl.appendChild(content);
        
        this.chatMessages.appendChild(messageEl);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    simulateTyping() {
        // Show typing indicator
        const typingEl = document.createElement('div');
        typingEl.className = 'ai-twins-chat-message ai';
        
        const avatar = document.createElement('div');
        avatar.className = 'ai-twins-chat-message-avatar';
        
        // Use the active orb's gradient or default to the first orb
        const orbIndex = this.activeOrb !== null ? this.activeOrb : 0;
        avatar.style.background = this.options.orbs[orbIndex].gradient;
        
        const content = document.createElement('div');
        content.className = 'ai-twins-chat-message-content';
        content.textContent = 'Typing...';
        
        typingEl.appendChild(avatar);
        typingEl.appendChild(content);
        
        this.chatMessages.appendChild(typingEl);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        
        // Generate response after a delay
        setTimeout(() => {
            // Remove typing indicator
            this.chatMessages.removeChild(typingEl);
            
            // Add AI response
            const responses = [
                "I'm here to help you explore the AI evolution ecosystem.",
                "Your AI Twin is always with you, even when you're not on this page.",
                "You can continue our conversation anytime, anywhere.",
                "I'm learning and evolving with every interaction we have.",
                "Feel free to ask me anything about Helo Im AI's vision and technology."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            this.addMessage(randomResponse, 'ai');
        }, 1500);
    }
    
    setActiveOrb(index) {
        // Reset all orbs
        const orbs = this.orbContainer.querySelectorAll('.ai-orb');
        orbs.forEach(orb => {
            orb.querySelector('.ai-orb-active').style.display = 'none';
        });
        
        // Set active orb
        if (index !== null && index >= 0 && index < orbs.length) {
            orbs[index].querySelector('.ai-orb-active').style.display = 'block';
            this.activeOrb = index;
        } else {
            this.activeOrb = null;
        }
    }
    
    // Public method to cycle through active orbs
    cycleActiveOrb() {
        const orbs = this.orbContainer.querySelectorAll('.ai-orb');
        let nextIndex = this.activeOrb !== null ? (this.activeOrb + 1) % orbs.length : 0;
        this.setActiveOrb(nextIndex);
    }
}

// Initialize the component when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add Font Awesome if not already present
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }
    
    // Initialize the AI Twins Indicator
    window.aiTwinsIndicator = new AITwinsIndicator();
    
    // Start cycling through orbs every 5 seconds
    setInterval(() => {
        window.aiTwinsIndicator.cycleActiveOrb();
    }, 5000);
});
