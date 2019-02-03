var CACHE_NAME = 'before-install-cache-v1'
var urlsToCache = [
  '/',
  '/index.html',
  '/script.js',
  'style.css'
]

self.addEventListener('install', (event) => {
  self.skipWaiting()
  console.log('Installed')
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
      .catch(err => {
        console.log(err)
      })
  )
})

self.addEventListener('activate', (event) => {
  console.log('Activated')
})

self.addEventListener('fetch', (event) => {
  return fetch(event.request)
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Request found in cache!', event.request.url)
        return response
      }

      caches.open(CACHE_NAME)
        .then(cache => {
          cache.add(event.request)
            .then(() => {
              console.log('Request saved in cache!', event.request.url)
            })
            .catch(err => {
              console.log(err)
            })
          })
          .catch(err => {
            console.log(err)
          })
      console.warn('Request not found in cache :(', event.request.url)
      return fetch(event.request)
    })
    .catch(err => {
      console.log(err)
    })
  )
})