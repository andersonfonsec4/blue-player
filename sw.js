const CACHE_NAME = "blueplayer-v1";

const FILES = [
  "./",
  "./index.html",

  "./src/css/style.css",

  "./src/js/player.js",
  "./src/js/ui.js",
  "./src/js/playlist.js",
  "./src/js/visualizer.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES)));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  );
});
