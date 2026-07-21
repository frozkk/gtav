const CACHE_NAME = 'gta5-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/characters.html',  
  '/features.html',    
  '/css/style.css',
  '/images/logo.png',
  '/images/vinewood.jpg',
  '/images/michael.jpg',
  '/images/franklin.jpg',
  '/images/trevor.jpg',
  '/images/lester.jpg',
  '/images/lamar.jpg',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
