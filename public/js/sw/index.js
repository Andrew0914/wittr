self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.status === 404)
          return new Response("Resource not found 🎅🏼");
        return response;
      })
      .catch(() => {
        return new Response("Something is wrong 😈");
      })
  );
});
