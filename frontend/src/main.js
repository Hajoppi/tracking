import Vue from 'vue';
import VueAnalytics from 'vue-analytics';

// Plugin
import './plugins/vuex';
import './plugins/axios';
import { i18n } from './plugins/vue-i18n';
import { router } from './plugins/vue-router';
import './plugins/vuex-router-sync';

const analyticsId = process.env.ANALYTICS_ID;
if (analyticsId) {
  Vue.use(VueAnalytics, {
    id: analyticsId,
    router,
    beforeFirstHit() {
      Vue.$ga.set('anonymizeIp', true);
      Vue.$ga.set('allowAdFeatures', false);
    },
  });
}

// Styling
import './assets/sass/main.scss';

import App from './App';
import store from './store';

/* eslint-disable no-console */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../service-worker.js', { scope: '/' })
    .then(function(registration) {
      console.debug('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
      console.error('Service worker registration failed, error:', error);
    });
}
/* eslint-enable no-console */

// src: https://stackoverflow.com/questions/36170425/detect-click-outside-element#comment69859602_36180348
Vue.directive('click-outside', {
  bind: function(el, binding, vnode) {
    el.clickOutsideEvent = function(event) {
      // here I check that click was outside the el and his childrens
      if (!(el == event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        binding.value(event)
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unbind: function(el) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
});

store.dispatch('auth/check');
store.dispatch('aaltofiilis/check');
store.dispatch('modal/checkConfetti');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  /**
   * Will render the application.
   *
   * @param {Function} h Will create an element.
   */
  render: h => h(App),
});
