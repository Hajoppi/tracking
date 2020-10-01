/* ============
 * Actions for the modal module
 * ============
 *
 * The actions that are available on the
 * modal module.
 */

import * as types from './mutation-types';

export const toggle = ({ commit }) => {
  commit(types.TOGGLE);
};
export const set = ({ commit }, show) => {
  commit(types.SET, show);
};
export const setAbout = ({ commit }, show) => {
  commit(types.SET_ABOUT, show);
};

export const setAddPost = ({ commit }, show) => {
  commit(types.SET_ADD_POST, show);
};

export const setShowReport = ({ commit }, show) => {
  commit(types.SET_REPORT, show);
};

export const setConfetti = ({ commit }, show) => {
  commit(types.SET_CONFETTI, show);
};

export const checkConfetti = ({ commit }) => {
  commit(types.CHECK_CONFETTI);
};

export default {
  toggle,
  set,
  setAbout,
  setAddPost,
  setShowReport,
  setConfetti,
  checkConfetti,
};
