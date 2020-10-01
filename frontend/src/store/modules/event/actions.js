/* ============
 * Actions for the event module
 * ============
 */

import Proxy from '/src/proxies/Proxy';
import * as types from './mutation-types';
import moment from 'moment';

const organizerRegex = /\{\{(.+)\}\}/;
const linkRegex = /\[\[(.+)\]\]/;
const linkRegexHref = /\[\[.*>(.+)<.*\]\]/;

const transform = response => {
  response.map(item => {
    const date = item.start.dateTime || item.start.date;
    item.start = moment(date);
    if (item.description) {
      const organizerMatches = item.description.match(organizerRegex);
      const linkMatches =
        item.description.indexOf('[[<a') === -1
          ? item.description.match(linkRegex)
          : item.description.match(linkRegexHref);
      if (organizerMatches && organizerMatches.length > 1) {
        item.organizer = organizerMatches[1];
        item.description = item.description.replace(/\{\{.*\}\}/, '');
      } else {
        item.organizer = '';
      }
      if (linkMatches && linkMatches.length > 1) {
        let tempLink = linkMatches[1];
        if (tempLink.indexOf('http') < 0) tempLink = `https://${tempLink}`;
        item.link = tempLink;
        item.description = item.description.replace(/\[\[.*\]\]/, '');
      } else {
        item.link = '';
      }
      item.description = item.description.replace(/^<br>(<br>)*/, '');
    } else {
      item.organizer = '';
      item.link = '';
    }
    return item;
  });
  response.sort((a, b) => a.start - b.start);
};

export const all = ({ commit }) => {
  return new Proxy('calendar').all().then(response => {
    transform(response);
    commit(types.ALL, response);
  });
};

// In ISO string format
export const find = ({ commit }, date = new Date().toISOString()) => {
  return new Proxy('calendar').find(date).then(response => {
    transform(response);
    commit(types.ALL, response);
  });
};

export const codeLink = ({ commit }, eventId) => {
  return new Proxy('event-code').find(eventId);
};

export const select = ({ commit }, id) => {
  commit(types.SELECT, id);
};

export default {
  all,
  select,
  find,
};
