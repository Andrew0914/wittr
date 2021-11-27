const urlsToCache = [
  "/",
  "js/main.js",
  "css/main.css",
  "imgs/icon.png",
  "https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff",
  "https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff",
];

const STATIC_CHACHE_NAME = "witter-andrew-v5";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CHACHE_NAME).then((cache) => {
      cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== STATIC_CHACHE_NAME)
            .map((chacheName) => caches.delete(chacheName))
        )
      )
  );
});
