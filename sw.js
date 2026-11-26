const C='lumi-3-9';
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html','./manifest.webmanifest','./icon.png'].map(u=>new Request(u,{cache:'reload'}))))));
self.addEventListener('message',e=>{if(e.data==='ACTIVATE_UPDATE')self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('lumi-')&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;if(r.mode==='navigate'){e.respondWith(caches.open(C).then(async c=>await c.match('./index.html')||fetch(r)));return;}e.respondWith(caches.open(C).then(async c=>await c.match(r)||fetch(r)));});
