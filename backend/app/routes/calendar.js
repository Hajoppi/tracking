const calendar = require('../../services/calendar');
const utils = require('../../services/utils');

module.exports = async server => {
  server.route([
    {
      method: 'GET',
      path: '/calendar/{startTime?}',
      options: {
        auth: 'jwt',
      },
      handler: async (request, h) => {
        const params = request.params || undefined;
        const { items } = await calendar.getCalendarData(params.startTime);
        if (request.auth.credentials.scope === 'admin') {
          return items.map(item => {
            item.codeHash = encodeURIComponent(utils.encrypt(item.id));
            return item;
          });
        }
        return items.filter(
          item =>
            item.guestsCanSeeOtherGuests === undefined ||
            item.guestsCanSeeOtherGuests
        );
      },
    },
  ]);
};
