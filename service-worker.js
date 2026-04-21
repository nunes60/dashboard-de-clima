const STATIC_CACHE_NAME = "weather-static-v3";
const RUNTIME_CACHE_NAME = "weather-runtime-v3";
const OFFLINE_SHELL = "./index.html";

const STATIC_ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./favicon.svg",
    "./locales/pt-BR.json",
    "./locales/en.json",
    "./locales/es.json",
    "./locales/fr.json"
];

self.addEventListener("install", (event) => {
    event.waitUntil((async () => {
        const cache = await caches.open(STATIC_CACHE_NAME);
        await cache.addAll(STATIC_ASSETS);
        self.skipWaiting();
    })());
});

self.addEventListener("activate", (event) => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys
            .filter((key) => key !== STATIC_CACHE_NAME && key !== RUNTIME_CACHE_NAME)
            .map((key) => caches.delete(key)));
        await self.clients.claim();
    })());
});

self.addEventListener("fetch", (event) => {
    const request = event.request;

    if (request.method !== "GET") {
        return;
    }

    const requestUrl = new URL(request.url);

    if (request.mode === "navigate") {
        event.respondWith(networkFirst(request, STATIC_CACHE_NAME, OFFLINE_SHELL));
        return;
    }

    if (requestUrl.origin === self.location.origin) {
        const isAppCodeAsset = requestUrl.pathname.endsWith(".css")
            || requestUrl.pathname.endsWith(".js")
            || requestUrl.pathname.endsWith(".html");

        if (isAppCodeAsset) {
            event.respondWith(networkFirst(request, STATIC_CACHE_NAME));
            return;
        }

        const isStaticAsset = requestUrl.pathname.endsWith(".svg")
            || requestUrl.pathname.endsWith(".json")
            || requestUrl.pathname.startsWith("/locales/");

        if (isStaticAsset) {
            event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
            return;
        }

        event.respondWith(networkFirst(request, RUNTIME_CACHE_NAME));
        return;
    }

    const isApiRequest = requestUrl.hostname.includes("openweathermap.org")
        || requestUrl.hostname.includes("open-meteo.com")
        || requestUrl.hostname.includes("rainviewer.com")
        || requestUrl.hostname.includes("mapbox.com");

    if (isApiRequest) {
        event.respondWith(networkFirst(request, RUNTIME_CACHE_NAME));
    }
});

async function cacheFirst(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.ok) {
        cache.put(request, networkResponse.clone());
    }

    return networkResponse;
}

async function networkFirst(request, cacheName, fallbackUrl = "") {
    const cache = await caches.open(cacheName);

    try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        if (fallbackUrl) {
            const fallbackResponse = await cache.match(fallbackUrl);
            if (fallbackResponse) {
                return fallbackResponse;
            }
        }

        return new Response("Offline", {
            status: 503,
            statusText: "Offline"
        });
    }
}
