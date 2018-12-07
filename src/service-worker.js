/* global workbox */

// Write your own Service Worker related code here. You don't need to implement
// caching strategies, as Workbox will auto-inject that part when you build your
// project. This is the perfect place to implement other great SW features.
// (e.g. Web Push, etc...)

// Uncomment the next few lines to enable precaching with Workbox.
// By default, this lines are commented out as you might not want to keep precaching
// active while in dev mode. The reason why we still register the SW in dev mode is that
// it allows to test other great SW features, such as push notifications or background sync.
// When you think your app is ready for production, you can also uncomment the following lines
// to test out the SW with Workbox in dev mode (automatically enabled when on localhost), so that
// you can make sure that you're actually caching your PWA correctly.
// workbox.skipWaiting();
// workbox.clientsClaim();
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest);
// workbox.routing.registerNavigationRoute('index.html');

// Uncomment next line to enable offline Google Analytics
// workbox.googleAnalytics.initialize();
