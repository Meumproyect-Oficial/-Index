const CACHE_NAME = 'meumproyect-cache-v3';
const assetsToCache = [
 './',
 './index.html',
 './Styles/index.css',
 './Java/index.js',
 './manifest.json',
 './icons/icon-192.png',
 './icons/icon-512.png',
 './Images/BodyBackground.png',
 './Images/Tarjeta de Presentacion.png'
];

self.addEventListener('install', (event) => {
 event.waitUntil(
 caches.open(CACHE_NAME).then((cache) => {
 return cache.addAll(assetsToCache);
 })
 );
});

self.addEventListener('activate', (event) => {
 event.waitUntil(
 caches.keys().then((cacheNames) => {
 return Promise.all(
 cacheNames.map((cache) => {
 if (cache !== CACHE_NAME) {
 return caches.delete(cache);
 }
 })
 );
 })
 );
});

self.addEventListener('fetch', (event) => {
 event.respondWith(
 caches.match(event.request).then((response) => {
 return response || fetch(event.request);
 })
 );
});