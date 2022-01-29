"use strict";
var serviceworker = self;
serviceworker.addEventListener('install', (event) => event.waitUntil(onInstall(event)));
serviceworker.addEventListener('activate', (event) => event.waitUntil(onActivate(event)));
serviceworker.addEventListener("fetch", (event) => (event.respondWith(onFetch(event))));
const CACHE_NAME = 'jap-cache-v4';
const DEBUG = true;
let cacheSet = new Set();
cacheSet.add(`${origin}/data/hiragana.json`);
cacheSet.add(`${origin}/css/index.css`);
cacheSet.add(`${origin}/js/index.js`);
cacheSet.add(`${origin}/js/interfaces.js`);
cacheSet.add(`${origin}/manifest.json`);
cacheSet.add(`${origin}/js/template.js`);
cacheSet.add(`${origin}/img/icon-512.png`);
cacheSet.add(`${origin}/img/icon-128.png`);
cacheSet.add(`${origin}/js/game.js`);
cacheSet.add(`${origin}/`);
cacheSet.add(`${origin}/index.html`);
async function onInstall(event) {
    console.info('Service worker: Skip');
    await serviceworker.skipWaiting();
    let keys = await caches.keys();
    removeOldKeys(keys);
    console.info('Service worker: Install');
}
function removeOldKeys(keys) {
    for (let key of keys) {
        if (key !== CACHE_NAME || DEBUG) {
            console.info(`Service worker: Deleting cache ${key}`);
            caches.delete(key);
        }
    }
}
async function onActivate(event) {
    console.info('Service worker: Activate');
}
async function onFetch(event) {
    console.info(`Service worker: Fetching ${event.request.url}`);
    if (DEBUG) {
        return fetch(event.request);
    }
    let cached = await caches.match(event.request);
    if (cached) {
        console.info(`Service worker: Returning cached ${event.request.url}`);
        return cached;
    }
    if (!cacheSet.has(event.request.url)) {
        console.info(`Service worker: Returning non-cached url ${event.request.url}`);
        return fetch(event.request);
    }
    console.info(`Service worker: Caching url ${event.request.url}`);
    let response = await fetch(event.request);
    let cache = await caches.open(CACHE_NAME);
    cache.put(event.request, response.clone());
    return response;
}
//# sourceMappingURL=serviceworker.js.map