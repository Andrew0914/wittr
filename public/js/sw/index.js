const urlsToCache = [
  "/skeleton",
  "js/main.js",
  "css/main.css",
  "imgs/icon.png",
  "https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff",
  "https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff",
];

const STATIC_CHACHE_NAME = "witter-andrew-v13";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CHACHE_NAME).then((cache) => {
      cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  var requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin && requestUrl.pathname === "/") {
    event.respondWith(caches.match("/skeleton"));
    return;
  }

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

self.addEventListener("message", function (event) {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
