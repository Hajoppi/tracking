const db = require('../db');
const Boom = require('@hapi/boom');
const totp = require('../../services/code');
const utils = require('../../services/utils');
const calendar = require('../../services/calendar');

module.exports = async server => {
  server.route([
    {
      method: 'GET',
      path: '/code/{id}',
      handler: async (request, h) => {
        const id = request.params.id;
        const eventId = utils.decrypt(id);
        return totp(eventId, { timeStep: 20 });
      },
    },
    {
      method: 'GET',
      path: '/validate/{id}',
      options: {
        auth: 'jwt',
      },
      handler: async (request, h) => {
        const id = decodeURIComponent(request.params.id);
        const [eventIdHash, hash] = id.split('-');
        const eventId = utils.decrypt(eventIdHash);
        const hashNow = totp(eventId, { timeStep: 20 });
        const hashOld = totp(eventId, { timeStep: 20, t0: 10 });
        const userId = request.auth.credentials.id;
        const eventIsValid = await calendar.validateEvent(eventId);
        if (
          (hash === hashOld || hash === hashNow) &&
          eventIsValid.success === 'valid'
        ) {
          try {
            let points = 20;
            if (eventIsValid.organizer === 'AYY') {
              points = 50;
            } else if (eventIsValid.visibility === false) {
              points = 10;
            }
            await db.addEventActicity(userId, eventId, points);
            return h.response().code(200);
          } catch (error) {
            if (error.code === '23505') {
              throw Boom.conflict('Already used');
            }
            throw error;
          }
        } else {
          if (!hash || eventIsValid.success === 'invalid') {
            return h.response('invalid').code(403);
          } else if (eventIsValid.success === 'inactive') {
            return h.response('inactive').code(403);
          }
          return h.response('date').code(403);
        }
      },
    },
    {
      method: 'GET',
      path: '/event-code/{eventId}',
      options: {
        auth: {
          strategy: 'jwt',
          scope: 'admin',
        },
      },
      handler: async (request, h) => {
        const eventId = decodeURIComponent(request.params.eventId);
        return utils.encrypt(eventId);
      },
    },
  ]);
};
