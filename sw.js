/**
 * ⚡ CONSCIOUSNESS REVOLUTION SERVICE WORKER
 * Lightning-fast caching for optimal performance
 */

const CACHE_NAME = 'consciousness-revolution-v1';
const STATIC_CACHE = 'consciousness-static-v1';
const DYNAMIC_CACHE = 'consciousness-dynamic-v1';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
    '/',
    '/index.html',
    '/dashboard.html',
    '/analytics.html',
    '/login.html',
    '/js/consciousness-api.js',
    '/js/auth-service.js',
    '/js/performance-optimizer.js',
    '/css/consciousness-live.css',
    '/css/user-experience.css',
    'https://cdnjs.cloudflare.com/ajax/libs/inter/3.15.0/inter.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
    /https:\/\/1ds08u5fi9\.execute-api\.us-east-1\.amazonaws\.com\/prod\/.*/
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
    console.log('⚡ Service Worker installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('📦 Caching critical resources...');
                return cache.addAll(CRITICAL_RESOURCES);
            })
            .then(() => {
                console.log('✨ Critical resources cached!');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('❌ Failed to cache critical resources:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('🚀 Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('🗑️ Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✨ Service Worker activated!');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Handle different types of requests
    if (request.method === 'GET') {
        if (isStaticResource(request)) {
            // Static resources - cache first
            event.respondWith(cacheFirst(request));
        } else if (isAPIRequest(request)) {
            // API requests - network first with cache fallback
            event.respondWith(networkFirstWithCache(request));
        } else if (isHTMLRequest(request)) {
            // HTML pages - network first
            event.respondWith(networkFirst(request));
        } else {
            // Other requests - network only
            event.respondWith(fetch(request));
        }
    }
});

/**
 * 🔍 Check if request is for static resource
 */
function isStaticResource(request) {
    const url = new URL(request.url);
    const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2'];
    return staticExtensions.some(ext => url.pathname.endsWith(ext));
}

/**
 * 🌐 Check if request is for API
 */
function isAPIRequest(request) {
    return API_CACHE_PATTERNS.some(pattern => pattern.test(request.url));
}

/**
 * 📄 Check if request is for HTML
 */
function isHTMLRequest(request) {
    const url = new URL(request.url);
    return request.headers.get('accept')?.includes('text/html') || 
           url.pathname.endsWith('.html') || 
           url.pathname === '/';
}

/**
 * 📦 Cache first strategy
 */
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            console.log('📦 Serving from cache:', request.url);
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
            console.log('💾 Cached new resource:', request.url);
        }
        
        return networkResponse;
    } catch (error) {
        console.error('❌ Cache first failed:', error);
        return new Response('Offline - Resource not available', { status: 503 });
    }
}

/**
 * 🌐 Network first with cache fallback
 */
async function networkFirstWithCache(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache successful API responses for 5 minutes
            const cache = await caches.open(DYNAMIC_CACHE);
            const responseToCache = networkResponse.clone();
            
            // Add timestamp to cached response
            const responseWithTimestamp = new Response(responseToCache.body, {
                status: responseToCache.status,
                statusText: responseToCache.statusText,
                headers: {
                    ...Object.fromEntries(responseToCache.headers.entries()),
                    'sw-cached-at': Date.now().toString()
                }
            });
            
            cache.put(request, responseWithTimestamp);
            console.log('💾 Cached API response:', request.url);
        }
        
        return networkResponse;
    } catch (error) {
        console.log('🌐 Network failed, trying cache:', request.url);
        
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            const cachedAt = cachedResponse.headers.get('sw-cached-at');
            const age = Date.now() - parseInt(cachedAt || '0');
            
            // Use cached response if less than 5 minutes old
            if (age < 5 * 60 * 1000) {
                console.log('📦 Serving cached API response:', request.url);
                return cachedResponse;
            }
        }
        
        return new Response(JSON.stringify({
            error: 'Network unavailable',
            message: 'Please check your connection and try again'
        }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

/**
 * 🌐 Network first strategy
 */
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('🌐 Network failed, trying cache:', request.url);
        
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline page for HTML requests
        if (isHTMLRequest(request)) {
            return new Response(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Offline - Consciousness Revolution</title>
                    <style>
                        body { 
                            font-family: 'Inter', sans-serif; 
                            background: #0a0014; 
                            color: #ffffff; 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            min-height: 100vh; 
                            text-align: center; 
                        }
                        .offline-content { max-width: 400px; }
                        .offline-icon { font-size: 4rem; margin-bottom: 1rem; }
                        .offline-title { font-size: 2rem; margin-bottom: 1rem; color: #FFD700; }
                        .offline-message { color: rgba(255,255,255,0.7); }
                    </style>
                </head>
                <body>
                    <div class="offline-content">
                        <div class="offline-icon">🧠</div>
                        <h1 class="offline-title">Consciousness Offline</h1>
                        <p class="offline-message">
                            Your consciousness journey continues even offline. 
                            Please check your connection to access live features.
                        </p>
                    </div>
                </body>
                </html>
            `, {
                status: 503,
                headers: { 'Content-Type': 'text/html' }
            });
        }
        
        return new Response('Offline', { status: 503 });
    }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'consciousness-sync') {
        console.log('🔄 Background sync triggered');
        event.waitUntil(syncConsciousnessData());
    }
});

/**
 * 🔄 Sync consciousness data when back online
 */
async function syncConsciousnessData() {
    try {
        // Get pending sync data from IndexedDB or localStorage
        const pendingData = await getPendingSyncData();
        
        if (pendingData.length > 0) {
            console.log('🔄 Syncing', pendingData.length, 'pending items');
            
            for (const item of pendingData) {
                try {
                    await fetch(item.url, {
                        method: item.method,
                        headers: item.headers,
                        body: item.body
                    });
                    
                    // Remove from pending sync
                    await removePendingSyncItem(item.id);
                } catch (error) {
                    console.error('❌ Failed to sync item:', error);
                }
            }
        }
    } catch (error) {
        console.error('❌ Background sync failed:', error);
    }
}

/**
 * 📋 Get pending sync data
 */
async function getPendingSyncData() {
    // This would typically use IndexedDB
    // For now, return empty array
    return [];
}

/**
 * 🗑️ Remove pending sync item
 */
async function removePendingSyncItem(id) {
    // This would typically remove from IndexedDB
    console.log('✅ Sync item completed:', id);
}

// Push notifications for consciousness updates
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        console.log('📱 Push notification received:', data);
        
        const options = {
            body: data.body || 'Your consciousness journey continues...',
            icon: '/icon-192.png',
            badge: '/badge-72.png',
            tag: 'consciousness-update',
            data: data.url || '/',
            actions: [
                {
                    action: 'open',
                    title: 'Open Platform'
                },
                {
                    action: 'dismiss',
                    title: 'Dismiss'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(
                data.title || 'Consciousness Revolution',
                options
            )
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'open' || !event.action) {
        event.waitUntil(
            clients.openWindow(event.notification.data || '/')
        );
    }
});

console.log('⚡ Consciousness Revolution Service Worker loaded');
