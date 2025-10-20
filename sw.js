const CACHE_NAME = 'ieducate-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/responsive.css',
  '/js/responsive.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Network-first for HTML, cache-first for others
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return res;
      }).catch(() => caches.match(request))
    );
  } else {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        return res;
      }))
    );
  }
});
