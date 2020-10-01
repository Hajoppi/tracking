/* ============
 * Mutations for the points module
 * ============
 *
 * The mutations that are available on the
 * points module.
 */
import Vue from 'vue';
import {
  TOTAL,
  ASSOCIATION,
  USER,
  TOP,
  TOP_ASSOCIATIONS,
} from './mutation-types';

export default {
  [TOTAL](state, data) {
    state.total = data;
  },

  [USER](state, score) {
    state.user.points = score.points;
    state.user.rank = score.rank;
  },

  [ASSOCIATION](state, response) {
    Vue.set(state.associations, response.id, response.score);
  },

  [TOP](state, response) {
    state.topScores = response;
  },
  [TOP_ASSOCIATIONS](state, response) {
    state.topAssociations = response;
  },
};
