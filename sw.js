const CACHE='giuls-studio-2f843f606ba9ac';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./icon-maskable.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('giuls-studio-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const request=event.request,url=new URL(request.url);if(request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 if(request.mode==='navigate'){event.respondWith(caches.open(CACHE).then(cache=>cache.match(new URL('./index.html',self.registration.scope).href)).then(hit=>hit||fetch(request)));return;}
 event.respondWith(caches.match(request).then(hit=>hit||fetch(request).then(async response=>{if(response.ok&&url.pathname.includes('/ai/')){const copy=response.clone();await caches.open(CACHE).then(cache=>cache.put(request,copy)).catch(()=>{});}return response;})));
});