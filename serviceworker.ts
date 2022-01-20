// // used to fix some ts errors. self isn't a service worker by default.
// var serviceworker: ServiceWorkerGlobalScope & WorkerGlobalScope & typeof globalThis = self as any;


// serviceworker.addEventListener('install', (event: ExtendableEvent) => event.waitUntil(OnInstall(event)));

// serviceworker.addEventListener('activate', (event: ExtendableEvent) => event.waitUntil(OnActivate(event)));

// serviceworker.addEventListener("fetch", (event: FetchEvent) => (event.respondWith(OnFetch(event))));


// const CACHE_NAME = 'jap-cache-v1';

// async function OnInstall(event: ExtendableEvent)
// {
// 	let keys = await caches.keys();
// 	for (let key of keys)
// 	{
// 		if(key !== CACHE_NAME)
// 		{
// 			console.info(`Service worker: Deleting cache ${key}`);
// 			caches.delete(key);
// 		}
// 	}
// 	console.info('Service worker: Install');
// }

// async function OnActivate(event: ExtendableEvent)
// {
// 	console.info('Service worker: Activate');
// }

// let cacheSet = new Set<string>();
// cacheSet.add("https://use.fontawesome.com/releases/v5.15.4/css/all.css");
// cacheSet.add("https://use.fontawesome.com/releases/v5.15.4/js/all.js");
// cacheSet.add("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700");

// async function OnFetch(event: FetchEvent)
// {
// 	let cached = await caches.match(event.request);
// 	if (cached)
// 	{
// 		return cached;
// 	}

// 	// otherwise, return the network response
// 	if (!cacheSet.has(event.request.url))
// 	{
// 		return fetch(event.request);
// 	}
	
// 	// cache the request if it exists in the cacheSet
// 	let response = await fetch(event.request);
// 	let cache = await caches.open(CACHE_NAME);
// 	cache.put(event.request, response.clone());
// 	return response;
// }
