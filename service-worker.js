// service-worker.js

// Cache name for storing assets
const CACHE_NAME = "my-site-cache";

// Assets to cache (add more as needed)
const assetsToCache = [
    "/offline.html", // Your custom offline fallback page
    // Add other static assets (CSS, JS, images, etc.) here
];

// Install event: Cache assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assetsToCache);
        })
    );
});

// Fetch event: Serve cached assets or fetch from network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Activate event: Clean up old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                })
            );
        })
    );
});
