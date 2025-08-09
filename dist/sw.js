// Service Worker for 4K Print Website
const CACHE_NAME = '4k-print-v1';
const urlsToCache = [
    '/',
    '/assets/css/main.min.css',
    '/assets/js/main.min.js',
    '/logo.png',
    '/logoWhite.png',
    '/placeholder.webp'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
        )
    );
});
