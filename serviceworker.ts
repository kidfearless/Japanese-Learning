// used to fix some ts errors. self isn't a service worker by default.
var serviceworker: ServiceWorkerGlobalScope = self as any;


serviceworker.addEventListener('install', (event: ExtendableEvent) => event.waitUntil(onInstall(event)));
serviceworker.addEventListener('activate', (event: ExtendableEvent) => event.waitUntil(onActivate(event)));
serviceworker.addEventListener("fetch", (event: FetchEvent) => (event.respondWith(onFetch(event))));

const CACHE_NAME = 'jap-cache-v2';

let cacheSet = new Set<string>();
cacheSet.add(`${origin}/data/hiragana.json`);

async function onInstall(event: ExtendableEvent)
{
	console.info('Service worker: Skip');
	await serviceworker.skipWaiting();
	let keys = await caches.keys();
	removeOldKeys(keys);
	console.info('Service worker: Install');
}

function removeOldKeys(keys:string[])
{
	for (let key of keys)
	{
		if(key !== CACHE_NAME)
		{
			console.info(`Service worker: Deleting cache ${key}`);
			caches.delete(key);
		}
	}
}

async function onActivate(event: ExtendableEvent)
{
	console.info('Service worker: Activate');
}

async function onFetch(event: FetchEvent)
{
	console.info(`Service worker: Fetching ${event.request.url}`);
	let cached = await caches.match(event.request);
	if (cached)
	{
		console.info(`Service worker: Returning cached ${event.request.url}`);
		return cached;
	}

	// otherwise, return the network response
	if (!cacheSet.has(event.request.url))
	{
		console.info(`Service worker: Returning non-cached url ${event.request.url}`);
		return fetch(event.request);
	}

	console.info(`Service worker: Caching url ${event.request.url}`);

	// cache the request if it exists in the cacheSet
	let response = await fetch(event.request);
	let cache = await caches.open(CACHE_NAME);
	cache.put(event.request, response.clone());
	return response;
}