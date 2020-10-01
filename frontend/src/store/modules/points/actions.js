/* ============
 * Actions for the points module
 * ============
 *
 * The actions that are available on the
 * points module.
 */

import * as types from './mutation-types';
import Proxy from '/src/proxies/Proxy';

export const total = ({ commit }) => {
  return new Proxy('points').all().then(response => {
    commit(types.TOTAL, response);
  });
};
export const association = ({ commit }, association) => {
  return new Proxy('points/associations').find(association).then(response => {
    commit(types.ASSOCIATION, response);
  });
};

export const topAssociations = ({ commit }) => {
  return new Proxy('points/associations').all().then(response => {
    commit(types.TOP_ASSOCIATIONS, response);
  });
};

export const user = ({ commit, rootState }) => {
  const { id } = rootState.account.user;
  return new Proxy('points/users').find(id).then(response => {
    commit(types.USER, response);
  });
};

export const topScores = ({ commit }) => {
  return new Proxy('points/users').all().then(response => {
    commit(types.TOP, response);
  });
};

export default {
  total,
  association,
  user,
  topScores,
  topAssociations,
};
