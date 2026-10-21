// FootyFrenzy Stats: eerst het netwerk (altijd de nieuwste cijfers), zonder verbinding de laatst bewaarde versie.
const CACHE = 'ff-stats-v1';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(u.pathname, copy)); }
    return r;
  }).catch(() => caches.match(u.pathname).then(r => r || caches.match('./'))));
});
