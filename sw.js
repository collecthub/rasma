const C='rasma-v5-rounded-app-icons';
const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','rasma-logo-mark.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.pathname.endsWith('config.json')||u.pathname.endsWith('products.json'))return;
  const same=u.origin===location.origin,font=/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);if(!same&&!font)return;
  e.respondWith(caches.match(e.request).then(hit=>{const net=fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>hit);return hit||net}))});
