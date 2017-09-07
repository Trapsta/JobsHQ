const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

// create the Hapi server
const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'build'),
      },
    },
  },
});
server.connection({ port: process.env.PORT || 3000 });

// Register the inert plugin
server.register(Inert, (err) => {
  if (err) {
    throw err;
  }

  // Create the route for the build artefacts
  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        lookupCompressed: true,
        index: true,
      },
    },
  });
});

// Redirect all http requests to https if in production
/* eslint-disable consistent-return */
if (process.env.NODE_ENV === 'production') {
  server.ext('onRequest', (request, reply) => {
    if (request.headers['x-forwarded-proto'] !== 'https') {
      return reply('Forwarding to secure route').redirect(
        `https://${request.headers.host}${request.path}${request.url.search}`
      );
    }
    reply.continue();
  });
}

// Setting index.html as the default
server.ext('onPreResponse', (request, reply) => {
  const response = request.response;

  if (!response.isBoom) {
    return reply.continue();
  }

  // else an error has occurred
  const error = response;

  // if the error is 'Object not found', call index.html
  if (error.output.statusCode === 404) {
    return reply.file('index.html');
  }
});
/* eslint-enable consistent-return */

// Start server
server.start((err) => {
  if (err) {
    throw err;
  }
  // Log to the console that the server has started
  console.log('Hapi Server running at:', server.info.uri);
});
