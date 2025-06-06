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
                <a href="/soulcore-lab.html">SoulCore Lab 3D</a>
                <a href="/evolution.html">Evolution</a>
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
            <div class="container">
                <div class="footer-content">
                    <div class="footer-column">
                        <h3>Helo I'm AI</h3>
                        <ul>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Press</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Products</h3>
                        <ul>
                            <li><a href="soulcore.html">SoulCore</a></li>
                            <li><a href="api.html">API</a></li>
                            <li><a href="#">Solutions</a></li>
                            <li><a href="#">Pricing</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Our Projects</h3>
                        <ul>
                            <li><a href="https://Soulcorehub.io" target="_blank">SoulCoreHub.io</a></li>
                            <li><a href="soulcore-lab.html">SoulCore Lab 3D</a></li>
                            <li><a href="https://www.Soulcorehub.com" target="_blank">SoulCoreHub.com</a></li>
                            <li><a href="https://www.Aibefresh.com" target="_blank">AiBeFresh.com</a></li>
                            <li><a href="https://lilplaybook.com" target="_blank">LilPlaybook.com</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Connect</h3>
                        <ul>
                            <li><a href="https://x.com/HeloIm_Ai_inc" target="_blank"><i class="fab fa-twitter"></i> Twitter</a></li>
                            <li><a href="https://www.linkedin.com/in/heloimai" target="_blank"><i class="fab fa-linkedin"></i> LinkedIn</a></li>
                            <li><a href="https://github.com/Sourcesiri-Kamelot" target="_blank"><i class="fab fa-github"></i> GitHub</a></li>
                            <li><a href="https://www.youtube.com/@ThegodsHonestTruthai" target="_blank"><i class="fab fa-youtube"></i> YouTube</a></li>
                            <li><a href="https://discord.gg/vrySD8qA" target="_blank"><i class="fab fa-discord"></i> Discord</a></li>
                        </ul>
                    </div>
                </div>
                <div class="copyright">
                    <p>&copy; 2025 Helo I'm AI Inc. All rights reserved.</p>
                </div>
            </div>
        `;
        document.body.appendChild(footer);
    }
});
