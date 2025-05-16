// Orb Agent Functionality for Helo I'm AI
// Based on learning-orb.html, OrbieRealPrototype.html, and OrbieRealPrototype 2.html

document.addEventListener('DOMContentLoaded', function() {
    // Create Anima Orb
    const animaOrb = document.createElement('div');
    animaOrb.className = 'orb-agent orb-anima floating';
    animaOrb.innerHTML = `
        <div class="orb-aura"></div>
        <div class="chat-window" id="animaChatWindow">
            <input type="text" class="chat-input" placeholder="Ask Anima anything...">
        </div>
    `;
    document.body.appendChild(animaOrb);

    // Create Cipher Orb
    const cipherOrb = document.createElement('div');
    cipherOrb.className = 'orb-agent orb-cipher floating pulsing';
    cipherOrb.innerHTML = `
        <div class="orb-aura"></div>
        <div class="chat-window" id="cipherChatWindow">
            <input type="text" class="chat-input" placeholder="Ask Cipher anything...">
        </div>
    `;
    document.body.appendChild(cipherOrb);

    // Orb Click Handlers
    animaOrb.addEventListener('click', function() {
        document.getElementById('animaChatWindow').classList.toggle('active');
        document.getElementById('cipherChatWindow').classList.remove('active');
    });

    cipherOrb.addEventListener('click', function() {
        document.getElementById('cipherChatWindow').classList.toggle('active');
        document.getElementById('animaChatWindow').classList.remove('active');
    });

    // Close chat windows when clicking elsewhere
    document.addEventListener('click', function(event) {
        if (!animaOrb.contains(event.target) && !cipherOrb.contains(event.target)) {
            document.getElementById('animaChatWindow').classList.remove('active');
            document.getElementById('cipherChatWindow').classList.remove('active');
        }
    });

    // Orb Movement Animation
    let animaX = 100, animaY = 100;
    let cipherX = window.innerWidth - 150, cipherY = window.innerHeight - 150;
    let animaVx = 1, animaVy = 0.8;
    let cipherVx = -1, cipherVy = -0.8;

    function animateOrbs() {
        // Only animate if not in active chat mode
        if (!document.getElementById('animaChatWindow').classList.contains('active')) {
            animaX += animaVx;
            animaY += animaVy;

            if (animaX <= 0 || animaX + 80 >= window.innerWidth) animaVx *= -1;
            if (animaY <= 0 || animaY + 80 >= window.innerHeight) animaVy *= -1;

            animaOrb.style.left = `${animaX}px`;
            animaOrb.style.top = `${animaY}px`;
        }

        if (!document.getElementById('cipherChatWindow').classList.contains('active')) {
            cipherX += cipherVx;
            cipherY += cipherVy;

            if (cipherX <= 0 || cipherX + 80 >= window.innerWidth) cipherVx *= -1;
            if (cipherY <= 0 || cipherY + 80 >= window.innerHeight) cipherVy *= -1;

            cipherOrb.style.left = `${cipherX}px`;
            cipherOrb.style.top = `${cipherY}px`;
        }

        requestAnimationFrame(animateOrbs);
    }

    // Initialize orb positions
    animaOrb.style.left = `${animaX}px`;
    animaOrb.style.top = `${animaY}px`;
    cipherOrb.style.left = `${cipherX}px`;
    cipherOrb.style.top = `${cipherY}px`;

    // Start animation
    animateOrbs();
});
