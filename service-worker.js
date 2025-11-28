const CACHE_NAME = 'nexusai-v1.0.1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/app.js',
    '/favicon/site.webmanifest',
    '/favicon/favicon.ico',
    '/favicon/favicon.svg',
    '/favicon/apple-touch-icon.png',
    '/favicon/favicon-96x96.png',
    '/favicon/web-app-manifest-192x192.png',
    '/favicon/web-app-manifest-512x512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installation');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Mise en cache des fichiers');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activation');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: Suppression de l ancien cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
    // Ignore les requêtes non-GET
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Retourne la version en cache si elle existe
                if (response) {
                    return response;
                }

                // Sinon, fait la requête réseau
                return fetch(event.request)
                    .then((response) => {
                        // Vérifie si la réponse est valide
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone la réponse
                        const responseToCache = response.clone();

                        // Met en cache la nouvelle ressource
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Fallback pour les pages
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Gestion des messages
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});