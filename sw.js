const CACHE = 'mad-2026-06-23-172127';
const ASSETS = [
  'index.html',
  'docs.json',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'icon-180.png',
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  // docs.json: network-first so on-trip edits show up immediately when online,
  // falling back to the cached copy when offline. This is what lets the
  // documents be updated from a phone without a cache-version bump.
  if (new URL(e.request.url).pathname.endsWith('docs.json')) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then((hit) => {
      if (hit) return hit;
      return fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => {
          if (e.request.mode === 'navigate') return caches.match('index.html');
        });
    })
  );
});
