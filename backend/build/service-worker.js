// self.addEventListener('fetch', function(event) {
//   console.log('Handling fetch event for', event.request.url);

//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       if (response !== undefined) {
//         console.log('Found response in cache:', response);
//         return response;
//       } else {
//         console.log('No response found in cache. About to fetch from network...');
//         return fetch(event.request).then(function (response) {
//           console.log('Response from network is:', response);

//           let responseClone = response.clone();
          
//           caches.open('v1').then(function (cache) {
//             cache.put(event.request, responseClone);
//           });

//           return response;
//         }).catch(function () {
//           console.log('Fetching failed. Returning offline page.');
//           return caches.match('/');
//         });
//       }
//     })
//   );
// });
self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);

  // List of API endpoints that should always be fetched from the network
  const networkOnlyPaths = [`${process.env.REACT_APP_URL}/music/recently-added}`,
  `${process.env.REACT_APP_URL}/music/recently-added}`,
  `${process.env.REACT_APP_URL}/music/most-played}`,
  `${process.env.REACT_APP_URL}/playlists}`,
  `${process.env.REACT_APP_URL}/music/poet/}`,
  `${process.env.REACT_APP_URL}/music/artist/}`,
  `${process.env.REACT_APP_URL}/music`,
  `${process.env.REACT_APP_URL}/poets`,
  `${process.env.REACT_APP_URL}/artists`,
  ];

  // Check if the request URL matches any of the network only paths
  const shouldFetchFromNetwork = networkOnlyPaths.some(path => event.request.url.includes(path));

  event.respondWith(
    shouldFetchFromNetwork ? fetchFromNetwork(event) : fetchFromCacheThenNetwork(event)
  );
});

function fetchFromNetwork(event) {
  return fetch(event.request).catch(function () {
    console.log('Fetching failed. Returning offline page.');
    return caches.match('/');
  });
}

function fetchFromCacheThenNetwork(event) {
  return caches.match(event.request).then(function(response) {
    if (response !== undefined) {
      console.log('Found response in cache:', response);
      return response;
    } else {
      console.log('No response found in cache. About to fetch from network...');
      return fetch(event.request).then(function (response) {
        console.log('Response from network is:', response);

        let responseClone = response.clone();
        
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });

        return response;
      }).catch(function () {
        console.log('Fetching failed. Returning offline page.');
        return caches.match('/');
      });
    }
  });
}