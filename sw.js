// File: sw.js

const CACHE_NAME = "polytechnic-hub-v1.0.0";

const STATIC_CACHE = [

    "/",
    "/index.html",
    "/offline.html",
    "/404.html",
    "/manifest.json",

    "/css/reset.css",
    "/css/variables.css",
    "/css/typography.css",
    "/css/layout.css",
    "/css/grid.css",
    "/css/header.css",
    "/css/navbar.css",
    "/css/sidebar.css",
    "/css/footer.css",
    "/css/cards.css",
    "/css/buttons.css",
    "/css/forms.css",
    "/css/banner.css",
    "/css/modal.css",
    "/css/toast.css",
    "/css/animations.css",
    "/css/responsive.css",
    "/css/dark-theme.css",
    "/css/style.css",

    "/js/app.js",
    "/js/component-loader.js",
    "/js/router.js",
    "/js/auth.js",
    "/js/supabase.js",
    "/js/api.js",
    "/js/search.js",
    "/js/theme.js",
    "/js/sidebar.js",
    "/js/navbar.js",
    "/js/banner.js",
    "/js/notifications.js",
    "/js/profile.js",
    "/js/courses.js",
    "/js/tests.js",
    "/js/downloads.js",
    "/js/bookmarks.js",
    "/js/analytics.js",
    "/js/pwa.js",
    "/js/service-worker-register.js",
    "/js/modal.js",
    "/js/toast.js",
    "/js/helper.js",
    "/js/utils.js",

    "/components/header.html",
    "/components/sidebar.html",
    "/components/footer.html",
    "/components/bottom-nav.html",

    "/assets/logo/logo.png",
    "/favicon.ico"

];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => cache.addAll(STATIC_CACHE))

            .then(() => self.skipWaiting())

    );

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

            .then(keys => {

                return Promise.all(

                    keys.map(key => {

                        if (key !== CACHE_NAME) {

                            return caches.delete(key);

                        }

                    })

                );

            })

            .then(() => self.clients.claim())

    );

});

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") {

        return;

    }

    event.respondWith(

        caches.match(event.request)

            .then(cacheResponse => {

                if (cacheResponse) {

                    return cacheResponse;

                }

                return fetch(event.request)

                    .then(networkResponse => {

                        const responseClone = networkResponse.clone();

                        caches.open(CACHE_NAME)

                            .then(cache => {

                                cache.put(event.request, responseClone);

                            });

                        return networkResponse;

                    });

            })

            .catch(() => {

                if (event.request.mode === "navigate") {

                    return caches.match("/offline.html");

                }

            })

    );

});
