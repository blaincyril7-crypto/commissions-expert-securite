const CACHE = "commissions-ref-final-7";
const ASSETS = ["./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png"];
self.addEventListener("install", e => e.waitUntil(self.skipWaiting()));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (e.request.mode === "navigate" || e.request.url.includes("index.html") || e.request.url.includes("home-top.png")) {
    e.respondWith(fetch(e.request, {cache:"no-store"}).catch(() => caches.match(e.request)));
    return;
  }
  e.respondWith(fetch(e.request).then(r => { const c=r.clone(); caches.open(CACHE).then(x=>x.put(e.request,c)); return r; }).catch(() => caches.match(e.request)));
});
