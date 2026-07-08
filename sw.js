const CACHE = "spesa-v1";
const FILES = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-first con aggiornamento in background (stale-while-revalidate)
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const rete = fetch(e.request)
        .then(resp => {
          if (resp && resp.ok) {
            const copia = resp.clone();
            caches.open(CACHE).then(c => c.put(e.request, copia));
          }
          return resp;
        })
        .catch(() => cached);
      return cached || rete;
    })
  );
});
