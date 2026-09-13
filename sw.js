const CACHE_NAME = 'pas-family-v0.2.5';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/pdf.min.mjs',
  './assets/pdf.worker.min.mjs',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png'
];
const SHARE_DB = 'pas-family-share-v1';
const SHARE_STORE = 'inbox';
const SHARE_KEY = 'shared-latest';

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
});

function openShareDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(SHARE_DB, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(SHARE_STORE)) {
        request.result.createObjectStore(SHARE_STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function isPdf(file) {
  if (!(file instanceof Blob) || file.type.toLowerCase() !== 'application/pdf') return false;
  const signature = new Uint8Array(await file.slice(0, 5).arrayBuffer());
  return String.fromCharCode(...signature) === '%PDF-';
}

async function storeSharedPdf(file) {
  const db = await openShareDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(SHARE_STORE, 'readwrite');
    tx.objectStore(SHARE_STORE).put({
      id: SHARE_KEY,
      name: file.name || 'PAS compartido.pdf',
      type: file.type,
      size: file.size,
      savedAt: new Date().toISOString(),
      blob: file
    });
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
  db.close();
}

async function receiveShare(request) {
  try {
    const form = await request.formData();
    const file = form.get('pas_pdf');
    if (!await isPdf(file)) {
      return new Response('El archivo compartido no es un PDF válido.', { status: 415, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    }
    await storeSharedPdf(file);
    return Response.redirect(new URL('./?shared=1', self.registration.scope), 303);
  } catch (error) {
    return new Response('No fue posible recibir el PDF compartido.', { status: 400, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
}

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const shareUrl = new URL('./share-target', self.registration.scope);
  if (event.request.method === 'POST' && url.href === shareUrl.href) {
    event.respondWith(receiveShare(event.request));
    return;
  }
  if (event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('./index.html')));
    return;
  }
  if (url.origin === self.location.origin) {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    })));
  }
});
