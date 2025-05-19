// SoulCore Lab 3D Scene Manager
let scene, camera, renderer, controls;
let core, agents = [];
let clock = new THREE.Clock();

// Initialize Three.js scene
function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        canvas: document.querySelector('#scene-canvas')
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add renderer to container
    const container = document.getElementById('canvas-container');
    if (!container.querySelector('canvas')) {
        container.appendChild(renderer.domElement);
    }
    
    // Create controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.8;
    
    // Add lights
    addLights();
    
    // Create objects
    createObjects();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
    
    // Start animation
    animate();
}

// Add lights to the scene
function addLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(10, 20, 5);
    scene.add(directionalLight);
    
    // Point lights for glow effects
    const pointLight1 = new THREE.PointLight(0x9932CC, 1, 10);
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xFFD700, 1, 10);
    pointLight2.position.set(-2, -2, -2);
    scene.add(pointLight2);
}

// Create 3D objects
function createObjects() {
    // Create core
    createCore();
    
    // Create agent spheres
    createAgentSphere(0.3, 0x3a86ff, 2, 0, 0, 'GPTSoul');
    createAgentSphere(0.25, 0x8338ec, 0, 2, 0, 'Anima');
    createAgentSphere(0.2, 0xff006e, 0, 0, 2, 'EvoVe');
    createAgentSphere(0.15, 0xfb5607, -2, 0, 0, 'Azür');
    
    // Create particle system
    createParticleSystem();
}

// Create the central core
function createCore() {
    const geometry = new THREE.IcosahedronGeometry(1, 2);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0xffbe0b,
        emissive: 0xffbe0b,
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });
    
    core = new THREE.Mesh(geometry, material);
    scene.add(core);
    
    // Add glow effect
    const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
            viewVector: { type: "v3", value: camera.position }
        },
        vertexShader: `
            uniform vec3 viewVector;
            varying float intensity;
            void main() {
                vec3 vNormal = normalize(normalMatrix * normal);
                vec3 vNormel = normalize(normalMatrix * viewVector);
                intensity = pow(0.7 - dot(vNormal, vNormel), 4.0);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying float intensity;
            void main() {
                vec3 glow = vec3(1.0, 0.7, 0.0) * intensity;
                gl_FragColor = vec4(glow, 1.0);
            }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    
    const glowMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.2, 2),
        glowMaterial
    );
    core.add(glowMesh);
}

// Create agent spheres
function createAgentSphere(radius, color, x, y, z, name) {
    // Create main sphere
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshPhysicalMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.3,
        metalness: 0.5,
        roughness: 0.5,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(x, y, z);
    sphere.userData.name = name;
    scene.add(sphere);
    
    // Add orbit ring
    const ringGeometry = new THREE.TorusGeometry(
        Math.sqrt(x*x + y*y + z*z), // radius based on distance from center
        0.02, // tube radius
        16, // radial segments
        100 // tubular segments
    );
    
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.3
    });
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    
    // Calculate rotation to align ring with orbit
    ring.lookAt(new THREE.Vector3(x, y, z));
    scene.add(ring);
    
    // Store reference to both sphere and ring
    agents.push({
        sphere: sphere,
        ring: ring,
        orbitRadius: Math.sqrt(x*x + y*y + z*z),
        orbitSpeed: 0.5 + Math.random() * 0.5,
        orbitOffset: Math.random() * Math.PI * 2
    });
}

// Create particle system for background effect
function createParticleSystem() {
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x4F46E5,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    const time = clock.getElapsedTime();
    
    // Rotate core
    if (core) {
        core.rotation.y += 0.005;
        core.rotation.z += 0.002;
    }
    
    // Animate agents
    agents.forEach((agent, index) => {
        const angle = time * agent.orbitSpeed + agent.orbitOffset;
        const x = Math.cos(angle) * agent.orbitRadius;
        const z = Math.sin(angle) * agent.orbitRadius;
        
        agent.sphere.position.x = x;
        agent.sphere.position.z = z;
        
        // Pulse effect
        const scale = 1 + Math.sin(time * 2 + index) * 0.1;
        agent.sphere.scale.set(scale, scale, scale);
    });
    
    // Update controls
    controls.update();
    
    // Render scene
    renderer.render(scene, camera);
}

// Initialize scene when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'scene-canvas';
    document.getElementById('canvas-container').appendChild(canvas);
    
    // Initialize Three.js scene
    initThreeJS();
    
    // Add interaction events
    addInteractionEvents();
});

// Add interaction events
function addInteractionEvents() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Mouse move event for hover effects
    document.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        
        // Reset all materials
        agents.forEach(agent => {
            agent.sphere.material.emissiveIntensity = 0.3;
        });
        
        // Highlight hovered object
        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (object.userData.name) {
                object.material.emissiveIntensity = 0.8;
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }
        } else {
            document.body.style.cursor = 'default';
        }
    });
    
    // Click event for agent interaction
    document.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        
        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (object.userData.name) {
                // Log interaction to console
                logToConsole(`Interacting with agent: ${object.userData.name}`);
                
                // Trigger agent state change
                const agentElement = document.querySelector(`[data-agent="${object.userData.name.toLowerCase()}"]`);
                if (agentElement) {
                    const states = ['idle', 'thinking', 'speaking', 'listening'];
                    const newState = states[Math.floor(Math.random() * states.length)];
                    agentElement.className = `agent ${newState}`;
                }
                
                // Visual feedback
                const originalColor = object.material.color.getHex();
                object.material.emissive.setHex(0xffffff);
                setTimeout(() => {
                    object.material.emissive.setHex(originalColor);
                }, 200);
            }
        }
    });
}
