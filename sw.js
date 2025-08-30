const CACHE_NAME = 'academia-flow-v6';
const ASSETS = ['./','./index.html','./offline.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e=>{ e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null)))); self.clients.claim(); });
self.addEventListener('fetch', e=>{
  const req=e.request, url=new URL(req.url);
  if (req.mode==='navigate' || (req.method==='GET' && req.headers.get('accept')?.includes('text/html'))) {
    e.respondWith(fetch(req).then(r=>{ const copy=r.clone(); caches.open(CACHE_NAME).then(c=>c.put(req,copy)); return r; }).catch(()=>caches.match('./offline.html')));
    return;
  }
  if (req.method==='GET' && url.origin===location.origin) {
    e.respondWith(caches.match(req).then(c=>c||fetch(req).then(r=>{ const copy=r.clone(); caches.open(CACHE_NAME).then(cache=>cache.put(req,copy)); return r; })));
  }
});
