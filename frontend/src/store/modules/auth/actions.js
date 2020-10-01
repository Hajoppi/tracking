/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import Vue from 'vue';
import AuthProxy from '/src/proxies/AuthProxy';
import * as types from './mutation-types';

export const check = ({ commit }) => {
  commit(types.CHECK);
};

export const register = (_, payload) => {
  return new AuthProxy().register(payload).then(() => {
    Vue.router.push({
      name: 'activate.index',
      params: {
        email: payload.email,
      },
    });
  });
};

export const activate = ({ commit, dispatch }, payload) => {
  return new AuthProxy().activate(payload).then(response => {
    commit(types.LOGIN, response.id_token);
    dispatch('aaltofiilis/check', null, { root: true });
    Vue.router.push({
      name: 'home.index',
    });
  });
};

export const login = ({ commit, dispatch }, payload) => {
  return new AuthProxy().login(payload).then(response => {
    commit(types.LOGIN, response.id_token);
    dispatch('aaltofiilis/check', null, { root: true });
    Vue.router.push({
      name: 'home.index',
    });
  });
};

export const logout = ({ commit, dispatch }) => {
  commit(types.LOGOUT);
  dispatch('aaltofiilis/set', false, { root: true });
  //Catch error,to avoid duplicate url
  Vue.router.push({ name: 'login.index' }).catch(() => {});
};

export const recover = (_, email) => {
  return new AuthProxy().recover(email);
};

export default {
  check,
  register,
  login,
  logout,
  activate,
  recover,
};
