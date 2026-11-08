// John Prix app - offline mode (service worker)
// Saves the app on the phone the first time it opens with internet.
// Later: tries the network for 3 s (to get the newest version);
// if there is no internet or the carrier cannot reach the server,
// it opens the saved copy instead of a blank page.
const CACHE = "johnprix-v11";
const FILES = ["./", "./index.html", "./sw.js"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

function timeout(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms));
}

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    Promise.race([fetch(e.request), timeout(3000)])
      .then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return resp;
      })
      .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
