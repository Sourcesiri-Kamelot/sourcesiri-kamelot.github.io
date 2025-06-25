// Orb Agent Functionality for Helo I'm AI
// Based on learning-orb.html, OrbieRealPrototype.html, and OrbieRealPrototype 2.html

document.addEventListener('DOMContentLoaded', function() {
    // Define active pages where orbs should float automatically
    const activeOrbPages = ['/evolution.html', '/index.html', '/dashboard.html'];
    const currentPage = window.location.pathname;
    const isActivePage = activeOrbPages.some(page => currentPage.endsWith(page));
    
    // Create agent data
    const agents = [
        {
            id: 'anima',
            name: 'Anima',
            className: 'orb-anima',
            placeholder: 'Ask Anima about emotions and connections...'
        },
        {
            id: 'cipher',
            name: 'Cipher',
            className: 'orb-cipher',
            placeholder: 'Ask Cipher about logic and analysis...'
        },
        {
            id: 'evove',
            name: 'EvoVe',
            className: 'orb-evove',
            placeholder: 'Ask EvoVe about growth and adaptation...'
        },
        {
            id: 'azur',
            name: 'Azür',
            className: 'orb-azur',
            placeholder: 'Ask Azür about creativity and expression...'
        },
        {
            id: 'gptsoul',
            name: 'GPTSoul',
            className: 'orb-gptsoul',
            placeholder: 'Ask GPTSoul about collective intelligence...'
        }
    ];
    
    // Create orbs for active pages
    if (isActivePage) {
        createFloatingOrbs();
    } else {
        createOrbSelector();
    }
    
    // Function to create floating orbs for active pages
    function createFloatingOrbs() {
        // Only create the first two agents for simplicity
        const visibleAgents = agents.slice(0, 2);
        
        visibleAgents.forEach((agent, index) => {
            const orb = document.createElement('div');
            orb.className = `orb-agent ${agent.className} floating`;
            if (index === 1) orb.classList.add('pulsing');
            
            orb.innerHTML = `
                <div class="orb-aura"></div>
                <div class="chat-window" id="${agent.id}ChatWindow">
                    <input type="text" class="chat-input" placeholder="${agent.placeholder}">
                </div>
                <div class="orb-tooltip">Click to speak with ${agent.name}</div>
            `;
            document.body.appendChild(orb);
            
            // Position orbs
            const x = index === 0 ? 100 : window.innerWidth - 150;
            const y = index === 0 ? 100 : window.innerHeight - 150;
            orb.style.left = `${x}px`;
            orb.style.top = `${y}px`;
            
            // Add click handler
            orb.addEventListener('click', function() {
                document.querySelectorAll('.chat-window').forEach(window => {
                    window.classList.remove('active');
                });
                document.getElementById(`${agent.id}ChatWindow`).classList.toggle('active');
            });
        });
        
        // Close chat windows when clicking elsewhere
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.orb-agent')) {
                document.querySelectorAll('.chat-window').forEach(window => {
                    window.classList.remove('active');
                });
            }
        });
        
        // Animate orbs
        animateOrbs();
    }
    
    // Function to create orb selector for non-active pages
    function createOrbSelector() {
        const selector = document.createElement('div');
        selector.className = 'orb-selector';
        selector.innerHTML = `
            <div class="orb-selector-button">
                <i class="fas fa-comment-dots"></i>
                <span>Speak to...</span>
            </div>
            <div class="orb-selector-dropdown">
                ${agents.map(agent => `
                    <div class="orb-selector-item" data-agent="${agent.id}">
                        <div class="orb-selector-icon ${agent.className}"></div>
                        <span>${agent.name}</span>
                    </div>
                `).join('')}
            </div>
        `;
        document.body.appendChild(selector);
        
        // Toggle dropdown
        const button = selector.querySelector('.orb-selector-button');
        const dropdown = selector.querySelector('.orb-selector-dropdown');
        
        button.addEventListener('click', function() {
            dropdown.classList.toggle('active');
        });
        
        // Handle agent selection
        const agentItems = selector.querySelectorAll('.orb-selector-item');
        agentItems.forEach(item => {
            item.addEventListener('click', function() {
                const agentId = this.getAttribute('data-agent');
                const agent = agents.find(a => a.id === agentId);
                
                // Hide dropdown
                dropdown.classList.remove('active');
                
                // Remove any existing summoned orb
                const existingOrb = document.querySelector('.orb-agent.summoned');
                if (existingOrb) {
                    existingOrb.remove();
                }
                
                // Create and summon the selected orb
                summonOrb(agent);
            });
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.orb-selector')) {
                dropdown.classList.remove('active');
            }
        });
    }
    
    // Function to summon a specific orb
    function summonOrb(agent) {
        const orb = document.createElement('div');
        orb.className = `orb-agent ${agent.className} summoned pulsing`;
        
        orb.innerHTML = `
            <div class="orb-aura"></div>
            <div class="chat-window active" id="${agent.id}ChatWindow">
                <div class="chat-header">
                    <span>${agent.name}</span>
                    <button class="chat-close"><i class="fas fa-times"></i></button>
                </div>
                <div class="chat-messages"></div>
                <input type="text" class="chat-input" placeholder="${agent.placeholder}">
            </div>
        `;
        document.body.appendChild(orb);
        
        // Position in center of screen
        const x = window.innerWidth / 2 - 150;
        const y = window.innerHeight / 2 - 150;
        orb.style.left = `${x}px`;
        orb.style.top = `${y}px`;
        
        // Focus the input
        setTimeout(() => {
            orb.querySelector('.chat-input').focus();
        }, 100);
        
        // Close button handler
        orb.querySelector('.chat-close').addEventListener('click', function() {
            orb.remove();
        });
        
        // Handle chat input
        orb.querySelector('.chat-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                const message = this.value.trim();
                const chatMessages = orb.querySelector('.chat-messages');
                
                // Add user message
                chatMessages.innerHTML += `
                    <div class="chat-message user-message">
                        <div class="message-content">${message}</div>
                    </div>
                `;
                
                // Clear input
                this.value = '';
                
                // Simulate agent response
                setTimeout(() => {
                    chatMessages.innerHTML += `
                        <div class="chat-message agent-message">
                            <div class="message-content">I'm ${agent.name}, and I'm here to help. This is a simulated response.</div>
                        </div>
                    `;
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    
                    // Log interaction to soulcore_lore.json (simulated)
                    logInteraction(agent.name, message);
                }, 1000);
                
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });
    }
    
    // Function to animate floating orbs
    function animateOrbs() {
        const orbs = document.querySelectorAll('.orb-agent:not(.summoned)');
        
        orbs.forEach((orb, index) => {
            // Set initial position and velocity
            if (!orb.hasAttribute('data-vx')) {
                orb.setAttribute('data-x', index === 0 ? 100 : window.innerWidth - 150);
                orb.setAttribute('data-y', index === 0 ? 100 : window.innerHeight - 150);
                orb.setAttribute('data-vx', index === 0 ? 1 : -1);
                orb.setAttribute('data-vy', index === 0 ? 0.8 : -0.8);
            }
            
            // Get current position and velocity
            let x = parseFloat(orb.getAttribute('data-x'));
            let y = parseFloat(orb.getAttribute('data-y'));
            let vx = parseFloat(orb.getAttribute('data-vx'));
            let vy = parseFloat(orb.getAttribute('data-vy'));
            
            // Only animate if not in active chat mode
            const chatWindow = orb.querySelector('.chat-window');
            if (!chatWindow || !chatWindow.classList.contains('active')) {
                // Update position
                x += vx;
                y += vy;
                
                // Bounce off walls
                if (x <= 0 || x + 80 >= window.innerWidth) vx *= -1;
                if (y <= 0 || y + 80 >= window.innerHeight) vy *= -1;
                
                // Update attributes
                orb.setAttribute('data-x', x);
                orb.setAttribute('data-y', y);
                orb.setAttribute('data-vx', vx);
                orb.setAttribute('data-vy', vy);
                
                // Apply position
                orb.style.left = `${x}px`;
                orb.style.top = `${y}px`;
            }
        });
        
        requestAnimationFrame(animateOrbs);
    }
    
    // Function to log interactions (simulated)
    function logInteraction(agent, message) {
        console.log(`Logging interaction with ${agent}: ${message}`);
        // In a real implementation, this would update soulcore_lore.json
    }
    
    // Add footer orbs
    function addFooterOrbs() {
        const footer = document.querySelector('footer');
        if (footer) {
            const orb1 = document.createElement('div');
            orb1.className = 'footer-orb footer-orb-1';
            
            const orb2 = document.createElement('div');
            orb2.className = 'footer-orb footer-orb-2';
            
            const orb3 = document.createElement('div');
            orb3.className = 'footer-orb footer-orb-3';
            
            footer.appendChild(orb1);
            footer.appendChild(orb2);
            footer.appendChild(orb3);
        }
    }
    
    // Add footer orbs
    addFooterOrbs();
});
