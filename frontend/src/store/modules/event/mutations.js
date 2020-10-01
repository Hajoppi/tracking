/* ============
 * Mutations for the event module
 * ============
 *
 * The mutations that are available on the
 * event module.
 */

import { ALL, SELECT } from './mutation-types';

export default {
  [ALL](state, data) {
    state.events = data;
  },

  [SELECT](state, id) {
    for (let i = 0; i < state.events.length; i += 1) {
      if (state.events[i].id === id) {
        state.selectedEvent = state.events[i];
        break;
      }
    }
  },
};
