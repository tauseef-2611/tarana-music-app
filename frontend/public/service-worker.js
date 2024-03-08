self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);

  event.respondWith(
    caches.match(event.request).then(function(response) {
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
    })
  );
});