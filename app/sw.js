/* Bump VERSION for every published release (also data.js and version.json). */
const VERSION='0.2.5';
const PREFIX='wheel-lab:'+new URL(self.registration.scope).pathname+':';
const CACHE=PREFIX+VERSION;
const ASSETS=['./','./index.html','./style.css','./data.js','./engine.js','./app.js','./audio-assets.js','./audio.js','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith(PREFIX)&&k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;if(url.pathname.endsWith('/version.json')){event.respondWith(fetch(event.request,{cache:'no-store'}));return}event.respondWith((async()=>{const cache=await caches.open(CACHE);const found=await cache.match(event.request,{ignoreSearch:true});if(found)return found;try{return await fetch(event.request)}catch(e){if(event.request.mode==='navigate')return cache.match('./index.html');throw e}})())});
