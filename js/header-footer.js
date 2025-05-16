// Unified Header and Footer Component for Helo I'm AI
document.addEventListener('DOMContentLoaded', function() {
    // Inject unified header if it doesn't exist
    if (!document.querySelector('.nav')) {
        const header = document.createElement('nav');
        header.className = 'nav';
        header.innerHTML = `
            <div class="logo"><a href="/index.html" style="text-decoration: none; background: var(--gradient-1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: gradientFlow 8s linear infinite; background-size: 200% auto;">Helo I'm AI</a></div>
            <div class="nav-links">
                <a href="/index.html">Home</a>
                <a href="/vision.html">AI Twins</a>
                <a href="/soulcore.html">SoulCore</a>
                <a href="/api.html">API</a>
                <a href="/about.html">About</a>
                <a href="/timeline.html">Timeline</a>
                <a href="/projects.html">Projects</a>
                <a href="/dashboard.html">Web3</a>
            </div>
            <button class="cta-button">Connect With Us</button>
        `;
        document.body.insertBefore(header, document.body.firstChild);
    }

    // Inject unified footer if it doesn't exist
    if (!document.querySelector('footer')) {
        const footer = document.createElement('footer');
        footer.innerHTML = `
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Connect With Us</h3>
                    <div class="social-icons">
                        <a href="https://www.linkedin.com/in/heloimai" target="_blank" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
                        <a href="https://github.com/Sourcesiri-Kamelot" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>
                        <a href="https://x.com/HeloIm_Ai_inc" target="_blank" title="X (Twitter)"><i class="fab fa-twitter"></i></a>
                        <a href="https://www.facebook.com/profile.php?id=61571047743600" target="_blank" title="Facebook"><i class="fab fa-facebook"></i></a>
                        <a href="https://www.youtube.com/@ThegodsHonestTruthai" target="_blank" title="YouTube"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
                <div class="footer-section">
                    <h3>Our Projects</h3>
                    <div class="project-links">
                        <a href="https://Soulcorehub.io" target="_blank">SoulCoreHub.io</a>
                        <a href="soulcore-lab.html">SoulCore Lab 3D</a>
                        <a href="https://www.Soulcorehub.com" target="_blank">SoulCoreHub.com</a>
                        <a href="https://www.Aibefresh.com" target="_blank">AiBeFresh.com</a>
                        <a href="https://lilplaybook.com" target="_blank">LilPlaybook.com</a>
                    </div>
                </div>
            </div>
            <div class="copyright">
                <p>&copy; 2025 Helo I'm AI Inc. All Rights Reserved.</p>
                <p>Created by Helo Im AI Inc. Est. 2024</p>
            </div>
        `;
        document.body.appendChild(footer);
    }
});
