importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const { routing, strategies, expiration } = workbox;
const { registerRoute } = routing;
const { NetworkFirst, CacheFirst, StaleWhileRevalidate } = strategies;
const { ExpirationPlugin } = expiration;

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}



// 处理html
registerRoute(({request})=>request.destination === 'document',new NetworkFirst());

// 处理js
registerRoute(({request})=>request.destination === 'script',new NetworkFirst());



// 处理css
const styleCapture = ({request})=>request.destination === 'style';
const styleCache = new StaleWhileRevalidate({ cacheName : 'css-cache' });
registerRoute(styleCapture,styleCache);


// 处理图片
const imageCapture = ({request})=>request.destination === 'image';
const imageCache = new CacheFirst({
    cacheName : 'image-cache',
    plugins : [
        new ExpirationPlugin({
            // Cache only 100 images.
            maxEntries: 100,
            // Cache for a maximum of a week.
            maxAgeSeconds: 7 * 24 * 60 * 60,
        })
    ]
});
registerRoute(imageCapture,imageCache);