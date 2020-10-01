const https = require('axios');
const fs = require('fs');

const apiKey = process.env.CALENDAR_API_KEY;
let calendarId = process.env.CALENDAR_ID;
const calendar = (module.exports = {});

if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'staging') {
  calendarId = '';
}

calendar.getCalendarData = async (startTime = undefined) => {
  let data;
  let url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;
  if (startTime) {
    url += `&timeMin=${startTime}`;
    data = calendarCache.get('calendar-time');
  } else {
    data = calendarCache.get('calendar');
  }
  if (data) {
    console.log('using cache');
    return data;
  }
  try {
    const response = await https.get(url);
    if (startTime) {
      calendarCache.set('calendar-time', response.data);
    } else {
      calendarCache.set('calendar', response.data);
    }
    const promises = [];
    for (let i = 0; i < response.data.items.length; i += 1) {
      promises.push(saveEventImage(response.data.items[i]));
    }
    await Promise.all(promises);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

calendar.saveEventIds = async (startTime = undefined) => {
  const data = await calendar.getCalendarData(startTime);
  const { items } = data;
  return items.map(item => item.id);
};
const organizerRegex = /\{\{(.+)\}\}/;

calendar.validateEvent = async eventId => {
  const { items } = await calendar.getCalendarData();
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (item.id === eventId) {
      const start = new Date(item.start.dateTime || item.start.date);
      const end = new Date(item.end.dateTime || item.end.date);
      const now = new Date();
      if (start <= now && now <= end) {
        let organizer = '';
        if (item.description) {
          const organizerMatches = item.description.match(organizerRegex);
          if (organizerMatches && organizerMatches.length > 1) {
            organizer = organizerMatches[1];
          }
        }
        return {
          success: 'valid',
          organizer,
          visibility: item.guestsCanSeeOtherGuests,
        };
      } else {
        return { success: 'inactive' };
      }
    }
  }
  return { success: 'invalid' };
};
