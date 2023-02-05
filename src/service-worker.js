/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

clientsClaim();

// Precache "src" files and serve them CacheFirst
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== 'navigate') {
      return false;
    }

    // If this is a URL that starts with /_, skip.
    if (url.pathname.startsWith('/_')) {
      return false;
    }
    
    // If this looks like a URL for a resource, because it contains // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

// Images: serve cached version, or from network if not in cache
registerRoute(
  ({ request, sameOrigin }) => sameOrigin && request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
  })
);

// Manifest: serve cached version, or from network if not in cache
registerRoute(
  ({ request, sameOrigin }) => sameOrigin && request.destination === 'manifest',
  new CacheFirst({
    cacheName: 'manifest',
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
