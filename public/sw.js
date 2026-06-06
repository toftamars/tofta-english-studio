const CACHE = "tofta-v2";
const PRECACHE = ["./", "./index.html", "./favicon.svg", "./manifest.webmanifest", "./radar.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

function isAppAsset(url) {
  return (
    url.includes("/assets/") &&
    (url.includes("curriculum") || url.includes("DrillPage") || url.includes("index-") || url.includes("vendor"))
  );
}

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = e.request.url;

  if (url.includes("/api/") || url.includes("supabase.co")) return;

  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request)
        .then((res) => {
          if (res.ok && (url.startsWith(self.location.origin) || isAppAsset(url))) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => {
          if (e.request.mode === "navigate") return caches.match("./index.html");
          return cached;
        });
    }),
  );
});
