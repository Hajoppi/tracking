/* ============
 * Actions for the account module
 * ============
 *
 * The actions that are available on the
 * account module.
 */

import * as types from './mutation-types';
import Proxy from '/src/proxies/Proxy';

export const find = ({ commit }) => {
  return new Proxy('account').all().then(response => {
    commit(types.FIND, response);
  });
};

export const update = (_, payload) => {
  return new Proxy('account').update(payload);
};

export const randomizeUsername = ({ commit }) => {
  return new Proxy('account/randomize-username').one().then(username => {
    commit(types.RANDOMIZE_USERNAME, username);
  });
};

export const logout = ({ commit }) => {
  commit(types.LOGOUT);
};

export default {
  find,
  update,
  randomizeUsername,
};
