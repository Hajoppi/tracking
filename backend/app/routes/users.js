const db = require('../db');
const utils = require('../../services/utils');
const Bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');
const mail = require('../../services/mail');
const getRandomUsername = require('../../services/usernameGenerator');

const userDataIsValid = obj => {
  const { username, password, accept } = obj;
  const passwordValid = password.length > 5 && password.length < 21;
  const usernameValid = username.length > 1 && username.length < 35;
  return passwordValid && usernameValid && accept;
};

module.exports = async server => {
  server.route([
    {
      method: 'POST',
      path: '/login',
      handler: async (request, h) => {
        const payload = request.payload;
        try {
          const user = await db.getUser(payload.email);
          if (!user) {
            return h.response('No user').code(401);
          } else if (!user.active) {
            return h.response('Not active').code(403);
          }
          const isValid = await Bcrypt.compare(payload.password, user.password);
          if (isValid) {
            return { id_token: utils.createToken(user.id, user.scope) };
          } else {
            return h.response('unauthenticated').code(401);
          }
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
    {
      method: 'POST',
      path: '/register',
      options: {
        auth: false,
      },
      handler: async (request, h) => {
        const obj = request.payload;
        const email = obj.email.split('@');
        if (!email[1] || !(email[1] === 'aalto.fi' || email[1] === 'ayy.fi')) {
          throw Boom.badData('Email must end with aalto.fi or ayy.fi');
        }
        if (!userDataIsValid(obj)) {
          throw Boom.badData('invalid_fields');
        }
        try {
          const activationId = await db.createUser(obj);
          await mail.sendMail(activationId, obj);
          return h.response().code(200);
        } catch (error) {
          //Email was not unique
          console.log(error);
          if (error.code === '23505') {
            throw Boom.conflict(error.constraint);
          }
          //Fields were incorrect
          if (error.code === '23502') {
            throw Boom.badData('invalid_fields');
          }
          console.error(error);
          throw error;
        }
      },
    },
    {
      method: 'POST',
      path: '/activate',
      handler: async (request, h) => {
        const { hash } = request.payload;
        try {
          const userId = await db.activateUser(hash);
          return { id_token: utils.createToken(userId) };
        } catch (error) {
          if (error.code === '22P02') {
            return h.response('Invalid code').code(422);
          }
          return h.response('Code out of date or used').code(403);
        }
      },
    },
    {
      method: 'POST',
      path: '/recover',
      handler: async (request, h) => {
        const { email } = request.payload;
        try {
          const user = await db.getUser(email);
          if (!user) {
            return h.response('No user').code(404);
          }
          user.email = email;
          const activationId = await db.createActivation(user.id);
          await mail.sendMail(activationId, user, 'recover');
          return h.response('success').code(200);
        } catch (error) {
          return h.response('Unknown error').code(500);
        }
      },
    },
    {
      method: 'GET',
      path: '/account',
      options: {
        auth: 'jwt',
      },
      handler: async (request, h) => {
        try {
          const { credentials } = request.auth;
          credentials.associations = await db.getUsersAssociations(
            credentials.id
          );
          return request.auth.credentials;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
    {
      method: 'PUT',
      path: '/account',
      options: {
        auth: 'jwt',
      },
      handler: async (request, h) => {
        const { credentials } = request.auth;
        const { payload } = request;
        try {
          if (payload.password)
            await db.updateUserPassword(credentials.id, payload);
          if (payload.username)
            await db.updateUsername(credentials.id, payload);
          if (payload.infoSeen)
            await db.updateInfoSeen(credentials.id, payload);
          return h.response('success').code(200);
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
    {
      method: 'GET',
      path: '/account/randomize-username/',
      handler: async (request, h) => {
        try {
          let usernameTaken = true;
          let username;
          while (!!usernameTaken) {
            username = getRandomUsername();
            usernameTaken = await db.getUserByUsername(username);
          }
          return username;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
    {
      method: 'GET',
      path: '/users/count',
      handler: async (request, h) => {
        try {
          return await db.getUserCount();
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
  ]);
};
