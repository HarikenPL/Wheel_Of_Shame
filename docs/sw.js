/* Bump VERSION on code releases. Media files refresh without code changes. */
const VERSION='0.2.7';
const SCOPE=new URL(self.registration.scope);
const PREFIX='wheel-lab:'+SCOPE.pathname+':';
const CACHE=PREFIX+VERSION;
const MEDIA_PATH=new URL('./media/',SCOPE).pathname;
const ICON_PATHS=new Set(['./icon.svg','./icon-192.png','./icon-512.png'].map(x=>new URL(x,SCOPE).pathname));
const ASSETS=[
  './','./index.html','./style.css','./data.js','./engine.js','./app.js',
  './audio.js','./manifest.webmanifest',
  './icon.svg','./icon-192.png','./icon-512.png',
  './media/logo.png','./media/menu-background.png','./media/wheel-center.png',
  './media/character-background.png','./media/menu.mp3','./media/tick.wav',
  './media/reveal.wav'
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for(const k of await caches.keys())if(k.startsWith(PREFIX)&&k!==CACHE)await caches.delete(k);
  await self.clients.claim();
})()));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==SCOPE.origin||!url.href.startsWith(SCOPE.href))return;
  if(url.pathname.endsWith('/version.json')){
    event.respondWith(fetch(request,{cache:'no-store'}));return;
  }
  if(url.pathname.startsWith(MEDIA_PATH)||ICON_PATHS.has(url.pathname)){
    // Asset changes from GitHub take effect on next online load without a rebuild
    // or new SW version. Previously downloaded files also work offline.
    event.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      if(request.headers.has('range')){
        try{return await fetch(request,{cache:'no-store'})}
        catch(error){
          const full=await cache.match(url.href);
          if(!full)throw error;
          const data=await full.arrayBuffer(), size=data.byteLength;
          const m=/^bytes=(\d*)-(\d*)$/.exec(request.headers.get('range')||'');
          if(!m)return full;
          const endVal=m[2]?Number(m[2]):null;
          const start=m[1]?Number(m[1]):Math.max(0,size-(endVal||0));
          const end=m[1]?Math.min(size-1,endVal??size-1):size-1;
          if(start>=size||end<start)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${size}`}});
          return new Response(data.slice(start,end+1),{status:206,headers:{
            'Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':String(end-start+1),
            'Accept-Ranges':'bytes','Content-Type':full.headers.get('Content-Type')||'application/octet-stream'
          }});
        }
      }
      try{
        const response=await fetch(request,{cache:'no-store'});
        if(response.ok&&response.status===200)await cache.put(request,response.clone());
        return response;
      }catch(error){
        const previous=await cache.match(request,{ignoreSearch:true});
        if(previous)return previous;
        throw error;
      }
    })());return;
  }
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    const found=await cache.match(request,{ignoreSearch:true});
    if(found)return found;
    try{return await fetch(request)}catch(error){
      if(request.mode==='navigate')return cache.match('./index.html');
      throw error;
    }
  })());
});
