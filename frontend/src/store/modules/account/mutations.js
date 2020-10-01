/* ============
 * Mutations for the account module
 * ============
 *
 * The mutations that are available on the
 * account module.
 */

import { FIND, LOGOUT, RANDOMIZE_USERNAME } from './mutation-types';

export default {
  [FIND](state, user) {
    state.user = user;
  },

  [LOGOUT](state) {
    state.user = {};
  },

  [RANDOMIZE_USERNAME](state, username) {
    state.randomUsername = username;
  },
};
