'use strict';

const Hapi = require('@hapi/hapi');
const db = require('./app/db');
const mail = require('./services/mail');
const jwtAuth = require('./services/auth');
const Path = require('path');

const server = Hapi.server({
  port: process.env.PORT || 3001,
  host: 'localhost',
  address: process.env.NODE_URI || 'localhost',
  routes: {
    cors: true,
  },
});

const auth = async server => {
  server.register(jwtAuth);
  server.auth.strategy('jwt', 'jwt');
};

const init = async () => {
  await auth(server);
  await require('./app/routes/users')(server);
  await require('./app/routes/code')(server);
  await require('./app/routes/calendar')(server);

  await mail.init();
  await server.start();
  db.userActivationCleanup();
  setInterval(db.userActivationCleanup, 1000 * 60 * 60 * 1);
  console.log(`Server running at: ${server.info.uri}`);
};

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
    return { success: 'Testi testinen1234' };
  },
});

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
