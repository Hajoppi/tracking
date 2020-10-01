/* ============
 * Mutations for the modal module
 * ============
 *
 * The mutations that are available on the
 * modal module.
 */
import {
  TOGGLE,
  SET,
  SET_ABOUT,
  SET_ADD_POST,
  SET_REPORT,
  SET_CONFETTI,
  CHECK_CONFETTI,
} from './mutation-types';

export default {
  [TOGGLE](state) {
    state.showModal = !state.showModal;
  },

  [SET](state, show) {
    state.showModal = show;
  },

  [SET_ABOUT](state, show) {
    state.showAboutModal = show;
  },

  [SET_REPORT](state, show) {
    state.showReportPost = show;
  },

  [SET_ADD_POST](state, show) {
    state.showAddPost = show;
  },

  [SET_CONFETTI](state, show) {
    localStorage.setItem('confetti_shown', !show);
    state.showConfetti = show;
  },

  [CHECK_CONFETTI](state) {
    if(!localStorage.getItem('confetti_shown')) {
      state.showConfetti = true;
    }
  },
};
